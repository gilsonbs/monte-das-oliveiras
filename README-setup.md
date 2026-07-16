# Monte das Oliveiras — site (Astro + Supabase)

Projeto testado com `npm run build` antes da entrega — compila limpo.

## 1. Instalar

```bash
npm install
cp .env.example .env
```

Preencha o `.env` com a **Publishable key** (não a secret — essa é exposta
no navegador, então precisa ser a de leitura pública, protegida por RLS):

```
PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxx
```

## 2. Rodar localmente

```bash
npm run dev
```

Abre em `http://localhost:4321`. Se os posts não aparecerem, confira se o
`.env` está certo e se o schema/importação já rodaram no Supabase.

## 3. Estrutura

```
src/
  layouts/BaseLayout.astro   → head, SEO, JSON-LD, fontes
  components/
    Header.astro / Footer.astro
    PostCard.astro           → card usado em "Mais lidas" e categorias
    AdSlot.astro             → slot de anúncio (mostra placeholder até
                                configurar o AdSense de verdade em ad_slots)
  lib/supabase.ts            → cliente + todas as queries usadas no site
  pages/
    index.astro              → home (hero + mais lidas + feed + sidebar)
    categoria/[slug].astro   → listagem por categoria, com paginação
    [slug].astro             → post individual, com anúncio in-article
```

## 4. Por que "server" (SSR) e não "static"

O `astro.config.mjs` está em `output: 'server'` com o adaptador Node. Isso
significa que cada página é renderizada na hora, buscando os dados mais
recentes do Supabase — sem precisar rodar `npm run build` de novo toda vez
que você publicar um post pelo painel admin. Roda direto na sua VPS.

## 5. Deploy na VPS

```bash
npm run build
node dist/server/entry.mjs
```

Por padrão sobe na porta 4321 (dá pra mudar com a variável `PORT`). Na
prática, você vai querer isso atrás de um Nginx como proxy reverso, e
rodando com PM2 (ou systemd) pra reiniciar sozinho se cair:

```bash
npm install -g pm2
pm2 start dist/server/entry.mjs --name monte-das-oliveiras
pm2 save
```

## 6. Ativar os anúncios de verdade

Enquanto a tabela `ad_slots` não tiver nenhuma linha configurada, o site
mostra o placeholder tracejado "Publicidade" (do jeito que apareceu nos
mockups) — não quebra nada. Pra ativar de verdade, insira no Supabase:

```sql
insert into ad_slots (key, label, ad_client, ad_slot_id, format, active) values
  ('sidebar_300x600', 'Publicidade', 'ca-pub-XXXXXXXXXX', '1234567890', 'auto', true),
  ('in_article',      'Publicidade', 'ca-pub-XXXXXXXXXX', '1234567891', 'fluid', true),
  ('feed_native',     'Publicidade', 'ca-pub-XXXXXXXXXX', '1234567892', 'fluid', true);
```

(os `ad_slot_id` você pega no painel do AdSense ao criar cada bloco de
anúncio — um por posição)

## 8. Painel administrativo (`/admin`)

O painel usa autenticação real do Supabase (não é fake) — protegido por
middleware, ninguém acessa `/admin/*` sem estar logado.

### Criar seu usuário de acesso

O painel **não tem cadastro público** (por segurança — só você deve
conseguir logar). Cria seu usuário direto no Supabase:

1. No painel do Supabase, vai em **Authentication → Users → Add user**
2. Preenche e-mail e senha, marca **Auto Confirm User** (pra não precisar
   confirmar por e-mail)
3. Pronto — usa esse e-mail/senha em `montedasoliveiras.com/admin/login`

### O que tem em cada tela

- **`/admin`**: lista de posts (todos, inclusive rascunhos), com atalho pra
  editar ou ver o post publicado
- **`/admin/posts/new`** e **`/admin/posts/[id]`**: editor — título (gera o
  slug automaticamente em posts novos), conteúdo em HTML, campos de SEO,
  categoria, tags (separadas por vírgula, criadas automaticamente se não
  existirem), toggle de destaque, e o **upload de capa com os 4 formatos
  gerados automaticamente no navegador** (mesmo princípio do script de
  importação, só que rodando via Canvas API em vez do `sharp`, já que aqui
  é no navegador do usuário, não em um script Node)
- **`/admin/categorias`**: renomear categorias (o que fizemos via SQL pro
  "Fim dos Tempos" antes, agora dá pra fazer por aqui)
- **`/admin/anuncios`**: configurar os 3 slots do AdSense (Publisher ID +
  ID do bloco de cada posição) sem precisar mexer no banco

### Limitação atual do editor de conteúdo

O campo de conteúdo é **HTML puro num textarea**, não um editor visual
(WYSIWYG) ainda. Funciona bem pra edições e ajustes, mas pra quem for
escrever posts do zero direto no painel, um editor rico (tipo o que
aparecia nos mockups, com botões de negrito/H2/citação) é a evolução
natural — posso implementar isso na sequência se fizer sentido pro seu
fluxo.


## 9. O que ainda falta pra ficar 100% completo

- **`ads.txt`**: publicar em `public/ads.txt` com o conteúdo que o AdSense
  fornece (Conta → ads.txt no painel do Google)
- **Banner de consentimento (LGPD)**: entra antes do AdSense carregar de
  verdade — ainda não incluído neste pacote
- **Editor de conteúdo visual (WYSIWYG)**: hoje é HTML puro num textarea —
  funcional, mas menos amigável que os mockups sugeriam pra quem for
  escrever posts do zero direto no painel
- **Página 404, `/buscar`, `/tag/[slug]`**: rotas referenciadas no código
  mas ainda não implementadas
