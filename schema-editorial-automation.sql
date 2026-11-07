-- Lista editorial principal. Uma pauta pode gerar várias execuções auditáveis.
create table if not exists public.editorial_topics (
  id uuid primary key default gen_random_uuid(),
  input_type text not null check (input_type in ('topic', 'youtube')),
  topic text,
  youtube_url text,
  seo_keyword text not null,
  category_slug text,
  priority text not null default 'normal' check (priority in ('normal', 'high', 'urgent')),
  requested_execution text not null default 'routine' check (requested_execution in ('routine', 'now')),
  scheduled_for timestamptz,
  status text not null default 'pending' check (status in (
    'incomplete', 'pending', 'reserved', 'researching', 'writing_article',
    'awaiting_review', 'article_approved', 'preparing_carousel',
    'awaiting_social_approval', 'ready_to_publish', 'published', 'paused',
    'cancelled', 'error'
  )),
  current_agent text check (current_agent in ('orchestrator', 'editorial', 'carousel', 'publisher')),
  source_fingerprint text not null,
  error_message text,
  requested_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint editorial_topic_source_required check (
    (input_type = 'topic' and nullif(trim(topic), '') is not null and youtube_url is null)
    or
    (input_type = 'youtube' and nullif(trim(youtube_url), '') is not null and topic is null)
  ),
  constraint urgent_runs_now check (priority <> 'urgent' or requested_execution = 'now')
);

create index if not exists editorial_topics_queue_idx
  on public.editorial_topics (requested_by, status, priority, scheduled_for, created_at);

create unique index if not exists editorial_topics_active_fingerprint_idx
  on public.editorial_topics (requested_by, source_fingerprint)
  where status not in ('published', 'cancelled');

alter table public.editorial_topics enable row level security;

drop policy if exists "Users can read own editorial topics" on public.editorial_topics;
create policy "Users can read own editorial topics"
  on public.editorial_topics for select to authenticated
  using (requested_by = auth.uid());

-- Fila auditável da automação editorial. A geração sempre termina em rascunho.
create table if not exists public.editorial_automation_jobs (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references public.editorial_topics(id) on delete cascade,
  source_type text not null check (source_type in ('topic', 'youtube')),
  topic text,
  youtube_url text,
  seo_keyword text not null,
  assigned_agent text not null default 'orchestrator'
    check (assigned_agent in ('orchestrator', 'editorial', 'publisher', 'carousel')),
  priority text not null default 'normal' check (priority in ('normal', 'high', 'urgent')),
  requested_execution text not null default 'routine' check (requested_execution in ('routine', 'now')),
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

alter table public.editorial_automation_jobs
  add column if not exists topic_id uuid references public.editorial_topics(id) on delete cascade,
  add column if not exists priority text not null default 'normal',
  add column if not exists requested_execution text not null default 'routine';

alter table public.editorial_automation_jobs
  drop constraint if exists editorial_automation_jobs_assigned_agent_check,
  drop constraint if exists editorial_jobs_agent_check,
  drop constraint if exists editorial_automation_jobs_priority_check,
  drop constraint if exists editorial_automation_jobs_requested_execution_check;

alter table public.editorial_automation_jobs
  add constraint editorial_jobs_agent_check
    check (assigned_agent in ('orchestrator', 'editorial', 'publisher', 'carousel')),
  add constraint editorial_automation_jobs_priority_check
    check (priority in ('normal', 'high', 'urgent')),
  add constraint editorial_automation_jobs_requested_execution_check
    check (requested_execution in ('routine', 'now'));

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

create index if not exists editorial_jobs_claim_idx
  on public.editorial_automation_jobs (requested_by, status, priority, created_at);

alter table public.editorial_automation_jobs enable row level security;

drop policy if exists "Users can read own editorial jobs" on public.editorial_automation_jobs;
create policy "Users can read own editorial jobs"
  on public.editorial_automation_jobs for select to authenticated
  using (requested_by = auth.uid());

-- Criação e atualização são feitas pela Edge Function com service role.
-- O navegador não recebe permissão de escrita direta nesta fila.

-- Reserva atômica para a rotina local do Orquestrador. A função só enxerga
-- trabalhos do usuário autenticado e impede dois executores de pegar a mesma pauta.
create or replace function public.claim_next_editorial_job()
returns table (
  job_id uuid,
  topic_id uuid,
  source_type text,
  topic text,
  youtube_url text,
  seo_keyword text,
  category_slug text,
  priority text,
  requested_execution text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_job public.editorial_automation_jobs%rowtype;
begin
  select job.* into selected_job
  from public.editorial_automation_jobs job
  join public.editorial_topics editorial_topic on editorial_topic.id = job.topic_id
  where job.requested_by = auth.uid()
    and job.status = 'queued'
    and (editorial_topic.scheduled_for is null or editorial_topic.scheduled_for <= now())
  order by
    case job.priority when 'urgent' then 0 when 'high' then 1 else 2 end,
    job.created_at
  for update of job skip locked
  limit 1;

  if selected_job.id is null then return; end if;

  update public.editorial_automation_jobs
  set status = 'processing', assigned_agent = 'editorial', updated_at = now()
  where id = selected_job.id;

  update public.editorial_topics
  set status = 'reserved', current_agent = 'editorial', updated_at = now()
  where id = selected_job.topic_id and requested_by = auth.uid();

  return query
  select selected_job.id, editorial_topic.id, selected_job.source_type,
    selected_job.topic, selected_job.youtube_url, selected_job.seo_keyword,
    editorial_topic.category_slug, selected_job.priority, selected_job.requested_execution
  from public.editorial_topics editorial_topic
  where editorial_topic.id = selected_job.topic_id;
end;
$$;

revoke all on function public.claim_next_editorial_job() from public, anon;
grant execute on function public.claim_next_editorial_job() to authenticated;

