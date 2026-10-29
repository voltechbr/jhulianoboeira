# Jhuliano Boeira — Site (Etapa 8)
Site estático (HTML/CSS/JS). Sem build.

## Etapa 2
Seções de conteúdo: apresentação, estratégia de tráfego pago, metodologia (6 etapas), indicadores (CTR, CPC, CPM, CPL, CPA, ROAS), segmentos e diferenciais. Foto circular corrigida (recorte 1:1, `aspect-ratio` + `object-fit`). Sem resultados ou números inventados.

## Etapa 3
- **Tela de carregamento**: logo J.B. centralizada + barra animada. Dura ~1,9 s desde a abertura (ou até a página terminar de carregar, o que ocorrer depois) e sai com fade suave; limite de segurança de ~3,2 s (`MIN`/`MAX` em `assets/js/main.js`). Sem JavaScript ela nunca aparece.
- **Contatos**: WhatsApp (+55 41 9615-2486) e Instagram (@jhulianoboeira) no hero (mobile), na seção Contato, no rodapé e botão flutuante de WhatsApp (some na seção de contato/rodapé).
- **Mobile compacto**: seções com menos espaçamento, cards de *Como posso ajudar*, *Indicadores* e *Diferenciais* em carrossel com indicadores, metodologia em linha do tempo, segmentos em 2 colunas. Nenhum conteúdo foi removido do HTML; apenas pilares do hero e o parágrafo de introdução de *Diferenciais* ficam ocultos no celular por repetirem outros trechos.
- **Interatividade**: brilho que segue o mouse nos cards, efeito de brilho nos botões, setas animadas, barra de progresso de rolagem, reveal em sequência. Respeita `prefers-reduced-motion`.
- Logo: `assets/img/logo-jb-192/512.(png|webp)`, recortada do arquivo enviado.

## Etapa 4
- Textos enxugados (~30% menos palavras): descrições de cards, etapas, indicadores e segmentos mais curtas; *Diferenciais* passou de 6 para 3 cards e o comparativo de 4 para 3 itens (o restante repetia Metodologia e Hero).
- Espaçamentos das seções e dos cabeçalhos reduzidos (desktop e mobile). No celular, o telefone/e-mail repetido da seção Contato fica oculto (os botões e o WhatsApp flutuante permanecem).

## Etapa 5
- **Cards expansíveis** em *Metodologia* (6 etapas), *Indicadores analisados* (6) e *Segmentos atendidos* (8): título, número/sigla sempre visíveis; descrição (e fórmula, nos indicadores) abre ao clicar/tocar, com animação suave e ícone `+` que vira `−`. Cada card abre e fecha de forma independente; o card inteiro é clicável; funciona por teclado (Tab + Enter/Espaço) com `aria-expanded`/`aria-controls`.
- No celular, *Indicadores* deixou de ser carrossel e virou lista compacta (os 6 indicadores visíveis sem deslizar). *Como posso ajudar* e *Diferenciais* permanecem como estavam.
- Sem JavaScript, todo o conteúdo fica aberto (a classe `acc` no `<html>` é adicionada por `main.js`). Todo o texto continua no HTML. Respeita `prefers-reduced-motion`.
- Código: marcação `.acc` / `.acc__btn` / `.acc__panel` em `index.html`; estilos no fim de `assets/css/style.css`; lógica em `assets/js/main.js` (bloco "cards expansíveis").

## Etapa 6
- **Vídeo de fundo no hero** (somente fundo; textos, botões, tipografia e animações inalterados). `assets/video/hero-1080.mp4` (desktop, 1920×1080, ~2,5 MB) e `hero-mobile.mp4` (celular, recorte central, ~1,1 MB): H.264, 30 fps, sem áudio, `faststart`. `main.js` escolhe o arquivo pela largura da tela. Atributos: `autoplay` via JS, `muted`, `loop`, `playsinline`, sem controles. Enquadramento: `object-fit:cover` + `object-position` (`.hero__video` no fim do `style.css`). Camada `.hero__shade` (degradê escuro) garante a leitura do texto.
- **Fallback:** a foto original continua no hero (`.hero__photo`) e só some em fade quando o vídeo realmente começa a tocar (classe `has-video` no hero). Se o vídeo falhar, for bloqueado, ou houver movimento reduzido/economia de dados, o hero fica exatamente como antes (foto à direita).
- Para trocar o vídeo, substitua os dois `.mp4` mantendo os nomes.

