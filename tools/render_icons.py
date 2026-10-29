"""Gera favicon.ico, apple-touch-icon e ícones PWA a partir de assets/brand/favicon.svg (requer playwright)."""
import io
from playwright.sync_api import sync_playwright
from PIL import Image
svg=open("assets/brand/favicon.svg").read()
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":512,"height":512})
    def png(s):
        pg.set_viewport_size({"width":s,"height":s});pg.set_content(f'<body style="margin:0;background:transparent"><div style="width:{s}px;height:{s}px">{svg.replace("<svg ",f"<svg width=\"{s}\" height=\"{s}\" ",1)}</div>')
        return pg.screenshot(omit_background=True)
    for n,s in (("favicon-16.png",16),("favicon-32.png",32),("favicon-48.png",48),("apple-touch-icon.png",180),("icon-192.png",192),("icon-512.png",512)):
        open(n,"wb").write(png(s))
    b.close()
Image.open("favicon-48.png").save("favicon.ico",sizes=[(16,16),(32,32),(48,48)])
