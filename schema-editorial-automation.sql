-- Fila auditável da automação editorial. A geração sempre termina em rascunho.
create table if not exists public.editorial_automation_jobs (
  id uuid primary key default gen_random_uuid(),
  source_type text not null check (source_type in ('topic', 'youtube')),
  topic text,
  youtube_url text,
  seo_keyword text not null,
  status text not null default 'queued'
    check (status in ('queued', 'processing', 'review_required', 'failed', 'cancelled')),
  post_id uuid references public.posts(id) on delete set null,
  validation_report jsonb not null default '{}'::jsonb,
  error_message text,
  requested_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint editorial_source_required check (
    (source_type = 'topic' and nullif(trim(topic), '') is not null and youtube_url is null)
    or
    (source_type = 'youtube' and nullif(trim(youtube_url), '') is not null and topic is null)
  )
);

create index if not exists editorial_jobs_requested_by_created_idx
  on public.editorial_automation_jobs (requested_by, created_at desc);

alter table public.editorial_automation_jobs enable row level security;

drop policy if exists "Users can read own editorial jobs" on public.editorial_automation_jobs;
create policy "Users can read own editorial jobs"
  on public.editorial_automation_jobs for select to authenticated
  using (requested_by = auth.uid());

-- Criação e atualização são feitas pela Edge Function com service role.
-- O navegador não recebe permissão de escrita direta nesta fila.

