-- Fila auditável da automação editorial. A geração sempre termina em rascunho.
create table if not exists public.editorial_automation_jobs (
  id uuid primary key default gen_random_uuid(),
  source_type text not null check (source_type in ('topic', 'youtube')),
  topic text,
  youtube_url text,
  seo_keyword text not null,
  assigned_agent text not null default 'editorial'
    check (assigned_agent in ('editorial', 'publisher', 'carousel')),
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

create table if not exists public.content_approvals (
  id uuid primary key default gen_random_uuid(),
  work_id uuid not null references public.editorial_automation_jobs(id) on delete cascade,
  channel text not null check (channel in ('article', 'deploy', 'instagram')),
  version integer not null check (version > 0),
  status text not null default 'pending' check (status in ('pending', 'approved', 'revoked')),
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  unique (work_id, channel, version),
  constraint approval_identity check (
    (status = 'approved' and approved_by is not null and approved_at is not null)
    or status <> 'approved'
  )
);

alter table public.content_approvals enable row level security;

drop policy if exists "Users can read own content approvals" on public.content_approvals;
create policy "Users can read own content approvals"
  on public.content_approvals for select to authenticated
  using (exists (
    select 1 from public.editorial_automation_jobs job
    where job.id = work_id and job.requested_by = auth.uid()
  ));

-- Aprovações são registradas por uma Edge Function autenticada. O navegador
-- não recebe permissão direta para alterar este histórico.

create index if not exists editorial_jobs_requested_by_created_idx
  on public.editorial_automation_jobs (requested_by, created_at desc);

alter table public.editorial_automation_jobs enable row level security;

drop policy if exists "Users can read own editorial jobs" on public.editorial_automation_jobs;
create policy "Users can read own editorial jobs"
  on public.editorial_automation_jobs for select to authenticated
  using (requested_by = auth.uid());

-- Criação e atualização são feitas pela Edge Function com service role.
-- O navegador não recebe permissão de escrita direta nesta fila.

