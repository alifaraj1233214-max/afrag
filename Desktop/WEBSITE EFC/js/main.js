/* ═══════════════════════════════════════════════════════════
   EFC PHARMACEUTICALS — MAIN JAVASCRIPT
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Navbar scroll behavior ────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ── Active nav link on scroll ─────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── Mobile menu ───────────────────────────────────────── */
  const hamburger     = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose   = document.getElementById('mobileClose');
  const mobileLinks   = document.querySelectorAll('.mobile-link, .mobile-cta');

  function openMenu() {
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* ── Counter animation ─────────────────────────────────── */
  function animateCounter(el, target, duration = 2000) {
    const suffix = target >= 1000 ? '+' : '+';
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }, 16);
  }

  const statsSection = document.getElementById('stats');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        document.querySelectorAll('.stat-number').forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target);
        });
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) statsObserver.observe(statsSection);

  /* ── Scroll-reveal animations ──────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children')
    .forEach(el => revealObserver.observe(el));

  /* Auto-add reveal classes to sections */
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = (i % 3) * 0.12 + 's';
    revealObserver.observe(card);
  });

  document.querySelectorAll('.product-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = (i % 3) * 0.1 + 's';
    revealObserver.observe(card);
  });

  document.querySelectorAll('.highlight-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = i * 0.1 + 's';
    revealObserver.observe(card);
  });

  document.querySelectorAll('.contact-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = i * 0.08 + 's';
    revealObserver.observe(card);
  });

  document.querySelectorAll('.pillar').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = i * 0.1 + 's';
    revealObserver.observe(el);
  });

  /* ── Pipeline bar animation ────────────────────────────── */
  const pipelineStages = document.querySelectorAll('.pipeline-stage');
  let pipelineAnimated = false;

  const pipelineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !pipelineAnimated) {
        pipelineAnimated = true;
        pipelineStages.forEach((stage, i) => {
          const fill = stage.querySelector('.stage-fill');
          if (!fill) return;
          const targetWidth = fill.style.width;
          fill.style.width = '0';
          setTimeout(() => {
            fill.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
            fill.style.width = targetWidth;
          }, i * 150 + 200);
        });
      }
    });
  }, { threshold: 0.3 });

  const researchSection = document.getElementById('research');
  if (researchSection) pipelineObserver.observe(researchSection);

  /* ── Product filter ────────────────────────────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (match) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.display = 'flex';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            if (btn.dataset.filter !== 'all' && card.dataset.cat !== btn.dataset.filter) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });

  /* ── Contact form ──────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Basic validation */
      const required = contactForm.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
          field.style.borderColor = '#DC2626';
          valid = false;
        }
      });

      if (!valid) return;

      /* Simulate submit */
      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
      }, 1400);
    });

    /* Clear error styling on input */
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => { field.style.borderColor = ''; });
    });
  }

  /* ── Back to top ───────────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Smooth scroll for all anchor links ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Section reveal on load ────────────────────────────── */
  const aboutVisual = document.querySelector('.about-visual');
  const aboutContent = document.querySelector('.about-content');

  if (aboutVisual) {
    aboutVisual.classList.add('reveal-left');
    revealObserver.observe(aboutVisual);
  }
  if (aboutContent) {
    aboutContent.classList.add('reveal-right');
    revealObserver.observe(aboutContent);
  }

  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  document.querySelectorAll('.cert-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = i * 0.06 + 's';
    revealObserver.observe(el);
  });

  /* ── Stat suffix ───────────────────────────────────────── */
  const statSuffixes = { 26: ' Yrs', 180: '+', 2400: '+', 50: 'M+', 320: '+' };

  function animateCounterWithSuffix(el, target, duration = 2000) {
    const suffix = statSuffixes[target] || '+';
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }, 16);
  }

  /* Overwrite the basic counter with suffixed version */
  const statsObserver2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        document.querySelectorAll('.stat-number').forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          animateCounterWithSuffix(el, target);
        });
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) statsObserver2.observe(statsSection);

})();
