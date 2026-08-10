#!/usr/bin/env python3
"""Gera cards 1080x1080 para posts no feed do Facebook e Instagram."""
import os, sys, io, textwrap, argparse, requests
from supabase import create_client

try:
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
except ImportError:
    print("Instale Pillow: pip install Pillow", file=sys.stderr)
    sys.exit(1)

SUPABASE_URL = os.environ["PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_KEY"]
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

CARD_W, CARD_H = 1080, 1080
LOGO_PATH = os.path.join(os.path.dirname(__file__), "../public/apple-touch-icon.png")
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def _get_cover(slug: str) -> Image.Image | None:
    url = supabase.storage.from_("media").get_public_url(f"{slug}/cover.jpg")
    try:
        resp = requests.get(url, timeout=15)
        if resp.status_code == 200:
            return Image.open(io.BytesIO(resp.content)).convert("RGB")
    except Exception:
        pass
    return None


def _crop_center(img: Image.Image, w: int, h: int) -> Image.Image:
    img = img.copy()
    img.thumbnail((max(w, h) * 2, max(w, h) * 2), Image.LANCZOS)
    iw, ih = img.size
    left = (iw - w) // 2
    top = (ih - h) // 2
    return img.crop((left, top, left + w, top + h))


def _load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def make_card(title: str, slug: str) -> bytes | None:
    cover = _get_cover(slug)
    if cover:
        bg = _crop_center(cover, CARD_W, CARD_H)
        bg = bg.filter(ImageFilter.GaussianBlur(radius=4))
    else:
        bg = Image.new("RGB", (CARD_W, CARD_H), (20, 30, 50))

    bg = bg.convert("RGBA")

    # Overlay escuro com gradiente
    overlay = Image.new("RGBA", (CARD_W, CARD_H), (0, 0, 0, 0))
    for y in range(CARD_H):
        alpha = int(120 + (y / CARD_H) * 100)
        for x in range(CARD_W):
            overlay.putpixel((x, y), (0, 0, 0, alpha))
    bg = Image.alpha_composite(bg, overlay)

    draw = ImageDraw.Draw(bg)

    # Logo
    try:
        logo = Image.open(LOGO_PATH).convert("RGBA")
        logo.thumbnail((70, 70), Image.LANCZOS)
        bg.paste(logo, (40, 36), logo)
    except Exception:
        pass

    # Nome do site
    font_site = _load_font(FONT_BOLD, 30)
    draw.text((122, 50), "Monte das Oliveiras", font=font_site, fill=(255, 255, 255, 210))

    # Linha separadora sutil
    draw.line([(40, 126), (CARD_W - 40, 126)], fill=(255, 255, 255, 60), width=1)

    # Título centralizado
    font_title = _load_font(FONT_BOLD, 62)
    max_chars = 28
    lines = textwrap.wrap(title, width=max_chars)
    line_h = 78
    total_h = len(lines) * line_h
    y = (CARD_H - total_h) // 2

    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font_title)
        tw = bbox[2] - bbox[0]
        x = (CARD_W - tw) // 2
        draw.text((x + 2, y + 2), line, font=font_title, fill=(0, 0, 0, 140))
        draw.text((x, y), line, font=font_title, fill=(255, 255, 255, 255))
        y += line_h

    # URL no rodapé
    font_url = _load_font(FONT_REGULAR, 26)
    draw.text((40, CARD_H - 52), "montedasoliveiras.com", font=font_url, fill=(255, 255, 255, 180))

    out = io.BytesIO()
    bg.convert("RGB").save(out, format="JPEG", quality=92)
    return out.getvalue()


def upload_card(slug: str, data: bytes) -> str:
    path = f"{slug}.jpg"
    try:
        supabase.storage.from_("social-cards").remove([path])
    except Exception:
        pass
    supabase.storage.from_("social-cards").upload(
        path, data, {"content-type": "image/jpeg", "upsert": "true"}
    )
    return supabase.storage.from_("social-cards").get_public_url(path)


def process(slug: str, title: str) -> str | None:
    print(f"  Gerando card: {slug}")
    data = make_card(title, slug)
    if not data:
        print(f"  [ERRO] Falha ao gerar card para {slug}", file=sys.stderr)
        return None
    url = upload_card(slug, data)
    print(f"  ✓ {url}")
    return url


def main():
    parser = argparse.ArgumentParser(description="Gera cards para redes sociais")
    parser.add_argument("--slug", help="Slug de um artigo específico")
    parser.add_argument("--title", help="Título (usar junto com --slug)")
    parser.add_argument("--recent", type=int, default=5,
                        help="Quantos artigos recentes processar (padrão: 5)")
    args = parser.parse_args()

    if args.slug and args.title:
        process(args.slug, args.title)
        return

    print(f"Buscando os {args.recent} artigos mais recentes...")
    resp = (supabase.table("posts")
            .select("slug, title")
            .eq("status", "published")
            .eq("language", "pt")
            .order("published_at", desc=True)
            .limit(args.recent)
            .execute())

    posts = resp.data or []
    print(f"  {len(posts)} artigo(s) encontrado(s)")
    for post in posts:
        process(post["slug"], post["title"])


if __name__ == "__main__":
    main()
