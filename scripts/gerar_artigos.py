#!/usr/bin/env python3
"""
Monte das Oliveiras — Gerador automático de artigos
Groq Llama 3.3 70B + Imagen 3 (infográfico) + Pexels (fallback) + Supabase
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
from groq import Groq
from google import genai as google_genai
from google.genai import types as google_types
from cerebras.cloud.sdk import Cerebras

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
        "instrucoes_especificas": (
            "FOCO OBRIGATÓRIO: o artigo deve partir da NOTÍCIA RECENTE fornecida (guerra, desastre natural, "
            "crise geopolítica ou evento mundial) e conectá-la diretamente a profecias bíblicas do fim dos tempos. "
            "Mencione o evento específico no título e na introdução. Cite pelo menos 2 profecias bíblicas "
            "(Mateus 24, Apocalipse, Daniel, etc.) que se relacionam com o evento atual. "
            "O leitor deve sair com a sensação de que os sinais do fim dos tempos estão se cumprindo."
        ),
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
        "instrucoes_especificas": (
            "FOCO OBRIGATÓRIO: o artigo deve ter como centro UM PERSONAGEM BÍBLICO específico "
            "(ex: Davi, Paulo, Ester, José, Rute, Moisés, Pedro, Maria Madalena). "
            "Inclua pelo menos 3 passagens bíblicas diretas sobre esse personagem, citadas em blockquote. "
            "Mostre a trajetória humana do personagem (falhas, vitórias, chamado) e extraia lições práticas "
            "para o crente de hoje. O título deve mencionar o nome do personagem bíblico."
        ),
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
        "instrucoes_especificas": (
            "FOCO OBRIGATÓRIO: relatar com detalhes a situação de cristãos perseguidos no país ou região "
            "mencionada na notícia. Inclua dados concretos (números, países, situação legal). "
            "Termine sempre com um chamado à oração e intercessão pelos irmãos perseguidos. "
            "O tom deve comover sem sensacionalismo."
        ),
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
        "instrucoes_especificas": (
            "FOCO OBRIGATÓRIO: conectar o tema à vida prática do crente brasileiro. "
            "Use exemplos do cotidiano (família, trabalho, relacionamentos) e mostre como a Bíblia "
            "oferece respostas concretas. Tom acolhedor, nunca julgador."
        ),
    },
    "crente-pode": {
        "feeds": [
            "https://gospelprime.com.br/feed/",
            "https://noticiasgospel.com.br/feed/",
            "https://jornalcristao.com.br/feed/",
        ],
        "filtros": [
            "crente pode", "cristão pode", "bíblia responde", "comportamento cristão",
            "dúvidas bíblicas", "vida cristã", "pecado", "santidade", "mundo", "cultura",
        ],
        "estilo": "didático e direto, respondendo dúvidas práticas do crente com base bíblica sólida",
        "palavra_chave_base": "crente pode",
        "instrucoes_especificas": (
            "FORMATO DE TÍTULO OBRIGATÓRIO: o campo 'title' DEVE começar com 'Crente pode' seguido de "
            "uma pergunta prática da vida cristã com ponto de interrogação. "
            "Exemplos válidos: 'Crente pode brigar?', 'Crente pode assistir filmes de terror?', "
            "'Crente pode namorar não crente?', 'Crente pode beber vinho?', 'Crente pode tatuar?'. "
            "O artigo responde à pergunta de forma direta, com base bíblica clara, sem rodeios. "
            "Apresente primeiro o que a Bíblia diz, depois as diferentes visões dentro do evangelicalismo, "
            "e conclua com uma orientação prática e pastoral."
        ),
    },
    "devocional-diario": {
        "feeds": [
            "https://gospelprime.com.br/feed/",
            "https://noticiasgospel.com.br/feed/",
            "https://jornalcristao.com.br/feed/",
        ],
        "filtros": [
            "devocional", "meditação", "oração", "versículo do dia", "palavra",
            "fé", "esperança", "graça", "presença de Deus", "promessa bíblica",
        ],
        "estilo": "meditativo e edificante, como um devocional matinal que inspira e fortalece a fé",
        "palavra_chave_base": "devocional diário",
        "instrucoes_especificas": (
            "FOCO OBRIGATÓRIO: o artigo deve transmitir uma MENSAGEM DE ESPERANÇA EM MEIO À DOR. "
            "Tom obrigatoriamente inspirador, acolhedor e encorajador — nunca pesado ou condenatório. "
            "Ideal para ser lido nas primeiras horas da manhã. "
            "Escolha UMA promessa bíblica central e desenvolva todo o devocional a partir dela. "
            "Mostre que Deus está presente mesmo nos momentos mais difíceis. "
            "Termine SEMPRE com uma oração curta e poderosa (3 a 5 linhas) que o leitor possa repetir. "
            "O título deve ser poético e inspirador, não uma pergunta."
        ),
    },
    "lideranca-e-igreja": {
        "feeds": [
            "https://gospelprime.com.br/feed/",
            "https://jornalcristao.com.br/feed/",
            "https://noticiasgospel.com.br/feed/",
        ],
        "filtros": [
            "liderança", "pastor", "pregação", "igreja", "ministério", "discipulado",
            "gestão eclesiástica", "plantação de igrejas", "teologia pastoral", "serviço",
        ],
        "estilo": "formativo e prático, voltado para líderes e pastores que buscam aprofundamento ministerial",
        "palavra_chave_base": "liderança cristã",
        "instrucoes_especificas": (
            "FOCO OBRIGATÓRIO: o artigo deve apresentar LIÇÕES DE VIDA práticas extraídas da Bíblia "
            "para líderes, pastores e servos de Deus. "
            "Use exemplos de líderes bíblicos (Moisés, Neemias, Paulo, Josué, etc.) para ilustrar os princípios. "
            "Mostre COMO a Bíblia guia nas decisões difíceis de liderança, nos conflitos, no esgotamento ministerial "
            "e no crescimento espiritual do líder. "
            "Cada H2 deve apresentar uma lição clara e aplicável. "
            "Termine com um encorajamento direto ao líder cristão."
        ),
    },
    "noticias-gospel": {
        "feeds": [
            "https://gospelprime.com.br/feed/",
            "https://noticiasgospel.com.br/feed/",
            "https://jornalcristao.com.br/feed/",
            "https://g1.globo.com/rss/g1/",
        ],
        "filtros": [
            "evangélico", "gospel", "cristão", "missões", "movimento cristão",
            "renovação", "avivamento", "igrejas", "ministério", "notícias religiosas",
        ],
        "estilo": "jornalístico e informativo, analisando notícias do mundo evangélico com perspectiva bíblica",
        "palavra_chave_base": "notícias gospel",
        "instrucoes_especificas": (
            "FOCO OBRIGATÓRIO: reportar e analisar a NOTÍCIA RECENTE do mundo gospel fornecida. "
            "Tom jornalístico: quem, o quê, quando, onde, por quê. "
            "Após apresentar os fatos, adicione uma reflexão bíblica sobre o impacto ou o significado "
            "espiritual do evento para a comunidade evangélica brasileira. "
            "O título deve ser noticioso e direto, como manchete de jornal cristão."
        ),
    },
}

CATEGORY_SLUG = os.environ.get("CATEGORY_SLUG", "fim-dos-tempos")
config = CATEGORY_CONFIG.get(CATEGORY_SLUG, CATEGORY_CONFIG["fim-dos-tempos"])

# ── Clientes ──────────────────────────────────────────────────────────────────

supabase = create_client(
    os.environ["PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_KEY"],
)

groq = Groq(api_key=os.environ["GROQ_API_KEY"])

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

def _download_pexels_image(query: str, storage_path: str) -> str | None:
    """Baixa uma foto do Pexels e faz upload para o Storage. Retorna URL pública."""
    try:
        resp = requests.get(
            "https://api.pexels.com/v1/search",
            headers={"Authorization": PEXELS_KEY},
            params={"query": query, "per_page": 3, "orientation": "landscape", "size": "large"},
            timeout=15,
        )
        photos = resp.json().get("photos", [])
        if not photos:
            return None
        img_bytes = requests.get(photos[0]["src"]["large2x"], timeout=30).content
        supabase.storage.from_("media").upload(
            storage_path, img_bytes,
            {"content-type": "image/jpeg", "upsert": "true"},
        )
        return supabase.storage.from_("media").get_public_url(storage_path)
    except Exception as e:
        print(f"[AVISO] Pexels fallback: {e}", file=sys.stderr)
        return None


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

    resp = groq.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
        max_tokens=512,
        temperature=0.3,
    )
    return json.loads(resp.choices[0].message.content)


# ── Gemini: gerar artigo completo (~2800 palavras) ────────────────────────────

GEM_PROMPT = """Você é um redator especializado em conteúdo cristão evangélico para montedasoliveiras.com.
Escreva um artigo COMPLETO, ORIGINAL e PROFUNDO com as especificações abaixo.

