export const SOURCE_TYPES = new Set(['topic', 'youtube']);

export function validateRequest(input) {
  const sourceType = String(input?.source_type || '').trim();
  const seoKeyword = String(input?.seo_keyword || '').trim();
  const topic = String(input?.topic || '').trim();
  const youtubeUrl = String(input?.youtube_url || '').trim();
  const errors = [];

  if (!SOURCE_TYPES.has(sourceType)) errors.push('Tipo de entrada inválido.');
  if (seoKeyword.length < 3 || seoKeyword.length > 120) errors.push('A palavra-chave deve ter entre 3 e 120 caracteres.');
  if (sourceType === 'topic' && (topic.length < 5 || youtubeUrl)) errors.push('Informe somente um tema válido.');
  if (sourceType === 'youtube') {
    try {
      const url = new URL(youtubeUrl);
      const allowed = ['youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com'];
      if (url.protocol !== 'https:' || !allowed.includes(url.hostname)) throw new Error();
    } catch {
      errors.push('Informe um link HTTPS válido do YouTube.');
    }
    if (topic) errors.push('Não envie tema junto com o link do YouTube.');
  }

  return { ok: errors.length === 0, errors, value: { sourceType, seoKeyword, topic, youtubeUrl } };
}

export function validateOpenBotArticle(article) {
  const errors = [];
  const requiredText = ['title', 'slug', 'content', 'excerpt', 'seo_title', 'meta_description'];
  for (const field of requiredText) {
    if (!String(article?.[field] || '').trim()) errors.push(`Campo ausente: ${field}.`);
  }
  if (article?.status && article.status !== 'draft') errors.push('O OpenBot só pode devolver status draft.');
  if (!Array.isArray(article?.verified_references) || article.verified_references.length === 0) {
    errors.push('Nenhuma referência bíblica verificada foi devolvida.');
  } else {
    for (const ref of article.verified_references) {
      if (!ref?.reference || !ref?.source_url || ref?.verified !== true) {
        errors.push('Cada referência precisa de nome, fonte e confirmação de verificação.');
        break;
      }
    }
  }
  if (!Array.isArray(article?.faq) || article.faq.length < 2) errors.push('O FAQ precisa de pelo menos duas perguntas.');
  return { ok: errors.length === 0, errors };
}

export function buildPostPayload(article, categoryId, coverMediaId = null) {
  return {
    title: String(article.title).trim(),
    slug: String(article.slug).trim(),
    content: String(article.content).trim(),
    excerpt: String(article.excerpt).trim(),
    seo_title: String(article.seo_title).trim(),
    meta_description: String(article.meta_description).trim(),
    category_id: categoryId,
    cover_media_id: coverMediaId,
    status: 'draft',
    published_at: null,
    is_featured: false,
    language: 'pt',
  };
}

