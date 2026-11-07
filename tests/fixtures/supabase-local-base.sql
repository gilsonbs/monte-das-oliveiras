-- Dependência mínima para testar a fila em um Supabase local vazio.
-- O projeto real já possui esta tabela com todos os campos editoriais.
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text,
  slug text unique,
  content text,
  excerpt text,
  seo_title text,
  meta_description text,
  category_id uuid,
  cover_media_id uuid,
  status text not null default 'draft',
  published_at timestamptz,
  is_featured boolean not null default false,
  language text not null default 'pt'
);

alter table public.posts
  add column if not exists title text,
  add column if not exists slug text,
  add column if not exists content text,
  add column if not exists excerpt text,
  add column if not exists seo_title text,
  add column if not exists meta_description text,
  add column if not exists category_id uuid,
  add column if not exists cover_media_id uuid,
  add column if not exists is_featured boolean not null default false,
  add column if not exists language text not null default 'pt';

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

insert into public.categories (name, slug)
values ('Estudos Biblicos', 'estudos-biblicos')
on conflict (slug) do nothing;

