#!/usr/bin/env python3
"""
Monte das Oliveiras — Gerador automático de artigos
Gemini 2.0 Flash (gratuito) + Pexels API (gratuita) + Supabase
"""

import json
import os
import re
import sys
import time
import requests
from datetime import datetime, timezone, timedelta

import feedparser
from supabase import create_client
from google import genai
from google.genai import types

# ── Configuração por categoria ────────────────────────────────────────────────

CATEGORY_CONFIG = {
    "fim-dos-tempos": {
        "feeds": [
            "https://gospelprime.com.br/feed/",
            "https://noticiasgospel.com.br/feed/",
            "https://jornalcristao.com.br/feed/",
            "https://feeds.bbci.co.uk/portuguese/rss.xml",
        ],
        "filtros": [
            "israel", "profecia", "apocalipse", "fim dos tempos", "arrebatamento",
            "segunda vinda", "anticristo", "escatologia", "guerra", "oriente médio",
        ],
        "estilo": "profético e escatológico, conectando eventos atuais às profecias bíblicas",
        "palavra_chave_base": "fim dos tempos",
    },
    "estudos-biblicos": {
        "feeds": [
            "https://gospelprime.com.br/feed/",
            "https://noticiasgospel.com.br/feed/",
            "https://jornalcristao.com.br/feed/",
        ],
        "filtros": [
            "bíblia", "estudo", "palavra de deus", "versículo", "oração",
            "fé", "graça", "salvação", "discipulado", "teologia", "sermão",
        ],
        "estilo": "didático e aprofundado, como um pastor ensinando a congregação",
        "palavra_chave_base": "estudo bíblico",
    },
    "igreja-perseguida": {
        "feeds": [
            "https://jornalcristao.com.br/feed/",
            "https://gospelprime.com.br/feed/",
            "https://feeds.bbci.co.uk/portuguese/rss.xml",
            "https://g1.globo.com/rss/g1/",
        ],
        "filtros": [
            "perseguição", "cristãos perseguidos", "mártires", "missões",
            "liberdade religiosa", "china", "coreia do norte", "oriente médio",
        ],
        "estilo": "jornalístico e comovente, que mobiliza intercessão e consciência missionária",
        "palavra_chave_base": "perseguição de cristãos",
    },
    "vida-crista": {
        "feeds": [
            "https://gospelprime.com.br/feed/",
            "https://noticiasgospel.com.br/feed/",
        ],
        "filtros": [
            "família", "casamento", "filhos", "relacionamento", "trabalho",
            "ansiedade", "depressão", "cura", "milagre", "testemunho",
        ],
        "estilo": "prático e acolhedor, aplicando a Bíblia ao cotidiano do crente brasileiro",
        "palavra_chave_base": "vida cristã",
    },
}

CATEGORY_SLUG = os.environ.get("CATEGORY_SLUG", "fim-dos-tempos")
config = CATEGORY_CONFIG.get(CATEGORY_SLUG, CATEGORY_CONFIG["fim-dos-tempos"])

# ── Clientes ──────────────────────────────────────────────────────────────────

supabase = create_client(
    os.environ["PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_KEY"],
)

gemini = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

PEXELS_KEY = os.environ.get("PEXELS_API_KEY", "")


# ── RSS: buscar notícias ───────────────────────────────────────────────────────

def fetch_news() -> list[dict]:
    items = []
    for url in config["feeds"]:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:8]:
                title = entry.get("title", "").strip()
                summary = re.sub(r"<[^>]+>", "", entry.get("summary", "")).strip()[:500]
                link = entry.get("link", "")
                if title and link:
                    items.append({"titulo": title, "resumo": summary, "link": link})
        except Exception as e:
            print(f"[AVISO] Feed {url}: {e}", file=sys.stderr)
    print(f"[INFO] {len(items)} notícias coletadas de {len(config['feeds'])} feeds")
    return items


# ── Supabase: dados auxiliares ────────────────────────────────────────────────

