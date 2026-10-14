-- Configuracoes publicas que o site estatico pode ler durante o build.
-- Nao use esta tabela para tokens, segredos ou credenciais.

create table if not exists public.public_site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.public_site_settings enable row level security;

drop policy if exists "Public can read public site settings" on public.public_site_settings;
create policy "Public can read public site settings"
  on public.public_site_settings
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated can manage public site settings" on public.public_site_settings;
create policy "Authenticated can manage public site settings"
  on public.public_site_settings
  for all
  to authenticated
  using (true)
  with check (true);