TEMA DA NOTÍCIA: {tema}
ESTILO DA CATEGORIA: {estilo}
PALAVRA-CHAVE PRINCIPAL: "{palavra_chave}"

INSTRUÇÕES ESPECÍFICAS DESTA CATEGORIA (PRIORIDADE MÁXIMA — siga à risca):
{instrucoes_especificas}

LINKS INTERNOS (inclua 2 com chamadas criativas no corpo do texto):
{links_internos}

REGRAS OBRIGATÓRIAS:
- Mínimo de 1.300 palavras de conteúdo real (não conte tags HTML)
- Tom conversacional, pastoral e informativo — jamais frio ou acadêmico
- A palavra-chave deve aparecer nos primeiros 2 parágrafos e em pelo menos 1 título H2 ou H3
- Densidade da palavra-chave: ~1% (mínimo de 10 ocorrências naturais, nunca forçadas)
- Além da palavra-chave principal, use variações semânticas e termos relacionados
- Parágrafos de 80 a 150 palavras — bem desenvolvidos, ricos em detalhes, nunca rasos
- No mínimo 4 títulos H2 informativos e descritivos (SEM numeração nos títulos)
- No mínimo 3 referências bíblicas com versículo completo em blockquote
- Pelo menos 1 lista <ul> com dados, passos ou comparações relevantes
- Conecte o tema com a realidade espiritual do crente brasileiro
- Inclua links internos com chamadas criativas para os artigos listados acima
- Termine com 2 perguntas que incentivem comentários dos leitores
- Seção de FAQ ao final com 4 perguntas e respostas detalhadas

