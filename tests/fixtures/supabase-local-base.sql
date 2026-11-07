-- Dependência mínima para testar a fila em um Supabase local vazio.
-- O projeto real já possui esta tabela com todos os campos editoriais.
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'draft',
  published_at timestamptz
);

