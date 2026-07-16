-- ============================================================
-- Políticas de acesso do Storage (bucket "media")
-- Sem isso, upload de imagem falha com "row-level security policy"
-- mesmo com o usuário autenticado corretamente.
-- ============================================================

create policy "Autenticados podem enviar imagens"
on storage.objects for insert
to authenticated
with check (bucket_id = 'media');

create policy "Autenticados podem atualizar imagens"
on storage.objects for update
to authenticated
using (bucket_id = 'media');

create policy "Qualquer um pode ver imagens"
on storage.objects for select
using (bucket_id = 'media');

create policy "Autenticados podem apagar imagens"
on storage.objects for delete
to authenticated
using (bucket_id = 'media');
