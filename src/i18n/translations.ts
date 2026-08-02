export type Lang = 'pt' | 'en' | 'es';

export const CATEGORY_NAMES: Record<string, Record<Lang, string>> = {
  'crente-pode':      { pt: 'Crente pode?',        en: 'Can a Christian?',      es: '¿Puede el cristiano?' },
  'devocional-diario':{ pt: 'Devocional Diário',   en: 'Daily Devotional',      es: 'Devocional Diario' },
  'estudos-biblicos': { pt: 'Estudos Bíblicos',    en: 'Bible Studies',         es: 'Estudios Bíblicos' },
  'fim-dos-tempos':   { pt: 'Fim dos Tempos',       en: 'End Times',             es: 'Fin de los Tiempos' },
  'escatologia':      { pt: 'Fim dos Tempos',       en: 'End Times',             es: 'Fin de los Tiempos' },
  'igreja-perseguida':{ pt: 'Igreja Perseguida',    en: 'Persecuted Church',     es: 'Iglesia Perseguida' },
  'lideranca-e-igreja':{ pt: 'Liderança e Igreja',  en: 'Leadership & Church',   es: 'Liderazgo e Iglesia' },
  'noticias-gospel':  { pt: 'Notícias',             en: 'News',                  es: 'Noticias' },
  'vida-crista':      { pt: 'Vida Cristã',          en: 'Christian Life',        es: 'Vida Cristiana' },
  'webstories':       { pt: 'Webstories',           en: 'Webstories',            es: 'Webstories' },
};

export const UI = {
  pt: {
    siteName:     'Monte das Oliveiras',
    siteDesc:     'Estudos bíblicos, escatologia e vida cristã para o dia a dia.',
    editorPicks:  'Selecionados pela redação',
    mostRead:     'Mais lidas',
    recentPosts:  'Publicações recentes',
    categories:   'Categorias',
    readMin:      'min de leitura',
    related:      'Artigos relacionados',
    share:        'Compartilhar:',
    privacy:      'Política de privacidade',
    about:        'Sobre',
    contact:      'Contato',
    content:      'Conteúdo',
    site:         'Site',
    category:     'Categoria',
    readAlso:     'Leia também',
    comments:     'Comentários',
    yourName:     'Seu nome',
    yourEmail:    'Seu e-mail (não é exibido)',
    writeComment: 'Escreva seu comentário...',
    comment:      'Comentar',
    firstComment: 'Seja o primeiro a comentar.',
    pub: (n: number) => `${n} ${n === 1 ? 'publicação' : 'publicações'}`,
    today:        'Hoje',
    yesterday:    'Há 1 dia',
    daysAgo:      (d: number) => `Há ${d} dias`,
  },
  en: {
    siteName:     'Mount of Olives',
    siteDesc:     'Biblical studies, eschatology and Christian life for everyday.',
    editorPicks:  "Editor's picks",
    mostRead:     'Most read',
    recentPosts:  'Recent posts',
    categories:   'Categories',
    readMin:      'min read',
    related:      'Related articles',
    share:        'Share:',
    privacy:      'Privacy policy',
    about:        'About',
    contact:      'Contact',
    content:      'Content',
    site:         'Site',
    category:     'Category',
    readAlso:     'Read also',
    comments:     'Comments',
    yourName:     'Your name',
    yourEmail:    'Your email (not displayed)',
    writeComment: 'Write your comment...',
    comment:      'Comment',
    firstComment: 'Be the first to comment.',
    pub: (n: number) => `${n} ${n === 1 ? 'article' : 'articles'}`,
    today:        'Today',
    yesterday:    '1 day ago',
    daysAgo:      (d: number) => `${d} days ago`,
  },
  es: {
    siteName:     'Monte de los Olivos',
    siteDesc:     'Estudios bíblicos, escatología y vida cristiana para el día a día.',
    editorPicks:  'Selección de la redacción',
    mostRead:     'Más leídas',
    recentPosts:  'Publicaciones recientes',
    categories:   'Categorías',
    readMin:      'min de lectura',
    related:      'Artículos relacionados',
    share:        'Compartir:',
    privacy:      'Política de privacidad',
    about:        'Acerca de',
    contact:      'Contacto',
    content:      'Contenido',
    site:         'Sitio',
    category:     'Categoría',
    readAlso:     'Leer también',
    comments:     'Comentarios',
    yourName:     'Tu nombre',
    yourEmail:    'Tu correo (no se muestra)',
    writeComment: 'Escribe tu comentario...',
    comment:      'Comentar',
    firstComment: 'Sé el primero en comentar.',
    pub: (n: number) => `${n} ${n === 1 ? 'artículo' : 'artículos'}`,
    today:        'Hoy',
    yesterday:    'Hace 1 día',
    daysAgo:      (d: number) => `Hace ${d} días`,
  },
} as const;

export type UIStrings = (typeof UI)['pt'];

export function getUI(lang: Lang): UIStrings {
  return (UI[lang] ?? UI.pt) as UIStrings;
}

export function getCategoryName(slug: string, lang: Lang): string {
  return CATEGORY_NAMES[slug]?.[lang] ?? CATEGORY_NAMES[slug]?.pt ?? slug;
}

export function getLangPrefix(lang: Lang): string {
  return lang === 'pt' ? '' : `/${lang}`;
}

export function timeAgo(dateStr: string, lang: Lang): string {
  const ui = getUI(lang);
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1) return ui.today;
  if (days === 1) return ui.yesterday;
  if (days < 30) return ui.daysAgo(days);
  const locale = lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'pt-BR';
  return new Date(dateStr).toLocaleDateString(locale, { day: '2-digit', month: 'long', year: 'numeric' });
}