## Etapa 7 — vídeo do hero (profissional e responsivo)
- **Altura:** desktop `min-height: clamp(620px, 88svh, 1000px)`; celular/tablet em pé `clamp(560px, 88svh, 900px)` (540–800px até 600px de largura). Notebooks baixos (≤900px de altura) ganham tipografia levemente compacta para o hero não passar da tela.
- **Enquadramento:** desktop inalterado (`object-fit:cover; object-position:50% 40%`). Retrato (celular/tablet em pé): vídeo 1:1 na metade superior (62%/58%), esmaecendo para o fundo, texto ancorado na base com degradê de leitura. Celular deitado: usa o vídeo 16:9, texto compacto à esquerda.
- **Arquivos:** `hero-1080.mp4` (16:9, ~3,2 MB) e `hero-mobile.mp4` (1:1, 810×810, ~1,2 MB). `main.js` escolhe pelo formato da tela (e troca ao girar o aparelho).
- **Loop contínuo:** o fim do vídeo faz dissolvência (0,8 s) para o início, então o reinício não tem corte, piscada ou tela preta. Duração 8,3 s.
- **Carregamento:** `preload="none"`; o vídeo só começa a baixar depois do `load` da página. Pausa fora da tela e com a aba em segundo plano. Primeiro toque no celular tenta retomar caso o autoplay seja bloqueado.
- **Fallback:** `assets/img/hero-poster(.sm).webp/.jpg` = 1º quadro do vídeo, como fundo do hero; o vídeo entra em fade quando realmente toca. Sem vídeo (erro, economia de dados, `prefers-reduced-motion`) o poster permanece.
- **Fotos:** a 2ª foto (camisa escura) foi removida do hero e da seção Apresentação; permanece só o retrato circular de camisa branca.
- Para trocar o vídeo: gere os dois arquivos com o mesmo nome e refaça os posters (1º quadro).

## Executar
`python3 -m http.server 8080` (ou `npm start`) e abra http://localhost:8080

## Estrutura
- `index.html`, `assets/css/style.css`, `assets/js/main.js`
- `assets/brand/` logo J.B. (símbolo amarelo/branco/preto, tile, assinaturas) e `favicon.svg`
- `favicon.ico`, `favicon-*.png`, `apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest`
- `assets/img/` fotos otimizadas (webp + fallback)
- `tools/build_brand.py` regenera logos e fotos; `tools/render_icons.py` regenera favicons (playwright)

## WhatsApp
Link: `https://wa.me/554196152486`. O número informado (55 41 9615-2486) tem 8 dígitos após o DDD; celulares no Brasil costumam ter 9 (9 9615-2486). Confirme antes de publicar e, se necessário, troque em `index.html` (2 ocorrências de `wa.me`).

## Etapa 8 — fundo limpo no celular
O vídeo original mostra, no meio da gravação, a tela da câmera (textos, ícones, "NO CARD", "XAVC S 4K"…). Só dois trechos são limpos (início 0–0,9 s e final 7,6–9 s, este com ~1,4 s), curtos demais para um loop natural. Por isso:
- **Celular (≤860px), tablet em pé e celular deitado de pouca altura:** não carrega vídeo. O hero usa um fundo estático limpo (quadro de ~8,9 s, fundo cinza liso, sem elementos gráficos), com zoom muito lento e contínuo (CSS `hero-zoom`, 28 s, vai e volta, sem cortes). Imagens: `assets/img/hero-mobile.(webp|jpg)` (quadrada) e `hero-mobile-wide.(webp|jpg)` (celular deitado). Respeita `prefers-reduced-motion` (sem animação). Economiza ~1 MB de dados.
- **Desktop e tablet deitado:** vídeo em loop como antes (`hero-1080.mp4`, dissolvência no fim do loop). Enquadramento inalterado.
- A foto é ajustada pela largura e subida (`background-position`) para o texto ficar abaixo do queixo; em celulares de pouca altura (≤780px) os espaçamentos do hero ficam um pouco mais compactos.
- Para usar um vídeo limpo também no celular, basta gravar/enviar um trecho sem a tela da câmera e reativar `data-src-sm` em `main.js`.

