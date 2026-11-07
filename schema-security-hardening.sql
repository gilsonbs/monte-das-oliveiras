-- Execute depois de publicar a versão segura de trigger-deploy.
-- O token antigo deve ser revogado no GitHub e recriado como secret da Edge Function.
delete from public.site_settings where key = 'github_deploy_token';

-- Impede que uma configuração futura com o mesmo nome seja exposta por engano.
alter table public.site_settings
  drop constraint if exists site_settings_no_private_keys;
alter table public.site_settings
  add constraint site_settings_no_private_keys
  check (key not in ('github_deploy_token', 'vercel_deploy_hook_url', 'openbot_editorial_token'));

