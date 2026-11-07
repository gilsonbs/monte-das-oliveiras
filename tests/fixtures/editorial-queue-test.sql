begin;

do $$
declare
  test_user uuid;
  test_topic uuid;
  test_job uuid;
  claimed record;
  topic_status text;
  job_status text;
  job_agent text;
begin
  select id into test_user from auth.users order by created_at limit 1;
  if test_user is null then raise exception 'Nenhum usuário local disponível para o teste.'; end if;

  perform set_config('request.jwt.claim.sub', test_user::text, true);
  perform set_config('request.jwt.claim.role', 'authenticated', true);

  insert into public.editorial_topics (
    input_type, topic, seo_keyword, priority, requested_execution,
    status, current_agent, source_fingerprint, requested_by
  ) values (
    'topic', 'Pauta urgente de teste', 'pauta urgente', 'urgent', 'now',
    'pending', 'orchestrator', 'test:' || gen_random_uuid()::text, test_user
  ) returning id into test_topic;

  insert into public.editorial_automation_jobs (
    topic_id, source_type, topic, seo_keyword, assigned_agent, priority,
    requested_execution, status, requested_by
  ) values (
    test_topic, 'topic', 'Pauta urgente de teste', 'pauta urgente',
    'orchestrator', 'urgent', 'now', 'queued', test_user
  ) returning id into test_job;

  select * into claimed from public.claim_next_editorial_job();
  if claimed.job_id is distinct from test_job then raise exception 'A rotina não reservou o trabalho urgente.'; end if;

  select status, assigned_agent into job_status, job_agent
  from public.editorial_automation_jobs where id = test_job;
  select status into topic_status from public.editorial_topics where id = test_topic;

  if job_status <> 'processing' or job_agent <> 'editorial' then
    raise exception 'Estado inválido do trabalho: %, %', job_status, job_agent;
  end if;
  if topic_status <> 'reserved' then
    raise exception 'Estado inválido da pauta: %', topic_status;
  end if;

  raise notice 'Fila validada: pauta urgente reservada uma única vez para o agente editorial.';
end;
$$;

rollback;
