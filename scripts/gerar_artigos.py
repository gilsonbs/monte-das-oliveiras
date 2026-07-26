#!/usr/bin/env python3
"""
Monte das Oliveiras — Agente de geração de artigos
Executa 2x/dia via GitHub Actions, salva rascunhos no Supabase.
"""

import json
import os
import re
import sys
import time
from datetime import datetime, timezone, timedelta

import anthropic
import feedparser
from supabase import create_client

# ── Configuração ──────────────────────────────────────────────────────────────

FEEDS = [
    ("cristao", "https://gospelprime.com.br/feed/"),
    ("cristao", "https://noticiasgospel.com.br/feed/"),
    ("cristao", "https://jornalcristao.com.br/feed/"),
    ("geral",   "https://g1.globo.com/rss/g1/"),
    ("geral",   "https://feeds.bbci.co.uk/portuguese/rss.xml"),
]

supabase = create_client(
    os.environ["PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_KEY"],
)
claude = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

MANUAL_EDITORIAL = """
IDENTIDADE DO SITE: Monte das Oliveiras — portal cristão evangélico brasileiro.
PÚBLICO: Cristãos que buscam respostas bíblicas para o cotidiano, notícias vistas
         sob perspectiva bíblica e conteúdo de edificação espiritual.

ESTRUTURA DO ARTIGO (obrigatória):
- Mínimo 1.200 palavras
- Tom: pastoral, acolhedor, bíblico, sem julgamento excessivo
- Parágrafos curtos (máx 4 linhas)
- Subtítulos H2 a cada 3–4 parágrafos
- Inclua 2–4 versículos bíblicos com referência completa (ex: João 3:16)
- Conecte o tema com a realidade espiritual do crente brasileiro
- Termine com chamada à reflexão ou oração relacionada ao tema

FORMATOS QUE FUNCIONAM PARA O PÚBLICO CRISTÃO:
- "O que a Bíblia diz sobre [tema da notícia]"
- "Como um cristão deve agir diante de [situação]"
- "[Acontecimento] e a perspectiva profética"
- "5 lições que [evento] nos ensina sobre fé"
- "Crente pode [fazer X]? A resposta bíblica"

REGRAS DE SEO:
- seo_title: exatamente 50–60 caracteres; deve conter a palavra-chave principal;
  diferente do título editorial; responde a uma pergunta ou curiosidade do leitor
- meta_description: exatamente 130–155 caracteres; verbo de ação; convida ao clique;
  responde à pergunta principal do artigo
- slug: 3–6 palavras, sem acento, sem maiúsculas, separadas por hífen
- excerpt: 1–2 frases resumindo o valor do artigo (máx 200 caracteres)
- read_time_minutes: calcule corretamente (200 palavras por minuto)
"""


# ── Buscar notícias dos feeds RSS ─────────────────────────────────────────────

def fetch_news(max_per_feed: int = 7) -> list[dict]:
    items = []
    for tipo, url in FEEDS:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:max_per_feed]:
                title = entry.get("title", "").strip()
                summary = re.sub(r"<[^>]+>", "", entry.get("summary", "")).strip()[:400]
                link = entry.get("link", "")
                if title and link:
                    items.append({
                        "tipo": tipo,
                        "titulo": title,
                        "resumo": summary,
                        "link": link,
                    })
        except Exception as exc:
            print(f"[AVISO] Feed {url} falhou: {exc}", file=sys.stderr)
    print(f"[INFO] {len(items)} notícias coletadas de {len(FEEDS)} feeds")
    return items


# ── Buscar posts recentes para evitar repetição ───────────────────────────────

def fetch_recent_titles(hours: int = 36) -> list[str]:
    cutoff = (datetime.now(timezone.utc) - timedelta(hours=hours)).isoformat()
    try:
        resp = supabase.table("posts") \
            .select("title") \
            .gte("created_at", cutoff) \
            .execute()
        return [row["title"] for row in (resp.data or [])]
    except Exception as exc:
        print(f"[AVISO] Não foi possível buscar posts recentes: {exc}", file=sys.stderr)
        return []


# ── Buscar categorias ─────────────────────────────────────────────────────────

def fetch_categories() -> list[dict]:
    resp = supabase.table("categories").select("id, name, slug").execute()
    return resp.data or []


# ── Selecionar as 2 melhores notícias via Claude ─────────────────────────────

