/* ═══════════════════════════════════════════════════════════════════
   AliCrypto — main.js (Premium Redesign)
═══════════════════════════════════════════════════════════════════ */
'use strict';

/* ── Crypto Ticker ──────────────────────────────────────────────── */
const COINS = [
  { name:'BTC',  price:68420,  change:+2.34 },
  { name:'ETH',  price:3812,   change:+1.87 },
  { name:'BNB',  price:578,    change:-0.43 },
  { name:'SOL',  price:182,    change:+4.21 },
  { name:'XRP',  price:.63,    change:+1.15 },
  { name:'ADA',  price:.48,    change:-0.88 },
  { name:'AVAX', price:38,     change:+3.50 },
  { name:'DOT',  price:8.74,   change:-1.22 },
  { name:'LINK', price:15.30,  change:+2.10 },
  { name:'MATIC',price:.91,    change:+0.77 },
];

function fmtPrice(p){ return p>=1000?'$'+p.toLocaleString('en-US',{maximumFractionDigits:0}):p>=1?'$'+p.toFixed(2):'$'+p.toFixed(4); }
function fmtChg(c){   return (c>=0?'+':'')+c.toFixed(2)+'%'; }

function buildTicker(){
  const track = document.getElementById('tickerTrack');
  if(!track) return;
  const render = (coins) => coins.map(c=>{
    const dir = c.change>=0?'up':'down';
    return `<div class="ticker-item"><span class="t-name">${c.name}</span><span class="t-price">${fmtPrice(c.price)}</span><span class="t-chg ${dir}">${fmtChg(c.change)}</span></div>`;
  }).join('');
  track.innerHTML = render([...COINS,...COINS]);

  setInterval(()=>{
    COINS.forEach(c=>{
      c.price  = Math.max(0.0001, c.price + (Math.random()-.48)*c.price*.003);
      c.change = parseFloat((c.change+(Math.random()-.5)*.1).toFixed(2));
    });
    const prices = track.querySelectorAll('.t-price');
    const changes= track.querySelectorAll('.t-chg');
    prices.forEach((el,i)=>{ const c=COINS[i%COINS.length]; el.textContent=fmtPrice(c.price); });
    changes.forEach((el,i)=>{
      const c=COINS[i%COINS.length]; const dir=c.change>=0?'up':'down';
      el.className=`t-chg ${dir}`; el.textContent=fmtChg(c.change);
    });
  }, 3800);
}

