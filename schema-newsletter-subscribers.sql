-- Tabela para capturar leads/newsletter pelo site.
-- Execute no SQL Editor do Supabase caso a tabela ainda nao exista.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  source text,
  post_slug text,
  offer_title text,
  consent boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers (lower(email));

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "Public can subscribe to newsletter" on public.newsletter_subscribers;
create policy "Public can subscribe to newsletter"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (email is not null and email <> '');

