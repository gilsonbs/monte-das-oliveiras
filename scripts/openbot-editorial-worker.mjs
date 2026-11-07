#!/usr/bin/env node

const required = ['OPENBOT_SUPABASE_URL', 'OPENBOT_SUPABASE_ANON_KEY', 'OPENBOT_SUPABASE_ACCESS_TOKEN'];
const missing = required.filter((name) => !String(process.env[name] || '').trim());

if (process.argv.includes('--check')) {
  if (missing.length) {
    console.error(`Configuração incompleta: ${missing.join(', ')}`);
    process.exitCode = 2;
  } else {
    console.log('Configuração local disponível. Nenhuma pauta foi reservada.');
  }
  process.exit();
}

if (missing.length) {
  console.error(`Configuração incompleta: ${missing.join(', ')}`);
  process.exit(2);
}

const baseUrl = new URL(process.env.OPENBOT_SUPABASE_URL);
if (baseUrl.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(baseUrl.hostname)) {
  console.error('A URL do Supabase precisa usar HTTPS, exceto em testes locais.');
  process.exit(2);
}

const response = await fetch(new URL('/rest/v1/rpc/claim_next_editorial_job', baseUrl), {
  method: 'POST',
  headers: {
    apikey: process.env.OPENBOT_SUPABASE_ANON_KEY,
    authorization: `Bearer ${process.env.OPENBOT_SUPABASE_ACCESS_TOKEN}`,
    'content-type': 'application/json',
  },
  body: '{}',
});

if (!response.ok) {
  const detail = await response.text();
  console.error(`Não foi possível consultar a fila (${response.status}): ${detail.slice(0, 300)}`);
  process.exit(1);
}

const [job] = await response.json();
if (!job) {
  console.log(JSON.stringify({ ok: true, status: 'idle' }));
  process.exit(0);
}

console.log(JSON.stringify({
  ok: true,
  status: 'claimed',
  job: {
    job_id: job.job_id,
    topic_id: job.topic_id,
    source_type: job.source_type,
    topic: job.topic,
    youtube_url: job.youtube_url,
    seo_keyword: job.seo_keyword,
    category_slug: job.category_slug,
    priority: job.priority,
    requested_execution: job.requested_execution,
  },
}));
