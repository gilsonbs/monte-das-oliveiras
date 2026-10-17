const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY') ?? '';
const BREVO_LIST_ID = Number(Deno.env.get('BREVO_LIST_ID') || '3');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  if (!BREVO_API_KEY || !SUPABASE_URL || !SERVICE_ROLE_KEY || !Number.isInteger(BREVO_LIST_ID)) {
    return json({ error: 'Lead delivery is not configured' }, 503);
  }

  try {
    const body = await req.json();
    const name = String(body.name || '').trim().slice(0, 120);
    const email = String(body.email || '').trim().toLowerCase();
    const source = String(body.source || 'article_lead_magnet').trim().slice(0, 120);
    const postSlug = String(body.postSlug || '').trim().slice(0, 180);
    const offerTitle = String(body.offerTitle || '').trim().slice(0, 180);

    if (!emailPattern.test(email)) return json({ error: 'Invalid email' }, 400);
    if (body.consent !== true) return json({ error: 'Consent is required' }, 400);

    const supabaseHeaders = {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    };

    const saveResponse = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
      method: 'POST',
      headers: { ...supabaseHeaders, Prefer: 'return=minimal,resolution=ignore-duplicates' },
      body: JSON.stringify({
        name: name || null,
        email,
        source,
        post_slug: postSlug || null,
        offer_title: offerTitle || null,
        consent: true,
      }),
    });

    if (!saveResponse.ok && saveResponse.status !== 409) {
      return json({ error: 'Could not save subscriber' }, 502);
    }

    const brevoHeaders = {
      accept: 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    };

    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: brevoHeaders,
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
        ...(name ? { attributes: { FIRSTNAME: name } } : {}),
      }),
    });

    if (!contactResponse.ok) {
      console.error('Brevo contact error', contactResponse.status, await contactResponse.text());
      return json({ error: 'Could not add subscriber to email list' }, 502);
    }

    return json({ ok: true });
  } catch (error) {
    console.error('Lead subscription error', error);
    return json({ error: 'Could not process subscription' }, 500);
  }
});