## Etapa 9 — loop e hero mobile
- **Loop (desktop):** `hero-1080.mp4` (8,3 s) toca inteiro e só volta ao início no fim, pelo `loop` nativo. Não há `timeupdate`, temporizador, `currentTime` nem `playbackRate` em `main.js`. Os últimos ~0,9 s do arquivo já trazem uma dissolvência embutida para o 1º quadro (feita na Etapa 7). Desktop não foi alterado.
- **Mobile — limite do arquivo:** a tela da câmera (letras "NO CARD", "XAVC S 4K", ícones) aparece em ~0,4–6,4 s do vídeo, ocupando o quadro todo ou boa parte dele; reenquadrar não tira isso. Só há ~1 s limpo e sem sobreposição (6,5–7,4 s); com a dissolvência embutida, ~1,6 s. Isso viraria exatamente o "trecho minúsculo repetindo". Por isso o celular continua com o fundo limpo (quadro sem letras + zoom lento), sem vídeo.
- **Altura do hero mobile:** `clamp(600px, 98svh, 880px)` (era 88svh), imagem ocupa até 108vw de altura.
- **Pronto para vídeo limpo:** há um `<video id="heroVideoM">` só para celular. Basta colocar um arquivo (sem a tela da câmera) em `assets/video/hero-mobile.mp4` e adicionar `data-src-sm="assets/video/hero-mobile.mp4"` nesse elemento: ele toca inteiro com loop nativo. Recomendado ≥ 6 s, 1:1 ou 4:5.
- `extras/` guarda um teste de 1,6 s com os trechos limpos (não usado no site).

## Etapa 10 — vídeo mobile de verdade
- **Causa:** desde a Etapa 8 o celular não carregava vídeo (o JS removia o `src` e o CSS escondia o `<video>`); o que aparecia era uma imagem estática com zoom CSS.
- **Correção:** `assets/video/hero-mobile.mp4` (608×1080, 9:16, H.264 Main L4.0, yuv420p, 30 fps, sem áudio, `faststart`, ~1,2 MB, 8,3 s completos) é um recorte vertical do mesmo vídeo, com pan suave acompanhando o Jhuliano; o último quadro volta à posição do primeiro. `<video id="heroVideoM" autoplay muted loop playsinline>` em tela cheia (`object-fit:cover; object-position:50% 22%`).
- **Seleção:** celular/tablet em pé → `hero-mobile.mp4`; desktop e celular deitado → `hero-1080.mp4` (inalterado). A troca ocorre também ao girar o aparelho.
- **Loop:** nativo; sem `timeupdate`, temporizador, `currentTime` ou `playbackRate`.
- **Autoplay:** atributos `muted playsinline autoplay` + `play()` via JS após o `load`; se o navegador bloquear (ex.: economia de bateria no iOS), o 1º toque/rolagem inicia. Poster = 1º quadro (`hero-mobile-poster.webp/.jpg`); com movimento reduzido ou economia de dados fica só o poster.
- **Hero limpo no celular:** emblema JB gigante, grade de pontos e linha de redes ficam ocultos (CSS, só mobile). Altura `clamp(600px, 98svh, 880px)`.
- Para refazer o vídeo mobile, substitua `hero-mobile.mp4` (mantenha o nome) e o poster.

## Etapa 11 — mais espaço para o Jhuliano no celular
- Hero mobile: `clamp(680px, 108svh, 960px)` (era 98svh). Bloco de texto um pouco mais compacto (descrição .93rem). Em celulares muito baixos (≤700px de altura) a descrição curta é ocultada para o rosto continuar visível; título e botões ficam.
- Vídeo (e poster) mobile: altura 115% e `top:-15%` — sobem para o Jhuliano ficar acima do bloco de texto. Desktop e celular deitado não mudam.

## Etapa 12 — composição mobile em duas áreas
Celular em pé (≤600px): o hero deixou de ter texto sobre o vídeo. Em cima, a área do vídeo (`--vbox: min(128vw, 64svh)`, `object-position:50% 0`, esmaece para o fundo na base); embaixo, eyebrow, título, descrição e botões sobre fundo liso. Rosto e corpo ficam livres de texto. Desktop, celular deitado e tablet não mudaram. Descrição curta oculta só em celulares ≤700px de altura.
