/* MergivolveFX — reusable effects (egg art, hatch cinematic, particle burst). Pure DOM/CSS/Web-Animations, no libs, no assets. */
(function(){'use strict';
const RC={common:['#d6e6cf','#6f9a6b'],uncommon:['#b4f2c3','#2a9556'],rare:['#b6d8ff','#2c68cc'],epic:['#dcc2ff','#7438c8'],legendary:['#ffe7a6','#d9830c'],mythic:['#ffc2ea','#bd1f7c']};
const P='M50 6C26 6 10 52 10 82c0 25 18 42 40 42s40-17 40-42C90 52 74 6 50 6z';
const rngf=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const reduce=()=>matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
let injected=false;function inject(){if(injected)return;injected=true;const s=document.createElement('style');s.textContent=`
.mfx-egg-svg{width:100%;height:100%;display:block;filter:drop-shadow(0 4px 5px #0006)}
.board-item .board-egg{animation:mfxRock 3.2s ease-in-out infinite;transform-origin:50% 90%}
@keyframes mfxRock{0%,70%,100%{transform:rotate(0)}76%{transform:rotate(-7deg)}82%{transform:rotate(6deg)}88%{transform:rotate(-3deg)}}
.board-item .stage-chip{position:absolute;top:2px;inset-inline-end:3px;z-index:3;font:700 8px/1 system-ui;background:#0009;color:#fff;border-radius:6px;padding:2px 4px;pointer-events:none}
.mfx-ov{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;background:radial-gradient(circle at 50% 45%,#27483a,#0b1712 75%);animation:mfxIn .25s ease-out;touch-action:manipulation}
@keyframes mfxIn{from{opacity:0}}
.mfx-glow{position:absolute;width:140vmin;height:140vmin;border-radius:50%;background:radial-gradient(circle,var(--c) 0,transparent 60%);opacity:.18;transition:opacity .5s,transform .8s;transform:scale(.6)}
.mfx-ov.hot .mfx-glow{opacity:.75;transform:scale(1.1)}
.mfx-stage{position:relative;width:min(62vw,300px);aspect-ratio:100/130}
.mfx-egg,.mfx-half{position:absolute;inset:0}.mfx-egg{animation:mfxWob .9s ease-in-out infinite}
.mfx-ov.s2 .mfx-egg{animation-duration:.5s}.mfx-ov.s3 .mfx-egg{animation-duration:.28s}
@keyframes mfxWob{0%,100%{transform:rotate(0) scale(1)}25%{transform:rotate(-6deg) scale(1.02)}75%{transform:rotate(6deg) scale(1.02)}}
.mfx-cracks{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.mfx-cracks path{fill:none;stroke:#fff8d0;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:90;stroke-dashoffset:90;filter:drop-shadow(0 0 3px #fff)}
.mfx-ov.s1 .c1,.mfx-ov.s2 .c2,.mfx-ov.s3 .c3{animation:mfxDraw .4s ease-out forwards}.mfx-ov.s2 .c1,.mfx-ov.s3 .c1,.mfx-ov.s3 .c2,.mfx-ov.open .mfx-cracks path{stroke-dashoffset:0;animation:none}
@keyframes mfxDraw{to{stroke-dashoffset:0}}
.mfx-half{opacity:0}.mfx-half.top{clip-path:polygon(0 0,100% 0,100% 48%,85% 54%,70% 46%,55% 55%,40% 47%,25% 55%,12% 48%,0 52%)}
.mfx-half.bot{clip-path:polygon(0 52%,12% 48%,25% 55%,40% 47%,55% 55%,70% 46%,85% 54%,100% 48%,100% 100%,0 100%)}
.mfx-ov.open .mfx-egg{display:none}.mfx-ov.open .mfx-half{opacity:1}
.mfx-ov.open .mfx-half.top{animation:mfxTop .8s ease-in forwards}.mfx-ov.open .mfx-half.bot{animation:mfxBot .8s ease-in forwards}
@keyframes mfxTop{to{transform:translate(-30%,-70%) rotate(-28deg);opacity:0}}@keyframes mfxBot{to{transform:translate(26%,55%) rotate(20deg);opacity:0}}
.mfx-creature{position:absolute;inset:-18% -25%;display:grid;place-items:center;transform:scale(.15);opacity:0}
.mfx-creature>*{max-width:100%;max-height:100%;object-fit:contain}.mfx-creature img.framed{border-radius:20px;object-fit:cover}
.mfx-ov.open .mfx-creature{animation:mfxPop .9s cubic-bezier(.2,1.5,.4,1) .1s forwards}
@keyframes mfxPop{0%{transform:scale(.15) scaleY(.6);opacity:0}60%{transform:scale(1.12) scaleY(1.1);opacity:1}100%{transform:scale(1);opacity:1}}
.mfx-creature.idle>*{animation:mfxBreath 2.4s ease-in-out infinite;transform-origin:50% 100%}
@keyframes mfxBreath{0%,100%{transform:translateY(0) scale(1,1)}50%{transform:translateY(-3%) scale(1.02,1.035)}}
.mfx-card{position:absolute;bottom:9vh;text-align:center;color:#fff8e6;font-family:system-ui,sans-serif;opacity:0;transform:translateY(14px);transition:.5s .6s;pointer-events:none}
.mfx-ov.open .mfx-card{opacity:1;transform:none}.mfx-card b{display:block;font-size:22px}.mfx-card span{font-size:13px;opacity:.85}
.mfx-chip{display:inline-block;margin-top:6px;border-radius:99px;padding:2px 10px;font-size:11px;font-weight:700;background:var(--c);color:#1d1305}
.mfx-hint{position:absolute;bottom:3vh;font:12px system-ui;color:#fff9;letter-spacing:.5px}
.mfx-p{position:absolute;left:50%;top:50%;width:8px;height:8px;border-radius:50%;background:var(--pc);box-shadow:0 0 8px var(--pc);animation:mfxFly .95s ease-out forwards;pointer-events:none}
@keyframes mfxFly{from{transform:translate(-50%,-50%) scale(1)}to{transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0);opacity:0}}`;document.head.append(s)}
function eggSVG(o){o=o||{};inject();const[lt,dk]=RC[o.rarity]||RC.common,r=rngf(o.seed||1),id=Math.random().toString(36).slice(2,7);let sp='';for(let i=0;i<10;i++)sp+=`<circle cx="${(22+r()*56).toFixed(1)}" cy="${(38+r()*74).toFixed(1)}" r="${(1.6+r()*3.6).toFixed(1)}" fill="${dk}" opacity="${(.22+r()*.3).toFixed(2)}"/>`;
 return`<svg viewBox="0 0 100 130" class="mfx-egg-svg"><defs><radialGradient id="g${id}" cx="35%" cy="28%" r="80%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".25" stop-color="${lt}"/><stop offset="1" stop-color="${dk}"/></radialGradient><clipPath id="c${id}"><path d="${P}"/></clipPath></defs><path d="${P}" fill="url(#g${id})"/><g clip-path="url(#c${id})">${sp}<ellipse cx="37" cy="30" rx="10" ry="19" transform="rotate(25 37 30)" fill="#fff" opacity=".38"/><path d="M0 104Q50 126 100 100V130H0Z" fill="#000" opacity=".14"/></g><path d="${P}" fill="none" stroke="${dk}" stroke-width="1.2" opacity=".55"/></svg>`}
function burst(host,o){o=o||{};inject();const n=o.count||28,c=o.color||'#ffe29a';for(let i=0;i<n;i++){const d=document.createElement('i');d.className='mfx-p';const a=Math.random()*6.283,m=60+Math.random()*(o.radius||140);d.style.cssText=`--pc:${c};--dx:${Math.cos(a)*m}px;--dy:${Math.sin(a)*m}px;width:${4+Math.random()*7}px;height:${4+Math.random()*7}px`;host.append(d);setTimeout(()=>d.remove(),1000)}}
/* o:{rarity,seed,title,sub,creature:Element|()=>Element,onReveal,onDone,idle} — first tap skips to reveal, second tap closes. */
function hatch(o){inject();const[lt,dk]=RC[o.rarity]||RC.common,ov=document.createElement('div');ov.className='mfx-ov';ov.style.setProperty('--c',dk);
 const egg=o.eggSrc?`<img src="./${o.eggSrc}" alt="" style="width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 4px 5px #0006)">`:eggSVG(o),cr='<svg class="mfx-cracks" viewBox="0 0 100 130"><path class="c1" d="M52 8l-6 16 10 12-9 14"/><path class="c2" d="M12 62l16 6 6-12 14 12 12-10 14 10 14-4"/><path class="c3" d="M60 52l8 20-10 14 8 14M34 66l-8 22 12 12"/></svg>';
 ov.innerHTML=`<div class="mfx-glow"></div><div class="mfx-stage"><div class="mfx-egg">${egg}${cr}</div><div class="mfx-half top">${egg}</div><div class="mfx-half bot">${egg}</div><div class="mfx-creature"></div></div><div class="mfx-card"><b>${o.title||''}</b><span>${o.sub||''}</span><br><i class="mfx-chip">${o.rarity||''}</i></div><div class="mfx-hint">${o.hint||'tap'}</div>`;
 document.body.append(ov);const stage=ov.querySelector('.mfx-stage');let opened=false,closed=false;const T=[];const at=(ms,f)=>T.push(setTimeout(f,ms));
 function reveal(){if(opened)return;opened=Date.now();T.forEach(clearTimeout);ov.classList.add('open','hot');burst(stage,{color:lt,count:34});burst(stage,{color:'#fff',count:14,radius:90});
  o.onReveal&&o.onReveal();setTimeout(()=>{const c=typeof o.creature==='function'?o.creature():o.creature,box=ov.querySelector('.mfx-creature');if(c){box.append(c);if(o.idle!==false)box.classList.add('idle')}},40);ov.querySelector('.mfx-hint').textContent=o.doneHint||'tap to continue'}
 function close(){if(closed)return;closed=true;ov.style.transition='opacity .25s';ov.style.opacity=0;setTimeout(()=>{ov.remove();o.onDone&&o.onDone()},260)}
 ov.addEventListener('click',()=>opened?(Date.now()-opened>500?close():0):reveal());
 if(reduce()){reveal()}else{at(700,()=>ov.classList.add('s1'));at(1500,()=>ov.classList.add('s2'));at(2200,()=>ov.classList.add('s3','hot'));at(2900,reveal)}
 return{close,reveal,el:ov}}
window.MergivolveFX={eggSVG,burst,hatch,RC,inject};inject();})();
