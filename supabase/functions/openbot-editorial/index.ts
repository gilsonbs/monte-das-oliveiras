import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { buildPostPayload, validateOpenBotArticle, validateRequest } from '../_shared/editorial-contract.js';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const OPENBOT_URL = Deno.env.get('OPENBOT_EDITORIAL_WEBHOOK_URL') ?? '';
const OPENBOT_TOKEN = Deno.env.get('OPENBOT_EDITORIAL_TOKEN') ?? '';
const ALLOWED_ORIGIN = Deno.env.get('ADMIN_ALLOWED_ORIGIN') ?? 'https://www.montedasoliveiras.com';

function headers(req: Request) {
  const origin = req.headers.get('origin');
  return {
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN,
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
    'Content-Type': 'application/json',
    Vary: 'Origin',
  };
}

function json(req: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: headers(req) });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: headers(req) });
  if (req.method !== 'POST') return json(req, { error: 'Método não permitido.' }, 405);

  const authorization = req.headers.get('Authorization') ?? '';
  const authClient = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: authorization } } });
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return json(req, { error: 'Sessão inválida.' }, 401);
  const parsed = validateRequest(await req.json().catch(() => ({})));
  if (!parsed.ok) return json(req, { error: parsed.errors.join(' ') }, 400);

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
  const source = parsed.value.sourceType === 'topic'
    ? { type: 'topic', topic: parsed.value.topic }
    : { type: 'youtube', url: parsed.value.youtubeUrl };

  const activeStatuses = ['incomplete', 'pending', 'reserved', 'researching', 'writing_article', 'awaiting_review', 'article_approved', 'preparing_carousel', 'awaiting_social_approval', 'ready_to_publish', 'paused', 'error'];
  const { data: duplicate } = await admin.from('editorial_topics')
    .select('id, status')
    .eq('requested_by', user.id)
    .eq('source_fingerprint', parsed.value.sourceFingerprint)
    .in('status', activeStatuses)
    .maybeSingle();
  if (duplicate) return json(req, { error: 'Esta pauta já está ativa.', topic_id: duplicate.id, status: duplicate.status }, 409);

  const { data: editorialTopic, error: topicError } = await admin.from('editorial_topics').insert({
    input_type: parsed.value.sourceType,
    topic: parsed.value.topic || null,
    youtube_url: parsed.value.youtubeUrl || null,
    seo_keyword: parsed.value.seoKeyword,
    category_slug: parsed.value.categorySlug || null,
    priority: parsed.value.priority,
    requested_execution: parsed.value.executionMode,
    scheduled_for: parsed.value.scheduledFor || null,
    status: 'pending',
    current_agent: 'orchestrator',
    source_fingerprint: parsed.value.sourceFingerprint,
    requested_by: user.id,
  }).select('id').single();
  if (topicError) return json(req, { error: topicError.message }, 500);

  const { data: job, error: jobError } = await admin.from('editorial_automation_jobs').insert({
    topic_id: editorialTopic.id,
    source_type: parsed.value.sourceType,
    topic: parsed.value.topic || null,
    youtube_url: parsed.value.youtubeUrl || null,
    seo_keyword: parsed.value.seoKeyword,
    status: OPENBOT_URL && OPENBOT_TOKEN ? 'processing' : 'queued',
    assigned_agent: 'orchestrator',
    priority: parsed.value.priority,
    requested_execution: parsed.value.executionMode,
    requested_by: user.id,
  }).select('id').single();
  if (jobError) {
    await admin.from('editorial_topics').delete().eq('id', editorialTopic.id);
    return json(req, { error: jobError.message }, 500);
  }

  // O OpenBot Desktop só escuta em localhost. Sem um endpoint remoto explícito,
  // a função mantém o trabalho na fila para um conector local autenticado.
  if (!OPENBOT_URL || !OPENBOT_TOKEN) {
    return json(req, { ok: true, topic_id: editorialTopic.id, job_id: job.id, status: 'queued' }, 202);
  }

  try {
    const categories = await admin.from('categories').select('id, name, slug').order('name');
    const links = await admin.from('posts').select('title, slug').eq('status', 'published').limit(50);
    const openBotResponse = await fetch(OPENBOT_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${OPENBOT_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: 'monte_das_oliveiras_editorial_draft_v1',
        source,
        seo_keyword: parsed.value.seoKeyword,
        constraints: {
          language: 'pt-BR',
          output_status: 'draft',
          never_publish: true,
          require_verified_bible_references: true,
          require_reference_source_urls: true,
          original_content: true,
          include_faq: true,
          prepare_social_drafts: true,
        },
        available_categories: categories.data ?? [],
        internal_links: links.data ?? [],
      }),
    });
    if (!openBotResponse.ok) throw new Error(`OpenBot respondeu ${openBotResponse.status}.`);
    const result = await openBotResponse.json();
    const validation = validateOpenBotArticle(result.article);
    if (!validation.ok) throw new Error(validation.errors.join(' '));

    const categoryId = result.article.category_id || categories.data?.[0]?.id;
    if (!categoryId) throw new Error('Nenhuma categoria válida foi definida.');
    const { data: post, error: postError } = await admin.from('posts')
      .insert(buildPostPayload(result.article, categoryId))
      .select('id').single();
    if (postError) throw postError;

    if (result.social_package) {
      await admin.from('content_distribution_packages').upsert({
        post_id: post.id,
        status: 'draft',
        package: result.social_package,
      }, { onConflict: 'post_id' });
    }

    await admin.from('editorial_automation_jobs').update({
      status: 'review_required',
      post_id: post.id,
      validation_report: { ...validation, verified_references: result.article.verified_references },
      updated_at: new Date().toISOString(),
    }).eq('id', job.id);
    await admin.from('editorial_topics').update({
      status: 'awaiting_review', current_agent: 'editorial', updated_at: new Date().toISOString(),
    }).eq('id', editorialTopic.id);

    return json(req, { ok: true, topic_id: editorialTopic.id, job_id: job.id, post_id: post.id, status: 'review_required' }, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await admin.from('editorial_automation_jobs').update({
      status: 'failed', error_message: message, updated_at: new Date().toISOString(),
    }).eq('id', job.id);
    await admin.from('editorial_topics').update({
      status: 'error', error_message: message, updated_at: new Date().toISOString(),
    }).eq('id', editorialTopic.id);
    return json(req, { error: message, job_id: job.id }, 502);
  }
});