ESTRUTURA DO ARTIGO:
1. Introdução impactante — contextualiza e apresenta a palavra-chave
2. Desenvolvimento — mínimo 3 seções H2 com análise bíblica
3. Aplicação prática para o crente brasileiro
4. Links internos com chamadas criativas
5. Conclusão com oração ou chamada à ação
6. Perguntas para comentários
7. FAQ (H2 "Perguntas Frequentes" + H3 por pergunta)

FORMATO HTML (use APENAS estas tags):
<p>, <h2>, <h3>, <blockquote>, <ul>, <ol>, <li>, <strong>, <em>, <a href="URL">texto</a>
NÃO use: <h1>, <div>, <section>, <html>, <body>, <br>

TÍTULO — REGRAS DE OURO (leia com atenção):
O título é o elemento mais importante. Ele precisa parar o leitor no meio do scroll.
Use UM dos estilos abaixo (escolha o que melhor se encaixa no tema):
  • POLÊMICO/CONTROVERSO: "A Verdade que Ninguém Quer Ouvir Sobre [tema]"
  • REVELAÇÃO: "O Que a Bíblia Realmente Diz Sobre [tema] (e a maioria ignora)"
  • URGÊNCIA: "[Evento atual] Confirma o Que a Bíblia Já Avisou Há Séculos"
  • NÚMERO + PROMESSA: "7 Sinais de Que [tema] Está Mais Perto do Que Você Pensa"
  • DESAFIO: "Você Está Pronto Para o Que Está por Vir? A Bíblia Responde"
  • EMOÇÃO: "Por Que Deus Permite a Dor? A Resposta Que Vai Mudar Sua Perspectiva"
  • CURIOSIDADE: "O Segredo Escondido em [passagem/personagem] Que Vai Te Surpreender"
