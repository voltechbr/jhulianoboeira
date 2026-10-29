(function(){
  var d=document,root=d.documentElement,hd=d.querySelector(".header"),bg=d.getElementById("burger");
  // tela de carregamento: ~2 s contados desde a abertura da página. Sai quando o tempo mínimo passou E a página carregou;
  // nunca passa de MAX (segurança), mesmo que algum recurso demore.
  var ld=d.getElementById("loader"),finished=false,loaded=false,MIN=1900,MAX=3200;
  function setP(v){ld&&ld.style.setProperty("--p",Math.max(.04,Math.min(1,v)).toFixed(3))}
  function done(){
    if(finished)return;finished=true;setP(1);
    root.classList.add("is-leaving");root.classList.remove("is-loading");
    setTimeout(function(){root.classList.remove("is-leaving")},700);
  }
  function ldTick(){
    if(finished)return;var t=performance.now(),k=Math.min(t/MIN,1),p=1-Math.pow(1-k,1.6);
    setP(Math.min(p,loaded?1:.94));
    if((t>=MIN&&loaded)||t>=MAX){done();return}
    setTimeout(ldTick,32);
  }
  function onLoad(){loaded=true}
  if(d.readyState==="complete")loaded=true;else addEventListener("load",onLoad);
  ldTick();
  setTimeout(done,Math.max(0,MAX-performance.now())); // reforço caso a aba esteja em segundo plano
  d.getElementById("year").textContent=new Date().getFullYear();
  var fab=d.getElementById("fab"),hide=0;
  function scrolled(){hd.classList.toggle("is-solid",scrollY>24);
    var mx=root.scrollHeight-innerHeight;hd.style.setProperty("--sp",mx>0?Math.min(1,scrollY/mx).toFixed(3):0);
    if(fab)fab.classList.toggle("is-on",scrollY>420&&!hide)}scrolled();addEventListener("scroll",scrolled,{passive:true});
  function menu(o){hd.classList.toggle("is-open",o);bg.setAttribute("aria-expanded",o);bg.setAttribute("aria-label",o?"Fechar menu":"Abrir menu")}
  bg.addEventListener("click",function(){menu(!hd.classList.contains("is-open"))});
  d.querySelectorAll(".nav a").forEach(function(a){a.addEventListener("click",function(){menu(false)})});
  addEventListener("keydown",function(e){if(e.key==="Escape")menu(false)});
  // revelação suave ao rolar (fallback: tudo visível sem IntersectionObserver ou com movimento reduzido)
  if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion:reduce)").matches){
    root.classList.add("js");
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -8% 0px",threshold:.05});
    d.querySelectorAll(".head,.card,.step,.seg__i,.versus__col,.note,.about,.portrait").forEach(function(el){el.classList.add("reveal");el.style.setProperty("--rd",(Array.prototype.indexOf.call(el.parentNode.children,el)%4)*.08+"s");io.observe(el)});
  }
  if("IntersectionObserver" in window&&fab){
    var vis={},fo=new IntersectionObserver(function(es){es.forEach(function(e){vis[e.target.id||"f"]=e.isIntersecting});
      hide=(vis.contato||vis.f)?1:0;scrolled()});
    var ct=d.getElementById("contato"),ft=d.querySelector(".footer");ct&&fo.observe(ct);if(ft){ft.id=ft.id||"f";fo.observe(ft)}
  }
  // indicadores dos carrosséis no mobile (cards em linha com rolagem horizontal)
  d.querySelectorAll(".grid--3:not(.kpis)").forEach(function(g){
    var n=g.children.length,dots=d.createElement("div"),k=[],cur=-1;dots.className="dots";dots.setAttribute("aria-hidden","true");
    for(var i=0;i<n;i++){(function(i){var b=d.createElement("i");b.addEventListener("click",function(){var c=g.children[i];g.scrollTo({left:c.offsetLeft-g.children[0].offsetLeft,behavior:"smooth"})});dots.appendChild(b);k.push(b)})(i)}
    g.insertAdjacentElement("afterend",dots);
    function upd(){var mx=g.scrollWidth-g.clientWidth,i=mx>0?Math.round(g.scrollLeft/mx*(n-1)):0;if(i!==cur){cur=i;k.forEach(function(b,j){b.classList.toggle("on",j===i)})}}
    upd();g.addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);
  });
  // cards expansíveis (Metodologia, Indicadores, Segmentos): cada card abre e fecha de forma independente
  root.classList.add("acc");
  d.querySelectorAll(".acc__btn").forEach(function(bt){
    var it=bt.closest(".acc");if(!it)return;
    bt.setAttribute("aria-expanded","false");
    bt.addEventListener("click",function(){var o=!it.classList.contains("is-open");it.classList.toggle("is-open",o);bt.setAttribute("aria-expanded",o?"true":"false")});
  });
  // fundo do hero. Desktop e celular deitado: hero-1080.mp4 (16:9). Celular/tablet em pé: hero-mobile.mp4 (recorte vertical 9:16 do
  // mesmo vídeo, 8,3 s completos). Os dois usam loop nativo: tocam do começo ao fim e só então reiniciam (sem timeupdate/temporizador).
  // O poster (1º quadro) fica no fundo como fallback e o vídeo entra em fade quando realmente toca. Sem vídeo: movimento reduzido ou economia de dados.
  // Carga: nada baixa até a página terminar de carregar; pausa fora da tela e com a aba em segundo plano.
  var hv=d.getElementById("heroVideo"),hero=d.getElementById("inicio");
  if(hv&&hero&&!matchMedia("(prefers-reduced-motion:reduce)").matches&&!(navigator.connection&&navigator.connection.saveData)){
    var on=function(){hero.classList.add("has-video")},off=function(){hero.classList.remove("has-video")},cur="",inView=true,
        mq=matchMedia("(max-width:860px), (orientation:portrait) and (max-width:1100px), (orientation:landscape) and (max-height:520px)");
    hv.muted=true;hv.defaultMuted=true;hv.loop=true;hv.removeAttribute("controls");
    hv.addEventListener("playing",on);hv.addEventListener("error",off);
    var hm=d.getElementById("heroVideoM");
    if(hm){hm.muted=true;hm.defaultMuted=true;hm.loop=true;hm.addEventListener("playing",function(){hero.classList.add("has-video-m")})}
    var tryPlayM=function(){if(d.hidden||!inView||!hm||!hm.getAttribute("src"))return;var q=hm.play();if(q&&q.catch)q.catch(function(){})};
    var tryPlay=function(){if(d.hidden||!inView||!hv.src)return;var q=hv.play();if(q&&q.catch)q.catch(off)};
    var land=matchMedia("(orientation:landscape)");
    // celular em pé / tablet em pé: vídeo vertical próprio (data-src-sm). Desktop e celular deitado: vídeo 16:9 (data-src-lg).
    var pick=function(){
      if(mq.matches&&!land.matches&&hm&&hm.dataset.srcSm){
        if(cur){hv.pause();hv.removeAttribute("src");hv.load();cur="";off()}
        if(!hm.getAttribute("src")){hm.preload="auto";hm.src=hm.dataset.srcSm;hm.load()}
        tryPlayM();return}
      if(hm&&hm.getAttribute("src")){hm.pause();hm.removeAttribute("src");hm.load();hero.classList.remove("has-video-m")}
      var s=hv.dataset.srcLg;if(s===cur)return;cur=s;off();hv.src=s;hv.load();tryPlay()};
    var start=function(){pick();
      (mq.addEventListener?mq.addEventListener("change",pick):mq.addListener(pick));(land.addEventListener?land.addEventListener("change",pick):land.addListener(pick));
      d.addEventListener("visibilitychange",function(){if(d.hidden){hv.pause();hm&&hm.pause()}else{tryPlay();tryPlayM()}});
      if("IntersectionObserver" in window)new IntersectionObserver(function(es){inView=es[0].isIntersecting;if(inView){tryPlay();tryPlayM()}else{hv.pause();hm&&hm.pause()}},{threshold:0}).observe(hero);
      ["touchstart","pointerdown","scroll","click"].forEach(function(ev){addEventListener(ev,function(){if(hv.paused)tryPlay();if(hm&&hm.paused)tryPlayM()},{once:true,passive:true})});
    };
    if(d.readyState==="complete")start();else addEventListener("load",start,{once:true});
  }
  // "Voltar ao topo": rola até o início da página (o alvo antigo era o cabeçalho fixo, que não rola)
  d.querySelectorAll("[data-top]").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();
    var rm=matchMedia("(prefers-reduced-motion:reduce)").matches;scrollTo({top:0,left:0,behavior:rm?"auto":"smooth"});
    if(history.replaceState)history.replaceState(null,"",location.pathname+location.search)})});
  // brilho que acompanha o ponteiro nos cards (somente com mouse)
  if(matchMedia("(hover:hover) and (pointer:fine)").matches){
    d.addEventListener("pointermove",function(e){var c=e.target.closest&&e.target.closest(".card,.seg__i");if(!c)return;
      var r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")},{passive:true});
  }
  // cursor personalizado: somente com mouse; o cursor nativo é sempre preservado
  if(matchMedia("(hover:hover) and (pointer:fine)").matches){
    var c=d.getElementById("cur"),dot=c.firstElementChild,ring=c.lastElementChild,x=0,y=0,rx=0,ry=0,rm=matchMedia("(prefers-reduced-motion:reduce)").matches,run=false;
    root.classList.add("has-cursor");
    addEventListener("mousemove",function(e){x=e.clientX;y=e.clientY;c.classList.add("on");
      var t=e.target.closest&&e.target.closest("input,textarea,select,[contenteditable]");c.classList.toggle("txt",!!t);
      c.classList.toggle("hov",!t&&!!(e.target.closest&&e.target.closest("a,button")));
      if(!run){run=true;rx=x;ry=y;requestAnimationFrame(tick)}},{passive:true});
    d.addEventListener("mouseleave",function(){c.classList.remove("on")});
    function tick(){rx+=(x-rx)*(rm?1:.2);ry+=(y-ry)*(rm?1:.2);
      dot.style.transform="translate("+x+"px,"+y+"px)";ring.style.transform="translate("+rx+"px,"+ry+"px)";requestAnimationFrame(tick)}
  }
})();