def fetch_recent_titles(hours: int = 48) -> list[str]:
    cutoff = (datetime.now(timezone.utc) - timedelta(hours=hours)).isoformat()
    try:
        resp = supabase.table("posts").select("title").gte("created_at", cutoff).execute()
        return [r["title"] for r in (resp.data or [])]
    except Exception as e:
        print(f"[AVISO] Títulos recentes: {e}", file=sys.stderr)
        return []


def fetch_category_id() -> str | None:
    try:
        resp = supabase.table("categories").select("id").eq("slug", CATEGORY_SLUG).execute()
        return resp.data[0]["id"] if resp.data else None
    except Exception as e:
        print(f"[ERRO] Categoria: {e}", file=sys.stderr)
        return None


def fetch_internal_posts(limit: int = 6) -> list[dict]:
    try:
        resp = (
            supabase.table("posts")
            .select("title, slug")
            .eq("status", "published")
            .order("published_at", desc=True)
            .limit(limit)
            .execute()
        )
        return resp.data or []
    except Exception as e:
        print(f"[AVISO] Posts internos: {e}", file=sys.stderr)
        return []


# ── Pexels: imagem de alta qualidade ─────────────────────────────────────────

def fetch_and_save_image(query: str, slug: str) -> str | None:
    if not PEXELS_KEY:
        print("[AVISO] PEXELS_API_KEY não definida, artigo ficará sem capa.", file=sys.stderr)
        return None
    try:
        resp = requests.get(
            "https://api.pexels.com/v1/search",
            headers={"Authorization": PEXELS_KEY},
            params={"query": query, "per_page": 5, "orientation": "landscape", "size": "large"},
            timeout=15,
        )
        photos = resp.json().get("photos", [])
        if not photos:
            print(f"[AVISO] Pexels sem resultados para '{query}'", file=sys.stderr)
            return None

        photo = photos[0]
        src = photo["src"]
        alt = photo.get("alt") or query
        photographer = photo.get("photographer", "Pexels")

        # Download da versão original (máxima qualidade)
        img_bytes = requests.get(src["original"], timeout=30).content

        # Upload para Supabase Storage
        storage_path = f"{slug}/cover.jpg"
        supabase.storage.from_("media").upload(
            storage_path,
            img_bytes,
            {"content-type": "image/jpeg", "upsert": "true"},
        )
        cover_url = supabase.storage.from_("media").get_public_url(storage_path)

        # Salvar registro na tabela media
        media_resp = supabase.table("media").insert({
            "original_url": cover_url,
            "cover_url": cover_url,
            "card_url": src["large2x"],   # 1920px (Pexels CDN)
            "thumb_url": src["large"],    # 940px  (Pexels CDN)
            "share_url": cover_url,
            "alt_text": f"{alt} — Foto: {photographer} / Pexels",
        }).execute()

        media_id = media_resp.data[0]["id"] if media_resp.data else None
        print(f"      Foto: {alt[:60]} | Fotógrafo: {photographer}")
        return media_id

    except Exception as e:
        print(f"[AVISO] Erro no Pexels/Storage: {e}", file=sys.stderr)
        return None


# ── Gemini: selecionar a melhor notícia ──────────────────────────────────────

def select_news(items: list[dict], recent: list[str]) -> dict:
    recent_str = "; ".join(recent[:10]) or "nenhum"
    filtros_str = ", ".join(config["filtros"])

    prompt = f"""Você é editor-chefe do Monte das Oliveiras, portal cristão evangélico brasileiro.
Categoria ativa: "{CATEGORY_SLUG}" | Estilo: {config['estilo']}
Palavras-chave da categoria: {filtros_str}

Selecione A MELHOR notícia das disponíveis para virar artigo com ângulo bíblico.
Evite temas similares aos publicados recentemente: {recent_str}

Notícias:
{json.dumps([{"i": i, "titulo": n["titulo"], "resumo": n["resumo"][:200]} for i, n in enumerate(items)], ensure_ascii=False)}

Retorne JSON: {{"indice": 0, "palavra_chave": "palavra-chave principal para SEO", "motivo": "breve justificativa"}}"""

    resp = gemini.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            max_output_tokens=512,
            temperature=0.3,
        ),
    )
    return json.loads(resp.text)


