const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') ?? '';
const GEMINI_MODEL = Deno.env.get('GEMINI_MODEL') || 'gemini-2.5-flash';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

function cleanJson(text: string) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  return JSON.parse(fenced?.[1] || text);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!GEMINI_API_KEY) return json({ error: 'GEMINI_API_KEY is not configured' }, 503);

  try {
    const body = await req.json();
    const title = String(body.title || '').trim().slice(0, 240);
    const excerpt = String(body.excerpt || '').trim().slice(0, 1200);
    const slug = String(body.slug || '').trim().slice(0, 180);
    const articleUrl = String(body.articleUrl || '').trim();
    if (!title || !slug || !articleUrl) return json({ error: 'Article title, slug and URL are required' }, 400);

    const prompt = `Você é editor de conteúdo do site cristão Monte das Oliveiras. Crie um pacote de redes sociais para o artigo abaixo.

Regras: escreva em português brasileiro; use tom claro, pastoral e equilibrado; não marque datas; não apresente interpretações escatológicas debatidas como fatos; não invente referências bíblicas; evite sensacionalismo; cada plataforma deve ter texto adaptado ao seu formato.

Artigo: ${title}
Resumo: ${excerpt}
URL: ${articleUrl}

Responda somente com JSON válido, sem markdown, usando exatamente este formato:
{
  "video": {"hook": "", "script": "", "cta": ""},
  "instagram": {"caption": "", "url": ""},
  "facebook": {"text": "", "url": ""},
  "youtube": {"title": "", "description": "", "url": ""},
  "tiktok": {"caption": "", "url": ""},
  "pinterest": {"title": "", "description": "", "url": ""},
  "review": {"status": "draft", "notes": ""}
}

Use esta URL base para os links, adicionando UTMs diferentes por rede: ${articleUrl}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.45, responseMimeType: 'application/json' },
      }),
    });
    if (!response.ok) {
      console.error('Gemini error', response.status, await response.text());
      return json({ error: 'Could not generate social package' }, 502);
    }
    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return json({ error: 'Gemini returned an empty response' }, 502);
    return json({ package: { article: { title, slug, excerpt, url: articleUrl }, ...cleanJson(text) } });
  } catch (error) {
    console.error('Social package error', error);
    return json({ error: 'Could not generate social package' }, 500);
  }
});
