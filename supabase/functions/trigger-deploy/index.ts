const GITHUB_TOKEN        = Deno.env.get('GITHUB_DEPLOY_TOKEN')!;
const SUPABASE_URL        = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY   = Deno.env.get('SUPABASE_ANON_KEY')!;
const SERVICE_ROLE_KEY    = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const REPO                = 'gilsonbs/monte-das-oliveiras';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });

  const auth = req.headers.get('Authorization') ?? '';

  // chamada do database webhook (service role)
  const isWebhook = auth === `Bearer ${SERVICE_ROLE_KEY}`;

  if (!isWebhook) {
    // chamada do painel admin — valida sessão do usuário
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { Authorization: auth, apikey: SUPABASE_ANON_KEY },
    });
    if (!userRes.ok) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }
  }

  const ghRes = await fetch(`https://api.github.com/repos/${REPO}/dispatches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event_type: 'content-updated' }),
  });

  return new Response(JSON.stringify({ ok: ghRes.ok }), {
    status: ghRes.ok ? 200 : 502,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
});
