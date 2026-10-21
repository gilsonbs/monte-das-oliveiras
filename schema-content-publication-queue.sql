create table if not exists public.content_publication_queue (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.content_distribution_packages(id) on delete cascade,
  platform text not null check (platform in ('instagram', 'facebook', 'youtube', 'tiktok', 'pinterest')),
  scheduled_for timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'published', 'failed', 'cancelled')),
  published_at timestamptz,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.content_publication_queue enable row level security;

drop policy if exists "Authenticated can manage publication queue" on public.content_publication_queue;
create policy "Authenticated can manage publication queue"
  on public.content_publication_queue
  for all to authenticated
  using (true)
  with check (true);
