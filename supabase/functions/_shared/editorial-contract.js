export const SOURCE_TYPES = new Set(['topic', 'youtube']);
export const PRIORITIES = new Set(['normal', 'high', 'urgent']);
export const EXECUTION_MODES = new Set(['routine', 'now']);

export function sourceFingerprint({ sourceType, topic, youtubeUrl, seoKeyword }) {
  const source = sourceType === 'youtube' ? youtubeUrl : topic;
  return `${sourceType}:${String(source).trim().toLocaleLowerCase('pt-BR')}:${String(seoKeyword).trim().toLocaleLowerCase('pt-BR')}`;
}

export function validateRequest(input) {
  const sourceType = String(input?.source_type || '').trim();
  const seoKeyword = String(input?.seo_keyword || '').trim();
  const topic = String(input?.topic || '').trim();
  const youtubeUrl = String(input?.youtube_url || '').trim();
  const categorySlug = String(input?.category_slug || '').trim();
  const priority = String(input?.priority || 'normal').trim();
  const executionMode = String(input?.execution_mode || 'routine').trim();
  const scheduledFor = input?.scheduled_for ? String(input.scheduled_for).trim() : '';
  const errors = [];

  if (!SOURCE_TYPES.has(sourceType)) errors.push('Tipo de entrada inválido.');
  if (!PRIORITIES.has(priority)) errors.push('Prioridade inválida.');
  if (!EXECUTION_MODES.has(executionMode)) errors.push('Modo de execução inválido.');
  if (priority === 'urgent' && executionMode !== 'now') errors.push('Pauta urgente deve usar execução imediata.');
  if (scheduledFor && Number.isNaN(Date.parse(scheduledFor))) errors.push('Data de agendamento inválida.');
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

  const value = { sourceType, seoKeyword, topic, youtubeUrl, categorySlug, priority, executionMode, scheduledFor };
  return { ok: errors.length === 0, errors, value: { ...value, sourceFingerprint: sourceFingerprint(value) } };
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

