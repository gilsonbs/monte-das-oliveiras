# Integração editorial com OpenBot

## Etapas

1. **Base segura:** criar a fila `editorial_automation_jobs`, manter RLS ativa e remover segredos do navegador.
2. **Geração controlada:** receber tema ou YouTube, chamar o OpenBot pela Edge Function e aceitar somente uma resposta com referências verificadas.
3. **Rascunho e revisão:** gravar o post obrigatoriamente com `status = draft`, abrir a pré-visualização existente e registrar a execução para auditoria.
4. **SEO, imagem e links:** o contrato já recebe categorias e links internos. Upload de imagem será habilitado quando o formato de imagem do OpenBot estiver definido.
5. **Distribuição independente:** salvar o pacote social como `draft`. Aprovação e fila de publicação continuam separadas do artigo.
6. **Publicação:** publicar o artigo e acionar o deploy são ações diferentes. O deploy passa pela função `trigger-deploy`, sem token no navegador.

## Contrato esperado do OpenBot

O webhook recebe `task`, `source`, `seo_keyword`, `constraints`, `available_categories` e `internal_links`. Deve responder JSON com:

```json
{
  "article": {
    "title": "...",
    "slug": "...",
    "content": "<p>...</p>",
    "excerpt": "...",
    "seo_title": "...",
    "meta_description": "...",
    "category_id": "uuid",
    "status": "draft",
    "faq": [{ "question": "...", "answer": "..." }],
    "verified_references": [
      { "reference": "Mateus 24:3", "source_url": "https://...", "verified": true }
    ]
  },
  "social_package": {}
}
```

Uma declaração do modelo não prova, sozinha, que o texto bíblico está correto. Antes de produção, o OpenBot precisa consultar uma fonte bíblica definida pelo projeto e preencher `source_url`. A revisão humana continua obrigatória.

## Configuração sem produção

1. Aplicar `schema-editorial-automation.sql` em um projeto Supabase de desenvolvimento.
2. Publicar `openbot-editorial` e `trigger-deploy` somente nesse projeto.
3. Configurar `OPENBOT_EDITORIAL_WEBHOOK_URL`, `OPENBOT_EDITORIAL_TOKEN` e `ADMIN_ALLOWED_ORIGIN` como secrets da Edge Function.
4. Não configurar `GITHUB_DEPLOY_TOKEN` no ambiente de teste se o objetivo for impedir deploy por construção.
5. Testar com um usuário autenticado de desenvolvimento e confirmar no banco que o post ficou como `draft` e `published_at` ficou nulo.

## Revisão inicial de RLS e segredos

- `editorial_automation_jobs`: o navegador lê apenas as próprias execuções. Escrita fica restrita à Edge Function.
- `content_distribution_packages` e `content_publication_queue`: qualquer usuário autenticado pode gerenciar tudo. Isso só é aceitável enquanto todo usuário autenticado for administrador. O próximo endurecimento deve usar uma tabela de perfis com função `admin`.
- bucket `media`: leitura pública combina com imagens do portal. Inserção, alteração e exclusão estão abertas a qualquer autenticado; também devem migrar para uma regra de administrador.
- `site_settings`: havia um token do GitHub sendo lido no navegador. O código deixou de fazer isso. Aplique `schema-security-hardening.sql`, revogue o token antigo e configure o substituto apenas como secret da Edge Function.
- o hook de deploy que virava `PUBLIC_VERCEL_DEPLOY_HOOK_URL` foi removido do bundle e do editor.