Evite títulos genéricos, neutros ou acadêmicos. O título deve gerar curiosidade ou leve polêmica.
(Para a categoria crente-pode, mantenha o formato "Crente pode [pergunta]?" — escolha um tema polêmico.)

RETORNE APENAS JSON VÁLIDO com esta estrutura:
{{
  "title": "Título criativo, impactante ou polêmico (até 80 chars)",
  "seo_title": "Título SEO 50-60 chars exatos com a palavra-chave",
  "slug": "slug-sem-acento-3-a-6-palavras",
  "excerpt": "Resumo do valor do artigo em até 200 chars",
  "meta_description": "Meta description 130-155 chars, verbo de ação, convida ao clique",
  "read_time_minutes": 7,
  "tags": "tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8",
  "pexels_query": "3 to 5 english words for cover photo search on Pexels",
  "infographic": {{
    "titulo": "Título do infográfico (até 50 chars)",
    "subtitulo": "Subtítulo explicativo (até 70 chars)",
    "pontos": [
      {{"icone": "📖", "texto": "Ponto chave 1 (até 55 chars)"}},
      {{"icone": "✝️", "texto": "Ponto chave 2 (até 55 chars)"}},
      {{"icone": "🕊️", "texto": "Ponto chave 3 (até 55 chars)"}},
      {{"icone": "⚡", "texto": "Ponto chave 4 (até 55 chars)"}},
      {{"icone": "🙏", "texto": "Ponto chave 5 (até 55 chars)"}},
      {{"icone": "🔥", "texto": "Ponto chave 6 (até 55 chars)"}}
    ],
    "versiculo": "Versículo bíblico mais relevante para o tema (até 120 chars) — Referência Bíblica"
  }},
ATENÇÃO — campo "icone": use SEMPRE o caractere emoji literal (ex: 📖 ✝️ 🕊️ 🙏 🔥 ⚡ 💡 🌿 🛡️ 🎯 ❤️ 🌟).
NUNCA use sequências de escape unicode — isso gera JSON inválido.
  "faq_schema": {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {{"@type": "Question", "name": "Pergunta?", "acceptedAnswer": {{"@type": "Answer", "text": "Resposta com mínimo 3 frases."}}}}
    ]
  }},
  "content": "<p>Conteúdo HTML completo com no mínimo 1.300 palavras...</p>"
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
        instrucoes_especificas=config.get("instrucoes_especificas", "Siga as regras gerais abaixo."),
        links_internos=links_str,
    )

    # Modelos Groq em ordem de preferência — tenta o próximo se atingir rate limit ou modelo inválido
    GROQ_MODELS = [
        "llama-3.3-70b-versatile",
        "llama-3.1-70b-versatile",
        "llama-3.1-8b-instant",
    ]
    raw = None
    for model in GROQ_MODELS:
        try:
            print(f"      → Modelo: {model} (Groq)")
            resp = groq.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                max_tokens=8192,
                temperature=0.8,
            )
            raw = resp.choices[0].message.content
            break
        except Exception as e:
            err = str(e).lower()
            if "rate_limit" in err or "429" in err or "decommissioned" in err or "400" in err:
                print(f"      ⚠ {model} indisponível, tentando próximo...", file=sys.stderr)
                continue
            raise

    # Fallback: Cerebras llama-3.3-70b (gratuito, sem restrição regional, cota separada)
    if raw is None:
        cerebras_key = os.environ.get("CEREBRAS_API_KEY", "")
        if cerebras_key:
            try:
                print("      → Modelo: llama-3.3-70b (Cerebras — fallback)")
                cerebras_client = Cerebras(api_key=cerebras_key)
                cb_resp = cerebras_client.chat.completions.create(
                    model="llama3.3-70b",
                    messages=[{"role": "user", "content": prompt}],
                    response_format={"type": "json_object"},
                    max_tokens=8192,
                    temperature=0.8,
                )
                raw = cb_resp.choices[0].message.content
            except Exception as e:
                print(f"      ⚠ Cerebras falhou: {e}", file=sys.stderr)

    if raw is None:
        raise RuntimeError("Todos os modelos atingiram o rate limit. Tente novamente mais tarde.")
    # Converte escapes JS \u{XXXXX} (inválidos em JSON) para caracteres reais
    raw = re.sub(r'\\u\{([0-9a-fA-F]+)\}', lambda m: chr(int(m.group(1), 16)), raw)
    data = json.loads(raw)

    # Gera infográfico com Imagen 3 (fallback: Pexels com query do infográfico)
    if "infographic" in data:
        slug = data.get("slug", "post")
        titulo_infog = data["infographic"].get("titulo", data["title"])

        infog_url = generate_imagen_infographic(data["infographic"], data["title"], slug)

        if not infog_url and PEXELS_KEY:
            pexels_q = data["infographic"].get("pontos", [{}])[0].get("texto", data.get("pexels_query", "christian faith"))
            pexels_q = pexels_q[:60]
            infog_url = _download_pexels_image(pexels_q, f"{slug}/infografico-pexels.jpg")

        if infog_url:
            infog_html = (
                f'<figure style="margin:32px 0;text-align:center">'
                f'<img src="{infog_url}" alt="Infográfico: {titulo_infog}" '
                f'style="max-width:100%;border-radius:8px" loading="lazy"/>'
                f'<figcaption style="font-size:12px;color:#8A8367;margin-top:8px">'
                f'Infográfico: {titulo_infog}'
                f'</figcaption></figure>'
            )
            first_p_end = data["content"].find("</p>")
            if first_p_end != -1:
                pos = first_p_end + 4
                data["content"] = data["content"][:pos] + "\n" + infog_html + data["content"][pos:]
            else:
                data["content"] = infog_html + data["content"]

    # Embute FAQ JSON-LD no final do conteúdo
    if "faq_schema" in data:
        faq_json = json.dumps(data["faq_schema"], ensure_ascii=False)
        data["content"] += f'\n<script type="application/ld+json">{faq_json}</script>'

    return data


