/* ══════════════════════════════════════════════════
   KITECH PDP — Premium Interaction System
   Sticky ATC · FAQ · AI Widget · Spec Tabs · Scroll FX
══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Utility ── */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const on = (el, e, fn) => el && el.addEventListener(e, fn);

  /* ════════════════════════════════════
     1. STICKY ADD-TO-CART BAR
  ════════════════════════════════════ */
  function initStickyATC() {
    const atcBar = $('.kt-sticky-atc');
    const mainATC = $('.product-form__submit, .kt-main-atc');
    if (!atcBar) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        atcBar.classList.toggle('is-visible', !entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );
    if (mainATC) io.observe(mainATC);

    // Clone click to main form
    const stickyBtn = $('.kt-sticky-atc__btn');
    on(stickyBtn, 'click', () => {
      if (mainATC) {
        mainATC.click();
        stickyBtn.textContent = '✓ Added!';
        stickyBtn.style.background = 'linear-gradient(135deg,#30D158,#28A745)';
        setTimeout(() => {
          stickyBtn.textContent = 'Add to Cart';
          stickyBtn.style.background = '';
        }, 2500);
      }
    });
  }

  /* ════════════════════════════════════
     2. FAQ ACCORDION
  ════════════════════════════════════ */
  function initFAQ() {
    $$('.kt-faq-item__q').forEach(q => {
      on(q, 'click', () => {
        const item = q.closest('.kt-faq-item');
        const isOpen = item.classList.contains('open');
        // Close all
        $$('.kt-faq-item.open').forEach(i => i.classList.remove('open'));
        // Open clicked if it was closed
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ════════════════════════════════════
     3. AI FLOATING WIDGET
  ════════════════════════════════════ */
  function initAIWidget() {
    const btn = $('.kt-ai-widget__btn');
    const popup = $('.kt-ai-widget__popup');
    if (!btn || !popup) return;

    on(btn, 'click', (e) => {
      e.stopPropagation();
      popup.classList.toggle('open');
    });
    on(document, 'click', (e) => {
      if (!e.target.closest('.kt-ai-widget')) popup.classList.remove('open');
    });

    // Auto-open after 5s with delay on first visit
    if (!sessionStorage.getItem('kt-ai-shown')) {
      setTimeout(() => {
        popup.classList.add('open');
        sessionStorage.setItem('kt-ai-shown', '1');
        setTimeout(() => popup.classList.remove('open'), 6000);
      }, 5000);
    }
  }

  /* ════════════════════════════════════
     4. SPEC TABS
  ════════════════════════════════════ */
  function initSpecTabs() {
    $$('.kt-specs-tab').forEach(tab => {
      on(tab, 'click', () => {
        $$('.kt-specs-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // Show relevant spec panel
        const target = tab.dataset.tab;
        $$('.kt-specs-panel').forEach(p => {
          p.style.display = p.dataset.panel === target ? '' : 'none';
        });
      });
    });
  }

  /* ════════════════════════════════════
     5. RATING BAR ANIMATION
  ════════════════════════════════════ */
  function initRatingBars() {
    const bars = $$('.kt-rating-bar__fill');
    if (!bars.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width || '0%';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0%';
      bar.dataset.width = w;
      io.observe(bar);
    });
  }

  /* ════════════════════════════════════
     6. SCROLL REVEAL ANIMATIONS
  ════════════════════════════════════ */
  function initScrollReveal() {
    const targets = $$('.kt-feature-card, .kt-compare-card, .kt-review-card, .kt-specs-row, .kt-faq-item');
    if (!targets.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)';
      io.observe(el);
    });
  }

  /* ════════════════════════════════════
     7. PRODUCT IMAGE ZOOM GLOW
  ════════════════════════════════════ */
  function initImageGlow() {
    $$('.product__media-item').forEach(item => {
      on(item, 'mouseenter', () => {
        item.style.boxShadow = '0 0 40px rgba(10,132,255,0.15)';
      });
      on(item, 'mouseleave', () => {
        item.style.boxShadow = '';
      });
    });
  }

  /* ════════════════════════════════════
     8. STICKY ATC — Update Product Info
  ════════════════════════════════════ */
  function initStickyInfo() {
    const titleEl = $('.product__title h1') || $('.product__title');
    const priceEl = $('.price--large .price-item') || $('.price .price-item');
    const stickyName = $('.kt-sticky-atc__name');
    const stickyPrice = $('.kt-sticky-atc__price');

    if (titleEl && stickyName) stickyName.textContent = titleEl.textContent.trim();
    if (priceEl && stickyPrice) stickyPrice.textContent = priceEl.textContent.trim();
  }

  /* ════════════════════════════════════
     9. COMPARE CARD HOVER GLOW
  ════════════════════════════════════ */
  function initCompareCards() {
    $$('.kt-compare-card:not(.kt-compare-card--featured)').forEach(card => {
      on(card, 'mouseenter', () => {
        card.style.borderColor = 'rgba(255,255,255,0.12)';
        card.style.transform = 'translateY(-4px)';
        card.style.transition = 'all 0.3s cubic-bezier(0.16,1,0.3,1)';
      });
      on(card, 'mouseleave', () => {
        card.style.borderColor = '';
        card.style.transform = '';
      });
    });
  }

  /* ════════════════════════════════════
     10. URGENCY STOCK COUNTER
  ════════════════════════════════════ */
  function initUrgency() {
    const el = $('.kt-urgency-stock-num');
    if (!el) return;
    const base = parseInt(el.dataset.stock || '7', 10);
    let count = base;
    // Simulate live stock reduction
    const interval = setInterval(() => {
      if (Math.random() < 0.03 && count > 2) {
        count--;
        el.textContent = count;
        el.style.color = count <= 3 ? '#FF3B30' : '#FF9F0A';
      }
    }, 8000);
    window.addEventListener('beforeunload', () => clearInterval(interval));
  }

  /* ════════════════════════════════════
     INIT ALL
  ════════════════════════════════════ */
  function init() {
    initStickyATC();
    initFAQ();
    initAIWidget();
    initSpecTabs();
    initRatingBars();
    initScrollReveal();
    initImageGlow();
    initStickyInfo();
    initCompareCards();
    initUrgency();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
