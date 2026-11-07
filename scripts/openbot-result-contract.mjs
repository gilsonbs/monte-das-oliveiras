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
    article: { title, slug, content_markdown: article, excerpt: quickAnswer, seo_title: seoTitle, meta_description: metaDescription, faq, verified_references: references, status: 'draft' },
  };
}