# ── Infográfico via Imagen 3 (com fallback para Pexels) ──────────────────────

def generate_imagen_infographic(infographic: dict, article_title: str, slug: str) -> str | None:
    gemini_key = os.environ.get("GEMINI_API_KEY", "")
    if not gemini_key:
        return None
    try:
        pontos_str = " | ".join(p.get("texto", "") for p in infographic.get("pontos", [])[:6])
        versiculo  = infographic.get("versiculo", "")
        titulo     = infographic.get("titulo", article_title)

        imagen_prompt = (
            f"Professional Christian editorial infographic about '{titulo}'. "
            f"Dark navy blue background (#1a2035), gold accents (#B07A29), elegant serif typography. "
            f"Key points displayed as icon cards: {pontos_str}. "
            f"Bible verse at the bottom: '{versiculo}'. "
            f"Clean modern layout, 16:9 widescreen, high resolution, no watermark, "
            f"subtle cross or dove symbol as decorative element, "
            f"label 'montedasoliveiras.com' in small text at bottom right. "
            f"Style: premium magazine infographic, professional journalism."
        )

        client = google_genai.Client(api_key=gemini_key)
        response = client.models.generate_images(
            model="imagen-3.0-generate-002",
            prompt=imagen_prompt,
            config=google_types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio="16:9",
                output_mime_type="image/jpeg",
            ),
        )
        image_bytes = response.generated_images[0].image.image_bytes

        path = f"{slug}/infografico-ia.jpg"
        supabase.storage.from_("media").upload(
            path,
            image_bytes,
            {"content-type": "image/jpeg", "upsert": "true"},
        )
        url = supabase.storage.from_("media").get_public_url(path)
        print(f"      ✓ Infográfico gerado com Imagen 3")
        return url

    except Exception as e:
        print(f"[AVISO] Imagen 3 falhou ({e}), tentando Pexels...", file=sys.stderr)
        return None


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
    print(f"Monte das Oliveiras — Gerador de Artigos (Groq + Pexels)")
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
