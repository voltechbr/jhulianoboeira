"""Gera as variações da logo J.B. (SVG) e otimiza as fotos. Uso: python3 tools/build_brand.py"""
import glob
from PIL import Image
Y,K,W="#FFD400","#0A0A0A","#FFFFFF"
# Símbolo J.B.: haste compartilhada (o J desce e curva à esquerda; o B nasce da mesma haste). viewBox 0 0 114 112
J="M40 30 L52 18 H56 V94 H26 Q10 94 10 78 V68 H26 V74 Q26 78 30 78 H40 Z"
B=("M55.5 18 H82 Q98 18 98 34 V42 Q98 50 92 54 Q104 58 104 72 V80 Q104 94 88 94 H55.5 Z "
   "M56 30 H80 Q84 30 84 34 V42 Q84 46 80 46 H56 Z M56 62 H84 Q90 62 90 68 V76 Q90 82 84 82 H56 Z")
def sym(fill): return f'<path fill="{fill}" d="{J}"/><path fill="{fill}" fill-rule="evenodd" d="{B}"/>'
def svg(vb,body,title="Jhuliano Boeira — J.B."): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img"><title>{title}</title>{body}</svg>\n'
o="assets/brand/"
def w(n,s): open(o+n,"w").write(s)
for n,c in (("yellow",Y),("white",W),("black",K)): w(f"logo-symbol-{n}.svg",svg("0 0 114 112",sym(c)))
w("logo-tile.svg",svg("0 0 128 128",f'<rect width="128" height="128" rx="26" fill="{K}"/><g transform="translate(12.7 13.6) scale(.9)">{sym(Y)}</g>'))
# favicon simplificado: sem contraformas; uma fenda separa os bolsões do B
FB="M55.5 18 H82 Q98 18 98 34 Q98 48 90 52 H55.5 Z M55.5 58 H90 Q104 62 104 76 Q104 94 88 94 H55.5 Z"
w("favicon.svg",svg("0 0 128 128",f'<rect width="128" height="128" rx="26" fill="{K}"/><g transform="translate(4.2 5.2) scale(1.05)"><path fill="{Y}" d="{J}"/><path fill="{Y}" d="{FB}"/></g>',"J.B."))
# assinatura com texto convertido em curvas (independe de fontes instaladas)
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
fp=(glob.glob("/usr/share/fonts/**/LiberationSans-Bold.ttf",recursive=True) or glob.glob("/usr/share/fonts/**/DejaVuSans-Bold.ttf",recursive=True))[0]
f=TTFont(fp);gs=f.getGlyphSet();cm=f.getBestCmap();upm=f["head"].unitsPerEm
def text(t,x,y,size,track):
    s=size/upm;d="";cx=x
    for ch in t:
        g=cm[ord(ch)];p=SVGPathPen(gs);gs[g].draw(TransformPen(p,(s,0,0,-s,cx,y)));d+=p.getCommands()
        cx+=gs[g].width*s+track
    return d,cx-track
def sig(symc,namec,subc,fn):
    n,wd=text("JHULIANO BOEIRA",142,62,30,5.2);s,_=text("TRÁFEGO PAGO  |  META ADS",143,92,13.5,3.6)
    w(fn,svg(f"0 0 {wd+4:.0f} 112",f'{sym(symc)}<path fill="{namec}" d="{n}"/><path fill="{subc}" d="{s}"/>'))
sig(Y,W,"#A3A3A3","signature-on-dark.svg");sig(W,W,W,"signature-white.svg");sig(K,K,K,"signature-black.svg")
src="/mnt/user-data/uploads/"
# (a 2ª foto do hero foi removida na Etapa 7; o fundo do hero agora é o vídeo + poster)
a=Image.open(src+"image-removebg-preview__26_.png").convert("RGBA")
a=a.crop((52,23,348,319))  # recorte quadrado 1:1 do círculo (evita foto achatada)
a.save("assets/img/jhuliano-palestra.png",optimize=True);a.save("assets/img/jhuliano-palestra.webp",quality=90)
