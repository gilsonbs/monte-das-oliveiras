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
  const { data, error } = await supabase
    .from('posts_public')
    .select('*')
    .eq('is_featured', true)
    .not('featured_order', 'is', null)
    .order('featured_order', { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data as PostSummary[];
}

export async function getRecentPosts(page = 1, perPage = 12) {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const { data, error, count } = await supabase
    .from('posts_public')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(from, to);
  if (error) throw error;
  return { posts: data as PostSummary[], total: count ?? 0 };
}

export async function getPostsByCategory(categorySlug: string, page = 1, perPage = 12) {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const { data, error, count } = await supabase
    .from('posts_public')
    .select('*', { count: 'exact' })
    .eq('category_slug', categorySlug)
    .order('published_at', { ascending: false })
    .range(from, to);
  if (error) throw error;
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

export async function getRelatedPosts(categorySlug: string, excludeSlug: string, limit = 3) {
  const { data, error } = await supabase
    .from('posts_public')
    .select('*')
    .eq('category_slug', categorySlug)
    .neq('slug', excludeSlug)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data as PostSummary[];
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
