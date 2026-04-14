/* ─────────────────────────────────────────────────────────────────
   SAFARI BAGHDAD — main.js
   UI/UX Pro Max rules applied:
   ✓ prefers-reduced-motion respected (animation: reduced-motion — HIGH)
   ✓ Active nav state tracking (navigation: active-state — MEDIUM)
   ✓ Touch targets verified (touch: touch-target-size — CRITICAL)
   ✓ Accessible form validation (accessibility: form-labels, error-messages)
   ✓ Parallax GPU-accelerated (transform-performance — MEDIUM)
   ✓ Counter animation (motion-driven style)
   ✓ Hamburger aria-expanded updated (accessibility: aria-labels)
   ✓ Easing: ease-out for enter, ease-in for exit (animation: easing — LOW)
   ───────────────────────────────────────────────────────────────── */

/* ─── Respect prefers-reduced-motion globally ─── */
var REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Nav: scroll state + floating transition ─── */
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─── Nav: mobile hamburger with aria-expanded ─── */
(function () {
  var btn  = document.getElementById('nav-hamburger');
  var menu = document.getElementById('nav-mobile');
  if (!btn || !menu) return;

  function close() {
    btn.classList.remove('open');
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
  }
  function open() {
    btn.classList.add('open');
    menu.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation menu');
  }

  btn.addEventListener('click', function () {
    btn.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  /* Close on link click */
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', close);
  });

  /* Close on Escape (keyboard nav) */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      close();
      btn.focus();
    }
  });

  /* Close when clicking outside */
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !menu.contains(e.target)) close();
  });
})();

/* ─── Nav: active state tracking via IntersectionObserver ─── */
(function () {
  var links = document.querySelectorAll('.nav-links a[data-section]');
  if (!links.length) return;

  var sections = Array.from(links).map(function (l) {
    return document.getElementById(l.getAttribute('data-section'));
  }).filter(Boolean);

  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.id;
      links.forEach(function (l) {
        var active = l.getAttribute('data-section') === id;
        l.classList.toggle('active', active);
      });
    });
  }, { threshold: 0.35, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(function (s) { observer.observe(s); });
})();

/* ─── Parallax hero (GPU-accelerated: will-change: transform) ─── */
(function () {
  if (REDUCED_MOTION) return; /* respect prefers-reduced-motion */

  var sky  = document.getElementById('hero-sky');
  var mid  = document.getElementById('hero-mid');
  var near = document.getElementById('hero-near');
  if (!sky) return;

  var ticking = false;
  var lastY   = 0;

  function applyParallax() {
    var y = lastY;
    /* Motion-Driven (styles.csv row 15): parallax 3-5 layers ✓ */
    if (sky)  sky.style.transform  = 'translateY(' + (y * 0.07) + 'px)';
    if (mid)  mid.style.transform  = 'translateY(' + (y * 0.16) + 'px)';
    if (near) near.style.transform = 'translateY(' + (y * 0.28) + 'px)';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    lastY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(applyParallax); /* rAF for 60fps smoothness */
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── Star generation (hero atmosphere) ─── */
(function () {
  var container = document.getElementById('hero-stars');
  if (!container) return;

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 70; i++) {
    var star = document.createElement('div');
    var size = Math.random() * 1.8 + 0.8;
    star.className = 'star';
    star.style.cssText = [
      'width:'   + size + 'px',
      'height:'  + size + 'px',
      'top:'     + (Math.random() * 55) + '%',
      'left:'    + (Math.random() * 100) + '%',
      'opacity:' + (Math.random() * 0.5 + 0.1),
    ].join(';');
    fragment.appendChild(star);
  }
  container.appendChild(fragment);
})();

/* ─── Scroll-reveal (Intersection Observer) ─── */
(function () {
  var els = document.querySelectorAll('.reveal');

  if (REDUCED_MOTION) {
    /* Skip animation — show everything immediately */
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { observer.observe(el); });
})();

/* ─── Animated counters (motion-driven) ─── */
(function () {
  var stats = document.querySelectorAll('[data-count]');
  if (!stats.length) return;

  if (REDUCED_MOTION) {
    stats.forEach(function (el) {
      el.textContent = Number(el.getAttribute('data-count')).toLocaleString();
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el     = entry.target;
      var target = parseFloat(el.getAttribute('data-count'));
      var dur    = 1600;
      var start  = performance.now();

      function tick(now) {
        var elapsed  = now - start;
        var progress = Math.min(elapsed / dur, 1);
        /* ease-out cubic for natural deceleration */
        var ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * ease).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  stats.forEach(function (s) { observer.observe(s); });
})();

/* ─── Accessible form validation ─── */
/* UX rules: error-feedback (near the problem), form-labels, loading-buttons */
function handleSubmit(e) {
  e.preventDefault();

  var nameEl  = document.getElementById('f-name');
  var emailEl = document.getElementById('f-email');
  var nameErr  = document.getElementById('f-name-err');
  var emailErr = document.getElementById('f-email-err');
  var btn     = document.getElementById('form-submit');
  var success = document.getElementById('form-success');

  /* Clear previous errors */
  nameErr.textContent  = '';
  emailErr.textContent = '';

  var valid = true;
  var firstError = null;

  /* Name validation */
  if (!nameEl.value.trim()) {
    nameErr.textContent = 'Please enter your full name.';
    if (!firstError) firstError = nameEl;
    valid = false;
  }

  /* Email validation */
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailEl.value.trim()) {
    emailErr.textContent = 'Please enter your email address.';
    if (!firstError) firstError = emailEl;
    valid = false;
  } else if (!emailPattern.test(emailEl.value.trim())) {
    emailErr.textContent = 'Please enter a valid email address.';
    if (!firstError) firstError = emailEl;
    valid = false;
  }

  /* Focus first error (keyboard accessibility) */
  if (!valid) {
    if (firstError) firstError.focus();
    return false;
  }

  /* Disable button during 'submit' (loading-buttons rule) */
  btn.disabled = true;
  btn.textContent = 'Sending…';

  /* Simulate async submit */
  setTimeout(function () {
    success.classList.add('visible');
    btn.textContent = 'Enquiry Sent';
    /* Scroll success message into view */
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    /* Re-enable after 5s */
    setTimeout(function () {
      btn.disabled = false;
      btn.textContent = 'Send Private Enquiry';
    }, 5000);
  }, 900);

  return false;
}

/* ─── Site cards: keyboard interaction (Enter/Space = hover reveal) ─── */
(function () {
  document.querySelectorAll('.site-card[tabindex]').forEach(function (card) {
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('keyboard-active');
      }
    });
    /* Remove on blur */
    card.addEventListener('blur', function () {
      card.classList.remove('keyboard-active');
    });
  });
})();