# ── Gemini: gerar artigo completo (~2800 palavras) ────────────────────────────

GEM_PROMPT = """Você é um redator especializado em conteúdo cristão evangélico para montedasoliveiras.com.
Escreva um artigo COMPLETO, ORIGINAL e PROFUNDO com as especificações abaixo.

TEMA DA NOTÍCIA: {tema}
ESTILO DA CATEGORIA: {estilo}
PALAVRA-CHAVE PRINCIPAL: "{palavra_chave}"

LINKS INTERNOS (inclua 2 com chamadas criativas no corpo do texto):
{links_internos}

REGRAS OBRIGATÓRIAS:
- Mínimo de 2.800 palavras de conteúdo real (não conte tags HTML)
- Tom conversacional, pastoral e informativo — jamais frio ou acadêmico
- A palavra-chave deve aparecer nos primeiros 2 parágrafos e em pelo menos 1 título H2 ou H3
- Densidade da palavra-chave: ~1% (mínimo de 12 ocorrências naturais, nunca forçadas)
- Além da palavra-chave principal, use variações e termos relacionados ao longo do texto
- Parágrafos de 100 a 150 palavras — bem desenvolvidos, nunca rasos
- No mínimo 5 títulos H2 informativos e descritivos (SEM numeração nos títulos)
- No mínimo 4 referências bíblicas com versículo completo em blockquote
- Pelo menos 1 lista <ul> ou tabela comparativa quando relevante
- Conecte o tema com a realidade espiritual do crente brasileiro
- Inclua 2 links internos com chamadas criativas para os artigos listados acima
- Termine com 3 perguntas que incentivem comentários dos leitores
- Seção de FAQ ao final com 5 perguntas e respostas detalhadas

ESTRUTURA DO ARTIGO:
1. Introdução impactante (apresenta o tema + palavra-chave)
2. Desenvolvimento: mínimo 5 seções com H2
3. Referências bíblicas integradas ao texto
4. Lista ou tabela quando aplicável
5. Links internos com chamadas criativas
6. Conclusão com chamada à reflexão ou oração
7. Perguntas para comentários
8. FAQ (H2 "Perguntas Frequentes" + H3 para cada pergunta)

FORMATO HTML (use APENAS estas tags):
<p>, <h2>, <h3>, <blockquote>, <ul>, <ol>, <li>, <strong>, <em>, <a href="URL">texto</a>
NÃO use: <h1>, <div>, <section>, <html>, <body>, <br>

RETORNE APENAS JSON VÁLIDO com esta estrutura:
{{
  "title": "Título editorial chamativo (até 80 chars, pode ter número: '7 sinais que...')",
  "seo_title": "Título SEO 50-60 chars exatos com a palavra-chave",
  "slug": "slug-sem-acento-3-a-6-palavras",
  "excerpt": "Resumo do valor do artigo em até 200 chars",
  "meta_description": "Meta description 130-155 chars, verbo de ação, convida ao clique",
  "read_time_minutes": 14,
  "tags": "tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8",
  "pexels_query": "3 to 5 english words for cover photo search on Pexels",
  "faq_schema": {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {{"@type": "Question", "name": "Pergunta?", "acceptedAnswer": {{"@type": "Answer", "text": "Resposta detalhada."}}}}
    ]
  }},
  "content": "<p>Conteúdo HTML completo com no mínimo 2.800 palavras...</p>"
}}"""


def generate_article(noticia: dict, palavra_chave: str, internal_posts: list[dict]) -> dict:
    links_str = "\n".join(
        f'- "{p["title"]}" → https://montedasoliveiras.com/{p["slug"]}'
        for p in internal_posts
    ) or "Nenhum disponível ainda."

    prompt = GEM_PROMPT.format(
        tema=f"{noticia['titulo']}\n{noticia['resumo'][:400]}\nFonte: {noticia['link']}",
        estilo=config["estilo"],
        palavra_chave=palavra_chave,
        links_internos=links_str,
    )

    resp = gemini.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            max_output_tokens=8192,
            temperature=0.8,
        ),
    )
    data = json.loads(resp.text)

    # Embute FAQ JSON-LD no final do conteúdo (Google lê em qualquer posição da página)
    if "faq_schema" in data:
        faq_json = json.dumps(data["faq_schema"], ensure_ascii=False)
        data["content"] += f'\n<script type="application/ld+json">{faq_json}</script>'

    return data