def select_news(
    items: list[dict],
    categories: list[dict],
    recent_titles: list[str],
) -> list[dict]:
    cats_str = ", ".join(f'{c["name"]} ({c["slug"]})' for c in categories)
    recent_str = "; ".join(recent_titles[:10]) if recent_titles else "nenhum"

    numbered = [
        {"indice": i, "tipo": n["tipo"], "titulo": n["titulo"], "resumo": n["resumo"]}
        for i, n in enumerate(items)
    ]

    prompt = f"""Você é o editor-chefe do Monte das Oliveiras, portal cristão evangélico brasileiro.

Analise as notícias abaixo e selecione as 2 que têm maior potencial para se tornarem
artigos originais com ângulo bíblico para nosso público.

Critérios (em ordem de importância):
1. Relevância espiritual ou impacto na vida cristã
2. Volume de busca potencial (o leitor vai procurar isso no Google?)
3. Possibilidade de criar conteúdo original com perspectiva bíblica genuína
4. Preferência por notícias de portais cristãos (tipo="cristao") para assuntos de fé
5. NÃO selecione notícias similares a artigos já publicados recentemente

Artigos já publicados recentemente (evite repetir temas): {recent_str}

Categorias disponíveis no site: {cats_str}

Notícias disponíveis:
{json.dumps(numbered, ensure_ascii=False, indent=2)}

Responda APENAS com JSON válido, sem markdown, neste formato exato:
[
  {{"indice": 0, "categoria_slug": "slug-da-categoria", "motivo_escolha": "explicação breve"}},
  {{"indice": 5, "categoria_slug": "slug-da-categoria", "motivo_escolha": "explicação breve"}}
]"""

    msg = claude.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=400,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = msg.content[0].text.strip()
    raw = re.sub(r"^```[a-z]*\n?", "", raw)
    raw = re.sub(r"\n?```$", "", raw)
    return json.loads(raw)


# ── Gerar artigo completo via Claude ─────────────────────────────────────────

def generate_article(noticia: dict, categoria: dict) -> dict:
    prompt = f"""{MANUAL_EDITORIAL}

Com base nesta notícia, crie um artigo completo para o Monte das Oliveiras.
Categoria escolhida: {categoria["name"]}

NOTÍCIA:
Título: {noticia["titulo"]}
Resumo: {noticia["resumo"]}
Fonte original: {noticia["link"]}

IMPORTANTE:
- O artigo deve ter ângulo e voz próprios — não é uma republição da notícia
- Mencione a notícia como contexto, mas desenvolva o tema bíblico com profundidade
- O conteúdo HTML deve usar tags <p>, <h2>, <blockquote> — nada mais
- Calcule read_time_minutes com base no texto gerado (200 palavras/minuto)

Responda APENAS com JSON válido (sem markdown), exatamente neste formato:
{{
  "title": "Título editorial do artigo (até 80 chars)",
  "seo_title": "Título SEO de 50 a 60 caracteres exatos",
  "slug": "slug-sem-acento-3-a-6-palavras",
  "excerpt": "Resumo do valor do artigo em até 200 caracteres.",
  "meta_description": "Meta description de 130 a 155 caracteres com verbo de ação.",
  "read_time_minutes": 7,
  "content": "<p>Conteúdo HTML completo com no mínimo 1.200 palavras...</p>"
}}"""

    msg = claude.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=5000,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = msg.content[0].text.strip()
    raw = re.sub(r"^```[a-z]*\n?", "", raw)
    raw = re.sub(r"\n?```$", "", raw)
    return json.loads(raw)


# ── Salvar rascunho no Supabase ───────────────────────────────────────────────

def save_draft(article: dict, category_id: str) -> str:
    payload = {
        "title":             article["title"],
        "slug":              article["slug"],
        "content":           article["content"],
        "excerpt":           article.get("excerpt") or None,
        "seo_title":         article.get("seo_title") or None,
        "meta_description":  article.get("meta_description") or None,
        "read_time_minutes": article.get("read_time_minutes") or None,
        "category_id":       category_id,
        "status":            "draft",
        "is_featured":       False,
        "cover_media_id":    None,
        "published_at":      None,
    }
    resp = supabase.table("posts").insert(payload).execute()
    if resp.data:
        return resp.data[0].get("id", "?")
    raise RuntimeError(f"Erro ao inserir post: {resp}")


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    print("=" * 60)
    print(f"Monte das Oliveiras — Agente de Artigos")
    print(f"Horário: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    print("=" * 60)

    items      = fetch_news()
    categories = fetch_categories()
    recent     = fetch_recent_titles()

    if len(items) < 2:
        print("[ERRO] Menos de 2 notícias disponíveis. Abortando.", file=sys.stderr)
        sys.exit(1)

    print(f"\n[INFO] Selecionando as 2 melhores entre {len(items)} notícias...")
    selected = select_news(items, categories, recent)

    for i, sel in enumerate(selected[:2], 1):
        noticia = items[sel["indice"]]
        cat = next(
            (c for c in categories if c["slug"] == sel["categoria_slug"]),
            categories[0],
        )

        print(f"\n[{i}/2] Notícia selecionada: {noticia['titulo'][:70]}")
        print(f"      Categoria: {cat['name']} | Motivo: {sel.get('motivo_escolha', '')}")

        try:
            print(f"      Gerando artigo com Claude...")
            article = generate_article(noticia, cat)
            post_id = save_draft(article, cat["id"])
            print(f"      Rascunho salvo! Título: {article['title'][:60]}")
            print(f"      Slug: {article['slug']} | ID: {post_id}")
        except json.JSONDecodeError as exc:
            print(f"      [ERRO] Claude retornou JSON inválido: {exc}", file=sys.stderr)
        except Exception as exc:
            print(f"      [ERRO] Falha ao gerar/salvar artigo: {exc}", file=sys.stderr)

        if i < 2:
            time.sleep(3)

    print("\n[OK] Agente concluído. Verifique os rascunhos no painel admin.")


if __name__ == "__main__":
    main()
