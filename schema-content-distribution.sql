-- Pacotes de distribuição social gerados a partir de posts publicados.
-- O conteúdo é rascunho até ser revisado pelo administrador.
create table if not exists public.content_distribution_packages (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft', 'approved', 'scheduled', 'published', 'failed')),
  package jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (post_id)
);

alter table public.content_distribution_packages enable row level security;

drop policy if exists "Authenticated can manage distribution packages" on public.content_distribution_packages;
create policy "Authenticated can manage distribution packages"
  on public.content_distribution_packages
  for all to authenticated
  using (true)
  with check (true);