# ── Salvar rascunho no Supabase ───────────────────────────────────────────────

def save_draft(article: dict, category_id: str, cover_media_id: str | None) -> str:
    payload = {
        "title": article["title"],
        "slug": article["slug"],
        "content": article["content"],
        "excerpt": article.get("excerpt") or None,
        "seo_title": article.get("seo_title") or None,
        "meta_description": article.get("meta_description") or None,
        "read_time_minutes": article.get("read_time_minutes") or None,
        "category_id": category_id,
        "cover_media_id": cover_media_id,
        "status": "draft",
        "is_featured": False,
        "published_at": None,
    }
    resp = supabase.table("posts").insert(payload).execute()
    if resp.data:
        return resp.data[0].get("id", "?")
    raise RuntimeError(f"Falha ao inserir post: {resp}")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print(f"Monte das Oliveiras — Gerador de Artigos (Gemini + Pexels)")
    print(f"Categoria: {CATEGORY_SLUG}")
    print(f"Horário:   {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    print("=" * 60)

    # 1. Categoria
    category_id = fetch_category_id()
    if not category_id:
        print(f"[ERRO] Categoria '{CATEGORY_SLUG}' não encontrada no Supabase.", file=sys.stderr)
        sys.exit(1)

    # 2. Notícias
    items = fetch_news()
    if not items:
        print("[ERRO] Nenhuma notícia coletada.", file=sys.stderr)
        sys.exit(1)

    recent = fetch_recent_titles()
    internal_posts = fetch_internal_posts()

    # 3. Selecionar notícia
    print(f"\n[1/4] Selecionando melhor notícia entre {len(items)} disponíveis...")
    selected = select_news(items, recent)
    noticia = items[selected["indice"]]
    palavra_chave = selected.get("palavra_chave") or config["palavra_chave_base"]
    print(f"      ✓ Notícia: {noticia['titulo'][:70]}")
    print(f"      ✓ Palavra-chave: {palavra_chave}")
    print(f"      ✓ Motivo: {selected.get('motivo', '')[:80]}")

    # 4. Gerar artigo
    print(f"\n[2/4] Gerando artigo com Gemini 2.0 Flash (mín. 2.800 palavras)...")
    article = generate_article(noticia, palavra_chave, internal_posts)
    word_count = len(re.findall(r"\w+", re.sub(r"<[^>]+>", "", article.get("content", ""))))
    print(f"      ✓ Título: {article['title'][:70]}")
    print(f"      ✓ Slug:   {article['slug']}")
    print(f"      ✓ Palavras: ~{word_count} | Leitura: {article.get('read_time_minutes', '?')} min")
    print(f"      ✓ Tags: {article.get('tags', '')[:70]}")

    # 5. Imagem
    pexels_query = article.get("pexels_query") or palavra_chave
    print(f"\n[3/4] Buscando foto no Pexels: '{pexels_query}'...")
    cover_media_id = fetch_and_save_image(pexels_query, article["slug"])
    if not cover_media_id:
        print("      Artigo ficará sem capa — adicione uma manualmente no admin.")

    # 6. Salvar
    print(f"\n[4/4] Salvando rascunho no Supabase...")
    post_id = save_draft(article, category_id, cover_media_id)
    print(f"      ✓ Rascunho salvo! ID: {post_id}")

    print(f"\n{'=' * 60}")
    print(f"✓ Concluído! Revise e publique em:")
    print(f"  https://montedasoliveiras.com/admin/posts/editor?id={post_id}")
    print("=" * 60)


if __name__ == "__main__":
    main()
