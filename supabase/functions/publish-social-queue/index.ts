const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const INSTAGRAM_ACCESS_TOKEN = Deno.env.get('INSTAGRAM_ACCESS_TOKEN') ?? '';
const INSTAGRAM_USER_ID = Deno.env.get('INSTAGRAM_USER_ID') ?? '';
const QUEUE_WORKER_SECRET = Deno.env.get('QUEUE_WORKER_SECRET') ?? '';
const SITE_URL = 'https://montedasoliveiras.com';

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json' },
});

const headers = {
  apikey: SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
};

async function instagramRequest(path: string, body: URLSearchParams) {
  body.set('access_token', INSTAGRAM_ACCESS_TOKEN);
  const response = await fetch(`https://graph.instagram.com${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || 'Instagram API error');
  return data;
}

async function publishInstagram(item: any) {
  const pack = item.package?.package || {};
  const slug = pack.article?.slug;
  const caption = pack.instagram?.caption;
  if (!slug || !caption) throw new Error('Pacote sem slug ou legenda do Instagram');

  const imageUrl = pack.article?.image_url || `${SUPABASE_URL}/storage/v1/object/public/social-cards/${encodeURIComponent(slug)}.jpg`;
  const container = await instagramRequest(`/${INSTAGRAM_USER_ID}/media`, new URLSearchParams({
    image_url: imageUrl,
    caption,
  }));
  return instagramRequest(`/${INSTAGRAM_USER_ID}/media_publish`, new URLSearchParams({ creation_id: container.id }));
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID || !QUEUE_WORKER_SECRET) {
    return json({ error: 'Instagram publication is not configured' }, 503);
  }
  if (req.headers.get('x-queue-secret') !== QUEUE_WORKER_SECRET) return json({ error: 'Unauthorized' }, 401);

  try {
    const now = new Date().toISOString();
    const queueResponse = await fetch(`${SUPABASE_URL}/rest/v1/content_publication_queue?status=eq.scheduled&scheduled_for=lte.${encodeURIComponent(now)}&order=scheduled_for.asc&limit=10&select=id,platform,scheduled_for,package_id`, { headers });
    if (!queueResponse.ok) throw new Error(`Could not load queue (${queueResponse.status})`);
    const items = await queueResponse.json();
    const results = [];

    for (const item of items) {
      if (item.platform !== 'instagram') continue;
      const packageResponse = await fetch(`${SUPABASE_URL}/rest/v1/content_distribution_packages?id=eq.${item.package_id}&select=package,status`, { headers });
      const packages = packageResponse.ok ? await packageResponse.json() : [];
      const packageRow = packages[0];
      if (!packageRow || packageRow.status !== 'approved') continue;
      item.package = packageRow;
      try {
        const result = await publishInstagram(item);
        await fetch(`${SUPABASE_URL}/rest/v1/content_publication_queue?id=eq.${item.id}`, {
          method: 'PATCH', headers: { ...headers, Prefer: 'return=minimal' },
          body: JSON.stringify({ status: 'published', published_at: new Date().toISOString(), updated_at: new Date().toISOString() }),
        });
        results.push({ id: item.id, status: 'published', media_id: result.id });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Instagram publication failed';
        await fetch(`${SUPABASE_URL}/rest/v1/content_publication_queue?id=eq.${item.id}`, {
          method: 'PATCH', headers: { ...headers, Prefer: 'return=minimal' },
          body: JSON.stringify({ status: 'failed', error_message: message.slice(0, 500), updated_at: new Date().toISOString() }),
        });
        results.push({ id: item.id, status: 'failed', error: message });
      }
    }

    return json({ ok: true, processed: results.length, results });
  } catch (error) {
    console.error('Queue publication error', error);
    return json({ error: error instanceof Error ? error.message : 'Queue publication failed' }, 500);
  }
});
