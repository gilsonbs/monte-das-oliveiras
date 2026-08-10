import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: posts } = await supabase
    .from('posts_public')
    .select('title, slug, published_at, description')
    .eq('language', 'pt')
    .order('published_at', { ascending: false })
    .limit(20);

  const site = 'https://montedasoliveiras.com';

  const items = (posts || []).map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${site}/${post.slug}</link>
      <guid isPermaLink="true">${site}/${post.slug}</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      ${post.description ? `<description><![CDATA[${post.description}]]></description>` : ''}
    </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Monte das Oliveiras</title>
    <link>${site}</link>
    <description>Estudos Bíblicos, Escatologia e Vida Cristã</description>
    <language>pt-BR</language>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
