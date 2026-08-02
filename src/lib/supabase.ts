import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Faltam PUBLIC_SUPABASE_URL e/ou PUBLIC_SUPABASE_ANON_KEY no .env. Veja .env.example.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ---------- tipos ----------
export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string;
  read_time_minutes: number | null;
  is_featured: boolean;
  category_name: string | null;
  category_slug: string | null;
  card_url: string | null;
  thumb_url: string | null;
  alt_text: string | null;
}

export interface PostFull extends PostSummary {
  content: string;
  cover_url: string | null;
  share_url: string | null;
  seo_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  view_count: number;
}

// ---------- queries ----------

export async function getFeaturedPosts(limit = 4) {
  // 1. Posts marcados manualmente como destaque, com ordem definida
  const { data: ordered } = await supabase
    .from('posts_public')
    .select('*')
    .eq('is_featured', true)
    .not('featured_order', 'is', null)
    .order('featured_order', { ascending: true })
    .limit(limit);

  const featured: PostSummary[] = (ordered ?? []) as PostSummary[];

  // 2. Se ainda faltam slots, preenche com posts marcados sem ordem
  if (featured.length < limit) {
    const usedIds = new Set(featured.map((p) => p.id));
    const { data: byDate } = await supabase
      .from('posts_public')
      .select('*')
      .eq('is_featured', true)
      .is('featured_order', null)
      .order('published_at', { ascending: false })
      .limit(limit);
    for (const p of (byDate ?? []) as PostSummary[]) {
      if (!usedIds.has(p.id)) { featured.push(p); usedIds.add(p.id); }
      if (featured.length >= limit) break;
    }
  }

  // 3. Se ainda faltam slots, completa com os artigos mais recentes
  if (featured.length < limit) {
    const usedIds = new Set(featured.map((p) => p.id));
    const { data: recent } = await supabase
      .from('posts_public')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit * 2);
    for (const p of (recent ?? []) as PostSummary[]) {
      if (!usedIds.has(p.id)) { featured.push(p); usedIds.add(p.id); }
      if (featured.length >= limit) break;
    }
  }

  return featured;
}

function isColumnMissingError(error: any): boolean {
  return error?.code === '42703' || (error?.message ?? '').includes('does not exist');
}

export async function getRecentPosts(page = 1, perPage = 12, lang = 'pt') {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const q = supabase
    .from('posts_public')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(from, to);
  if (lang !== 'pt') q.eq('language', lang);
  const { data, error, count } = await q;
  if (error) {
    if (isColumnMissingError(error)) {
      // Coluna language ainda não existe na view — retorna sem filtro de idioma
      const fallback = await supabase
        .from('posts_public')
        .select('*', { count: 'exact' })
        .order('published_at', { ascending: false })
        .range(from, to);
      return { posts: (fallback.data ?? []) as PostSummary[], total: fallback.count ?? 0 };
    }
    throw error;
  }
  return { posts: data as PostSummary[], total: count ?? 0 };
}

export async function getPostsByCategory(categorySlug: string, page = 1, perPage = 12, lang = 'pt') {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const q = supabase
    .from('posts_public')
    .select('*', { count: 'exact' })
    .eq('category_slug', categorySlug)
    .order('published_at', { ascending: false })
    .range(from, to);
  if (lang !== 'pt') q.eq('language', lang);
  const { data, error, count } = await q;
  if (error) {
    if (isColumnMissingError(error)) {
      const fallback = await supabase
        .from('posts_public')
        .select('*', { count: 'exact' })
        .eq('category_slug', categorySlug)
        .order('published_at', { ascending: false })
        .range(from, to);
      return { posts: (fallback.data ?? []) as PostSummary[], total: fallback.count ?? 0 };
    }
    throw error;
  }
  return { posts: data as PostSummary[], total: count ?? 0 };
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts_public')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as PostFull | null;
}

export async function getRelatedPosts(categorySlug: string, excludeSlug: string, limit = 3, lang = 'pt') {
  const q = supabase
    .from('posts_public')
    .select('*')
    .eq('category_slug', categorySlug)
    .neq('slug', excludeSlug)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (lang !== 'pt') q.eq('language', lang);
  const { data, error } = await q;
  if (error) {
    if (isColumnMissingError(error)) {
      const fallback = await supabase
        .from('posts_public')
        .select('*')
        .eq('category_slug', categorySlug)
        .neq('slug', excludeSlug)
        .order('published_at', { ascending: false })
        .limit(limit);
      return (fallback.data ?? []) as PostSummary[];
    }
    throw error;
  }
  return data as PostSummary[];
}

export async function getPublishedSlugsByLang(lang: string) {
  const q = supabase.from('posts_public').select('slug');
  if (lang === 'pt') {
    q.or('language.eq.pt,language.is.null');
  } else {
    q.eq('language', lang);
  }
  const { data, error } = await q;
  // Se a coluna language não existir na view, retorna array vazio
  // (as páginas EN/ES ficam sem artigos individuais até a view ser atualizada)
  if (error) {
    if (isColumnMissingError(error)) return [];
    throw error;
  }
  return (data ?? []).map((p: any) => p.slug as string);
}

export async function getApprovedComments(postId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select('id, name, content, created_at')
    .eq('post_id', postId)
    .eq('approved', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name');
  if (error) throw error;
  return data;
}

export async function isTickerEnabled(): Promise<boolean> {
  const { data, error } = await supabase
    .from('categories')
    .select('show_in_ticker')
    .eq('slug', 'igreja-perseguida')
    .maybeSingle();
  if (error || !data) return false;
  return data.show_in_ticker === true;
}

export async function getTagsByPostId(postId: string) {
  const { data, error } = await supabase
    .from('post_tags')
    .select('tags(name, slug)')
    .eq('post_id', postId);
  if (error) throw error;
  return (data ?? []).map((r: any) => r.tags).filter(Boolean);
}
