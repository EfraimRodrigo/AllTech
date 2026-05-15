/* ============================================================
   ALLTECH — main.js
   GSAP Animations + Interactivity
   ============================================================ */

/* ── 1. MOBILE MENU — gerenciado pelo script inline em cada página ── */
/* O hamburger é controlado pelo script inline no final de cada HTML.          */
/* Não duplicar aqui para evitar conflito de listeners.                        */

/* ── 2. NAV SCROLL STATE + BACK TO TOP + PROGRESS BAR ── */
(function () {
  function initNavScroll() {
    const navbar      = document.getElementById('navbar');
    const backTop     = document.getElementById('back-top');
    const progressBar = document.getElementById('progress-bar');

    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;

      if (navbar)      navbar.classList.toggle('scrolled', scrollTop > 60);
      if (backTop)     backTop.classList.toggle('visible', scrollTop > 400);
      if (progressBar && docH > 0) {
        progressBar.style.width = ((scrollTop / docH) * 100) + '%';
      }
    }, { passive: true });

    if (backTop) {
      backTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavScroll);
  } else {
    initNavScroll();
  }
})();

/* ── 3. COOKIE TOAST ── */
(function () {
  function initCookieToast() {
    const toast     = document.getElementById('cookie-toast');
    const acceptBtn = document.getElementById('cookie-accept');
    if (!toast) return;

    if (!localStorage.getItem('alltech_cookie_ok')) {
      setTimeout(function () { toast.classList.add('show'); }, 1500);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        toast.classList.remove('show');
        localStorage.setItem('alltech_cookie_ok', '1');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieToast);
  } else {
    initCookieToast();
  }
})();

/* ── 4. SMOOTH ANCHOR SCROLL ── */
(function () {
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
  } else {
    initSmoothScroll();
  }
})();

/* ── 5. FORM VALIDATION ── */
(function () {
  function initForms() {
    document.querySelectorAll('form[data-validate]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;
        form.querySelectorAll('[required]').forEach(function (field) {
          if (!field.value.trim()) {
            field.style.borderColor = '#EF4444';
            valid = false;
            setTimeout(function () { field.style.borderColor = ''; }, 2000);
          }
        });
        if (valid) {
          var btn = form.querySelector('[type="submit"]');
          if (btn) {
            btn.textContent = '✓ Mensagem enviada!';
            btn.style.background = '#22C55E';
            setTimeout(function () {
              btn.textContent = 'Enviar mensagem';
              btn.style.background = '';
            }, 3000);
          }
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForms);
  } else {
    initForms();
  }
})();

/* ── 6. GSAP ANIMATIONS — só inicializa se GSAP estiver disponível ── */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof gsap === 'undefined') return;

  // Registra plugin
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ── 6a. SPLIT H1 INTO LINES (apenas na home) ── */
  var h1 = document.querySelector('#hero h1');
  if (h1) {
    var fullText = h1.innerHTML;
    var parts = fullText.split('<br>');
    h1.innerHTML = parts.map(function (p) {
      return '<span class="line" style="display:block;">' + p + '</span>';
    }).join('');
  }

  /* ── 6b. HERO ANIMATIONS (apenas na home) ── */
  if (document.querySelector('#hero')) {
    var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-badge',          { opacity: 0, y: 20, duration: .6 }, 0.3)
      .from('.hero-content h1 .line', { opacity: 0, y: 50, stagger: .12, duration: .8 }, 0.5)
      .from('.hero-content > p',    { opacity: 0, y: 30, duration: .7 }, 0.9)
      .from('.hero-actions .btn',   { opacity: 0, y: 20, stagger: .1, duration: .5 }, 1.0)
      .from('.hero-stat',           { opacity: 0, y: 20, stagger: .08, duration: .5 }, 1.1)
      .from('.hero-img-3d',         { opacity: 0, scale: .9, x: 30, duration: 1.2, ease: 'power3.out' }, 0.6);

    gsap.to('.hero-img-3d', {
      y: 20, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
  }

  /* ── 6c. SCROLL REVEAL ── */
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: .8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      );
    });

    gsap.utils.toArray('.reveal-left').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: .8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      );
    });

    gsap.utils.toArray('.reveal-right').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: .8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      );
    });

    gsap.utils.toArray('.stagger-children').forEach(function (parent) {
      gsap.fromTo(parent.children,
        { opacity: 0, y: 35, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: .8, stagger: .15, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: parent, start: 'top 85%', once: true } }
      );
    });

    gsap.utils.toArray('.glass-card, .glass-visual').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
      );
    });

    /* ── 6d. PARALLAX HERO (desktop only) ── */
    if (window.innerWidth >= 1024 && document.querySelector('#hero')) {
      gsap.to('.hero-bg', {
        yPercent: 30, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('.hero-grid', {
        yPercent: 15, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    /* ── 6e. ANIMATED COUNTERS ── */
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: function () {
          gsap.fromTo({ val: 0 }, { val: target, duration: 2, ease: 'power2.out' }, {
            onUpdate: function () {
              el.textContent = prefix + Math.round(this.targets()[0].val).toLocaleString('pt-BR') + suffix;
            }
          });
        }
      });
    });

    /* ── 6f. ACTIVE NAV LINK ── */
    var sections = document.querySelectorAll('section[id]');
    if (sections.length) {
      ScrollTrigger.create({
        trigger: 'body', start: 'top top', end: 'bottom bottom',
        onUpdate: function () {
          var current = '';
          sections.forEach(function (sec) {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
          });
          document.querySelectorAll('.nav-links a').forEach(function (a) {
            a.style.color = a.getAttribute('href') === ('#' + current) ? 'var(--cyan)' : '';
          });
        }
      });
    }
  }

  /* ── 6g. SOLUTION CARDS MAGNETIC HOVER ── */
  document.querySelectorAll('.sol-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      gsap.to(card, { x: x * 0.03, y: y * 0.03, duration: .4, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', function () {
      gsap.to(card, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1, 0.5)' });
    });
  });
});
