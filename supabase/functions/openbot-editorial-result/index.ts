import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { buildPostPayload, validateOpenBotArticle } from '../_shared/editorial-contract.js';

const url = Deno.env.get('SUPABASE_URL') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const respond = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json' },
});

Deno.serve(async (request) => {
  if (request.method !== 'POST') return respond({ error: 'Metodo nao permitido.' }, 405);
  const authorization = request.headers.get('Authorization') ?? '';
  const auth = createClient(url, anonKey, { global: { headers: { Authorization: authorization } } });
  const { data: { user } } = await auth.auth.getUser();
  if (!user) return respond({ error: 'Sessao invalida.' }, 401);

  const body = await request.json().catch(() => ({}));
  const jobId = String(body.job_id || '');
  const topicId = String(body.topic_id || '');
  const validation = validateOpenBotArticle(body.article);
  if (!jobId || !topicId || !validation.ok) {
    return respond({ error: validation.errors.join(' ') || 'Identificadores ausentes.' }, 400);
  }

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { data: job } = await admin.from('editorial_automation_jobs')
    .select('id, topic_id, status, requested_by, post_id')
    .eq('id', jobId).eq('topic_id', topicId).eq('requested_by', user.id).maybeSingle();
  if (!job) return respond({ error: 'Trabalho nao encontrado para este usuario.' }, 404);
  if (job.post_id) return respond({ ok: true, post_id: job.post_id, status: 'review_required', repeated: true });
  if (!['processing', 'queued'].includes(job.status)) return respond({ error: `Estado invalido: ${job.status}.` }, 409);

  const categorySlug = String(body.category_slug || '').trim();
  let categoryQuery = admin.from('categories').select('id, slug');
  categoryQuery = categorySlug ? categoryQuery.eq('slug', categorySlug) : categoryQuery.order('name').limit(1);
  const { data: categories, error: categoryError } = await categoryQuery;
  const category = categories?.[0];
  if (categoryError || !category) return respond({ error: 'Categoria valida nao encontrada.' }, 400);

  const { data: post, error: postError } = await admin.from('posts')
    .insert(buildPostPayload(body.article, category.id)).select('id').single();
  if (postError) return respond({ error: postError.message }, 500);

  if (body.social_package) {
    const { error } = await admin.from('content_distribution_packages').upsert({
      post_id: post.id, status: 'draft', package: body.social_package,
    }, { onConflict: 'post_id' });
    if (error) return respond({ error: error.message, post_id: post.id }, 500);
  }

  await admin.from('editorial_automation_jobs').update({
    status: 'review_required', post_id: post.id,
    validation_report: { ...validation, verified_references: body.article.verified_references },
    updated_at: new Date().toISOString(),
  }).eq('id', jobId);
  await admin.from('editorial_topics').update({
    status: 'awaiting_review', current_agent: 'editorial', updated_at: new Date().toISOString(),
  }).eq('id', topicId).eq('requested_by', user.id);

  return respond({ ok: true, post_id: post.id, status: 'review_required' }, 201);
});
