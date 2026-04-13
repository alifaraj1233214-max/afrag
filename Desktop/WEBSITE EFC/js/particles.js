/* ═══════════════════════════════════════════════════════════
   EFC PHARMACEUTICALS — PARTICLE SYSTEM
   Molecular-themed interactive particle background
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  const CFG = {
    count:         55,
    maxRadius:     3,
    minRadius:     1,
    speed:         0.35,
    connectDist:   130,
    colors:        ['rgba(26,107,217,', 'rgba(201,162,39,', 'rgba(46,132,245,'],
    mouseRadius:   120,
    mouseRepel:    false,
  };

  let mouse = { x: -999, y: -999 };

  /* ── Resize ── */
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  /* ── Particle class ── */
  class Particle {
    constructor() { this.reset(true); }

    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : -10;
      this.r  = CFG.minRadius + Math.random() * (CFG.maxRadius - CFG.minRadius);
      this.vx = (Math.random() - 0.5) * CFG.speed * 2;
      this.vy = (Math.random() - 0.5) * CFG.speed * 2;
      const c = CFG.colors[Math.floor(Math.random() * CFG.colors.length)];
      this.baseAlpha = 0.2 + Math.random() * 0.5;
      this.color = c;
      this.alpha = this.baseAlpha;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.pulse += 0.02;
      this.alpha = this.baseAlpha + Math.sin(this.pulse) * 0.1;

      /* Mouse repulsion */
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CFG.mouseRadius) {
        const force = (CFG.mouseRadius - dist) / CFG.mouseRadius;
        this.vx += (dx / dist) * force * 0.5;
        this.vy += (dy / dist) * force * 0.5;
      }

      /* Damping */
      this.vx *= 0.99;
      this.vy *= 0.99;

      /* Clamp speed */
      const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (spd > CFG.speed * 3) {
        this.vx = (this.vx / spd) * CFG.speed * 3;
        this.vy = (this.vy / spd) * CFG.speed * 3;
      }

      this.x += this.vx;
      this.y += this.vy;

      /* Wrap edges */
      if (this.x < -20) this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
      if (this.y < -20) this.y = H + 20;
      if (this.y > H + 20) this.y = -20;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  /* ── Init ── */
  function init() {
    resize();
    particles = [];
    for (let i = 0; i < CFG.count; i++) {
      particles.push(new Particle());
    }
  }

  /* ── Draw connections ── */
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CFG.connectDist) {
          const alpha = (1 - dist / CFG.connectDist) * 0.25;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, a.color + alpha + ')');
          grad.addColorStop(1, b.color + alpha + ')');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  /* ── Animate ── */
  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  }

  /* ── Events ── */
  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    init();
    animate();
  });

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -999;
    mouse.y = -999;
  });

  /* ── Start ── */
  init();
  animate();
})();