/* ── Hero Canvas ────────────────────────────────────────────────── */
function initHeroCanvas(){
  const canvas = document.getElementById('heroCanvas');
  if(!canvas) return;

  // Respect reduced motion
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ canvas.style.display='none'; return; }

  const ctx = canvas.getContext('2d');
  let W,H,pts;

  const PALETTES = [[99,102,241],[6,182,212],[245,158,11]];

  function resize(){ W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; }

  function mkPts(){ pts=Array.from({length:55},(_,i)=>({ x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35, r:Math.random()*1.6+.4, col:PALETTES[i%PALETTES.length], a:Math.random()*.45+.08 })); }

  function draw(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.hypot(dx,dy);
        if(d<100){ ctx.beginPath(); ctx.strokeStyle=`rgba(${pts[i].col},${(1-d/100)*.1})`; ctx.lineWidth=.5; ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke(); }
      }
    }
    pts.forEach(p=>{
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(${p.col},${p.a})`; ctx.fill();
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<-10)p.x=W+10; if(p.x>W+10)p.x=-10;
      if(p.y<-10)p.y=H+10; if(p.y>H+10)p.y=-10;
    });
    requestAnimationFrame(draw);
  }

  resize(); mkPts(); draw();
  let rt; window.addEventListener('resize',()=>{ clearTimeout(rt); rt=setTimeout(()=>{ resize(); mkPts(); },150); },{passive:true});
}

/* ── Mini Chart (hero card) ─────────────────────────────────────── */
function initMiniChart(){
  const c = document.getElementById('miniChart');
  if(!c) return;
  const ctx = c.getContext('2d');
  const W=320, H=90;

  // Generate fake price series
  const pts=[];
  let v=28400;
  for(let i=0;i<60;i++){ v+=( Math.random()-.44)*v*.025; pts.push(v); }

  const mn=Math.min(...pts), mx=Math.max(...pts);
  const xs=(i)=>i/(pts.length-1)*W;
  const ys=(v)=>H-((v-mn)/(mx-mn))*H*.85-H*.08;

  // Gradient fill
  const grad = ctx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,'rgba(99,102,241,.35)');
  grad.addColorStop(1,'rgba(99,102,241,.0)');

  ctx.clearRect(0,0,W,H);
  ctx.beginPath(); ctx.moveTo(xs(0),ys(pts[0]));
  pts.forEach((_,i)=>{ if(i>0) ctx.lineTo(xs(i),ys(pts[i])); });
  const last=pts[pts.length-1];
  ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath();
  ctx.fillStyle=grad; ctx.fill();

  ctx.beginPath(); ctx.moveTo(xs(0),ys(pts[0]));
  pts.forEach((_,i)=>{ if(i>0) ctx.lineTo(xs(i),ys(pts[i])); });
  ctx.strokeStyle='rgba(99,102,241,.9)'; ctx.lineWidth=1.8;
  ctx.lineJoin='round'; ctx.stroke();

  // Dot at end
  ctx.beginPath(); ctx.arc(W,ys(last),3.5,0,Math.PI*2);
  ctx.fillStyle='#6366f1'; ctx.fill();
}

/* ── Sticky Header ──────────────────────────────────────────────── */
function initHeader(){
  const h = document.getElementById('header');
  if(!h) return;
  const update=()=>h.classList.toggle('scrolled', window.scrollY>16);
  window.addEventListener('scroll', update, {passive:true});
  update();
}

/* ── Mobile Nav ─────────────────────────────────────────────────── */
function initNav(){
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if(!btn||!links) return;

  const close=()=>{ links.classList.remove('open'); btn.classList.remove('open'); btn.setAttribute('aria-expanded','false'); document.body.style.overflow=''; };
  const open =()=>{ links.classList.add('open');    btn.classList.add('open');    btn.setAttribute('aria-expanded','true');  document.body.style.overflow='hidden'; };

  btn.addEventListener('click',()=> btn.getAttribute('aria-expanded')==='true' ? close() : open() );
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click', close));
  document.addEventListener('click',e=>{ if(!btn.contains(e.target)&&!links.contains(e.target)) close(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
}

/* ── AOS (Intersection Observer) ───────────────────────────────── */
function initAOS(){
  const els = document.querySelectorAll('[data-aos]');
  if(!els.length) return;

  // Respect reduced motion — just show everything
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    els.forEach(el=>{ el.style.opacity=1; el.style.transform='none'; }); return;
  }

  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('aos-visible'); obs.unobserve(e.target); } });
  },{threshold:.1, rootMargin:'0px 0px -32px 0px'});
  els.forEach(el=>obs.observe(el));
}

/* ── Counter Animation ──────────────────────────────────────────── */
function initCounters(){
  const els = document.querySelectorAll('[data-count]');
  if(!els.length) return;
  const easeOut=t=>1-Math.pow(1-t,3);

  function run(el){
    const target=+el.dataset.count, dur=1800, start=performance.now();
    (function tick(now){ const p=Math.min((now-start)/dur,1); el.textContent=Math.round(easeOut(p)*target).toLocaleString('en-US'); p<1&&requestAnimationFrame(tick); })(start);
  }

  const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ run(e.target); obs.unobserve(e.target); } }); },{threshold:.5});
  els.forEach(el=>obs.observe(el));
}

/* ── Performance Bars ───────────────────────────────────────────── */
function initPerfBars(){
  const bars = document.querySelectorAll('.perf-bar');
  if(!bars.length) return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.style.width=e.target.style.getPropertyValue('--w')||'100%'; obs.unobserve(e.target); } });
  },{threshold:.5});
  bars.forEach(b=>{ b.style.width='0'; obs.observe(b); });
}

/* ── Active Nav Link ────────────────────────────────────────────── */
function initActiveNav(){
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ const id=e.target.id; links.forEach(a=>{ a.style.color = a.getAttribute('href')==='#'+id ? 'var(--text-1)' : ''; }); } });
  },{threshold:.3});
  sections.forEach(s=>obs.observe(s));
}

/* ── Back to Top ────────────────────────────────────────────────── */
function initBackTop(){
  const btn=document.getElementById('backTop');
  if(!btn) return;
  window.addEventListener('scroll',()=>btn.classList.toggle('show', window.scrollY>450),{passive:true});
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

/* ── Smooth Scroll ──────────────────────────────────────────────── */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const target=document.querySelector(a.getAttribute('href'));
      if(!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))||66;
      const tickH= parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ticker-h'))||34;
      window.scrollTo({top: target.getBoundingClientRect().top+window.scrollY - navH - tickH - 8, behavior:'smooth'});
    });
  });
}

/* ── Contact Form ───────────────────────────────────────────────── */
function initForm(){
  const form=document.getElementById('contactForm');
  const btn =document.getElementById('submitBtn');
  const ok  =document.getElementById('formSuccess');
  if(!form) return;

  form.addEventListener('submit', async e=>{
    e.preventDefault();
    let valid=true;
    form.querySelectorAll('[required]').forEach(el=>{ el.style.borderColor=''; if(!el.value.trim()){ el.style.borderColor='var(--red)'; if(valid){ el.focus(); } valid=false; } }); // §8: focus-management
    if(!valid) return;

    btn.querySelector('.btn-label').hidden=true;
    btn.querySelector('.btn-loader').hidden=false;
    btn.disabled=true; btn.setAttribute('aria-busy','true');

    await new Promise(r=>setTimeout(r,1600));

    btn.querySelector('.btn-label').hidden=false;
    btn.querySelector('.btn-loader').hidden=true;
    btn.disabled=false; btn.removeAttribute('aria-busy');
    ok.hidden=false; form.reset();
    setTimeout(()=>{ ok.hidden=true; },7000);
  });

  // inline validation on blur (§8: inline-validation)
  form.querySelectorAll('[required]').forEach(el=>{
    el.addEventListener('blur',()=>{ if(el.value.trim()) el.style.borderColor=''; });
  });
}

/* ── Boot ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', ()=>{
  buildTicker();
  initHeroCanvas();
  initMiniChart();
  initHeader();
  initNav();
  initAOS();
  initCounters();
  initPerfBars();
  initActiveNav();
  initBackTop();
  initSmoothScroll();
  initForm();
});
