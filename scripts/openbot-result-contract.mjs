function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

export function markdownToHtml(markdown) {
  const lines = escapeHtml(String(markdown || '')).split(/\r?\n/);
  const output = [];
  let paragraph = [];
  let inList = false;
  const inline = (text) => text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>');
  const flushParagraph = () => {
    if (paragraph.length) output.push(`<p>${inline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const closeList = () => {
    if (inList) output.push('</ul>');
    inList = false;
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushParagraph(); closeList(); continue; }
    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) { flushParagraph(); closeList(); const level = heading[1].length; output.push(`<h${level}>${inline(heading[2])}</h${level}>`); continue; }
    const item = line.match(/^[-*]\s+(.+)$/);
    if (item) { flushParagraph(); if (!inList) { output.push('<ul>'); inList = true; } output.push(`<li>${inline(item[1])}</li>`); continue; }
    if (line.startsWith('&gt; ')) { flushParagraph(); closeList(); output.push(`<blockquote>${inline(line.slice(5))}</blockquote>`); continue; }
    paragraph.push(line);
  }
  flushParagraph(); closeList();
  return output.join('\n');
}

export function parseEditorialPackage(markdown) {
  const value = String(markdown || '');
  const field = (label) => value.match(new RegExp(`^- ${label}:\\s*(.+)$`, 'mi'))?.[1]?.replace(/\s*\(\d+ caracteres\)\s*$/, '').trim() || '';
  const title = field('Título escolhido');
  const slug = field('Slug sugerido');
  const seoTitle = field('Título SEO') || title;
  const metaDescription = field('Meta descrição');
  const quickAnswer = value.match(/\*\*Resposta:\*\*\s*(.+)/i)?.[1]?.trim() || '';
  const article = value.match(/## Estrutura e texto-base da prévia\s*([\s\S]*?)(?=\n## Referências utilizadas)/i)?.[1]?.trim() || '';
  const faqBlock = value.match(/## Perguntas frequentes\s*([\s\S]*?)(?=\n## Referências utilizadas)/i)?.[1] || '';
  const faq = [...faqBlock.matchAll(/^###\s+(.+)\n+([^#][\s\S]*?)(?=\n###|$)/gm)].map((match) => ({ question: match[1].trim(), answer: match[2].trim() }));
  const references = [...value.matchAll(/^- Bíblia Online,\s*([^:]+):\s*(https:\/\/\S+)/gmi)].map((match) => ({ reference: match[1].trim(), source_url: match[2].trim(), verified: true }));
  const errors = [];
  if (!title) errors.push('Título ausente.');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.push('Slug ausente ou inválido.');
  if (article.length < 3000) errors.push('Artigo curto ou ausente.');
  if (!quickAnswer) errors.push('Resposta rápida ausente.');
  if (!seoTitle || !metaDescription) errors.push('SEO incompleto.');
  if (faq.length < 2) errors.push('FAQ insuficiente.');
  if (references.length < 1) errors.push('Fonte bíblica verificável ausente.');
  return {
    ok: errors.length === 0,
    errors,
    article: { title, slug, content: markdownToHtml(article), content_markdown: article, excerpt: quickAnswer, seo_title: seoTitle, meta_description: metaDescription, faq, verified_references: references, status: 'draft' },
  };
}
