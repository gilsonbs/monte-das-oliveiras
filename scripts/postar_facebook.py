#!/usr/bin/env python3
"""
Posta o próximo artigo pendente (facebook_reshared_at IS NULL) no Facebook.
Uso: python scripts/postar_facebook.py
"""
import os
import sys
import requests
from datetime import datetime, timezone
from supabase import create_client

SUPABASE_URL = os.environ["PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_KEY"]
PAGE_ID      = os.environ.get("FACEBOOK_PAGE_ID", "622708424257879")
PAGE_TOKEN   = os.environ["FACEBOOK_PAGE_ACCESS_TOKEN"]
SITE_URL     = "https://montedasoliveiras.com"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


def get_pending_post():
    resp = (
        supabase.table("posts")
        .select("id, slug, title, excerpt")
        .eq("status", "published")
        .eq("language", "pt")
        .is_("facebook_reshared_at", "null")
        .order("published_at", desc=False)   # mais antigo primeiro
        .limit(1)
        .execute()
    )
    print(f"  Artigos pendentes encontrados: {len(resp.data)}")
    return resp.data[0] if resp.data else None


def force_scrape(url: str):
    """Força o Facebook a re-scrape a URL e atualizar o cache do og:image."""
    resp = requests.post(
        "https://graph.facebook.com/",
        params={"id": url, "scrape": "true", "access_token": PAGE_TOKEN},
        timeout=30,
    )
    result = resp.json()
    images = result.get("og_object", {}).get("image", [])
    og_image = images[0].get("url") if images else None
    print(f"  Scrape OK. og:image = {og_image or '(não encontrado)'}")


def post_to_facebook(post: dict) -> bool:
    url     = f"{SITE_URL}/{post['slug']}"
    title   = post["title"]
    excerpt = (post.get("excerpt") or "").strip()
    message = f"{title}\n\n{excerpt}\n\n👉 {url}" if excerpt else f"{title}\n\n👉 {url}"

    print(f"  Forçando scrape da URL...")
    force_scrape(url)

    resp = requests.post(
        f"https://graph.facebook.com/v20.0/{PAGE_ID}/feed",
        data={"message": message, "link": url, "access_token": PAGE_TOKEN},
        timeout=30,
    )
    result = resp.json()
    if "id" in result:
        print(f"✓ Postado! Post ID: {result['id']}")
        return True
    print(f"✗ Erro: {result}", file=sys.stderr)
    return False


def mark_posted(post_id: str):
    supabase.table("posts").update(
        {"facebook_reshared_at": datetime.now(timezone.utc).isoformat()}
    ).eq("id", post_id).execute()
    print("✓ facebook_reshared_at atualizado.")


def main():
    post = get_pending_post()
    if not post:
        print("Nenhum artigo pendente para postar.")
        sys.exit(0)

    print(f"Postando: {post['title']}")
    if post_to_facebook(post):
        mark_posted(post["id"])


if __name__ == "__main__":
    main()
