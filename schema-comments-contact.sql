-- ============================================================
-- Monte das Oliveiras — adição: comentários e contato
-- Rodar no SQL Editor do Supabase (depois do schema.sql original)
-- ============================================================

-- ---------- MENSAGENS DE CONTATO ----------
create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

create policy "Qualquer um pode enviar mensagem de contato"
  on contact_messages for insert
  with check (true);

create policy "Autenticados leem mensagens de contato"
  on contact_messages for select
  using (auth.role() = 'authenticated');

create policy "Autenticados atualizam mensagens de contato"
  on contact_messages for update
  using (auth.role() = 'authenticated');

create policy "Autenticados apagam mensagens de contato"
  on contact_messages for delete
  using (auth.role() = 'authenticated');

-- ---------- COMENTÁRIOS ----------
create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts(id) on delete cascade,
  name text not null,
  email text not null,
  content text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_comments_post on comments (post_id, approved);

alter table comments enable row level security;

create policy "Qualquer um pode comentar"
  on comments for insert
  with check (true);

create policy "Comentários aprovados são públicos"
  on comments for select
  using (approved = true);

create policy "Autenticados veem todos os comentários"
  on comments for select
  using (auth.role() = 'authenticated');

create policy "Autenticados moderam comentários"
  on comments for update
  using (auth.role() = 'authenticated');

create policy "Autenticados apagam comentários"
  on comments for delete
  using (auth.role() = 'authenticated');
