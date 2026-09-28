/* Site interactions, loaded at the end of <body> (hooks/body-end/site.html).
 *
 * Each feature is a small init function that does nothing when its markup is
 * absent. Animations are skipped under prefers-reduced-motion, and nothing
 * here is needed to read the page: without JS every item simply shows. */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
   * Shared helpers
   * ------------------------------------------------------------------ */

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canAnimate = !reduceMotion && typeof Element.prototype.animate === 'function';
  var SPRING = 'cubic-bezier(0.34, 1.4, 0.64, 1)';
  var EASE_OUT = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

  function all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  /* Resolve after an animation or a deadline, whichever comes first, so UI
     state never waits on a throttled (e.g. backgrounded) animation clock. */
  function settle(promise, ms) {
    return Promise.race([promise, new Promise(function (r) { setTimeout(r, ms); })]);
  }

  /* Re-add a class so its CSS animation plays again. */
  function replayClass(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  /* Run once web fonts are in, so measured widths are final. */
  function afterFonts(fn) {
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(fn);
  }

  /* Section heights changed, so refresh the theme's navbar scrollspy. */
  function refreshScrollspy() {
    if (window.jQuery) window.jQuery('body').scrollspy('refresh');
  }

  /* Show or hide a set of sibling elements: leavers fade out, the rest glide
     to their new place (FLIP), newcomers fade in one after another.
     `want(el)` decides visibility; hidden elements carry .is-hidden. */
  function reflow(items, want, animate, done) {
    var next = items.filter(want);
    var shown = items.filter(function (el) { return !el.classList.contains('is-hidden'); });
    var leaving = shown.filter(function (el) { return next.indexOf(el) < 0; });
    var entering = next.filter(function (el) { return el.classList.contains('is-hidden'); });
    var staying = next.filter(function (el) { return !el.classList.contains('is-hidden'); });
    function commit() {
      leaving.forEach(function (el) { el.classList.add('is-hidden'); });
      entering.forEach(function (el) { el.classList.remove('is-hidden'); });
    }
    if (!animate || !canAnimate) {
      commit();
      if (done) done();
      return;
    }
    var fades = leaving.map(function (el) {
      return el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(0.96)' }],
        { duration: 180, easing: 'ease-in', fill: 'forwards' });
    });
    settle(Promise.all(fades.map(function (f) { return f.finished; })), 220).then(function () {
      var before = staying.map(function (el) { return el.getBoundingClientRect(); });
      commit();
      fades.forEach(function (f) { f.cancel(); });
      staying.forEach(function (el, i) {
        var r = el.getBoundingClientRect();
        var dx = before[i].left - r.left;
        var dy = before[i].top - r.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          el.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px)' }, { transform: 'none' }],
            { duration: 480, easing: SPRING });
        }
      });
      entering.forEach(function (el, i) {
        el.animate([{ opacity: 0, transform: 'translateY(14px) scale(0.97)' }, { opacity: 1, transform: 'none' }],
          { duration: 420, delay: 60 + i * 40, easing: EASE_OUT, fill: 'backwards' });
      });
      setTimeout(function () { if (done) done(); }, 60 + entering.length * 40 + 480);
    });
  }

  /* ---------------------------------------------------------------------
   * Features
   * ------------------------------------------------------------------ */

  /* iOS Safari only applies :active styles when a touch listener exists. */
  function initTouchActive() {
    document.addEventListener('touchstart', function () {}, { passive: true });
  }

  /* Theme: one click flips light <-> dark through the theme's own (hidden)
     mode links, so its persistence and events keep working. */
  function initThemeToggle() {
    var toggle = document.querySelector('.js-theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var next = document.body.classList.contains('dark') ? 'light' : 'dark';
      var link = document.querySelector('.js-set-theme-' + next);
      if (link) link.click();
      replayClass(toggle, 'is-spinning');
    });
  }

  /* Navbar pill: springs to the active section and previews on hover. On
     phones the link row scrolls sideways and the active chip is centred. */
  function initNavPill() {
    var nav = document.querySelector('#navbar-main .navbar-nav');
    if (!nav) return;
    var pill = document.createElement('span');
    pill.className = 'nav-pill';
    pill.setAttribute('aria-hidden', 'true');
    nav.appendChild(pill);
    nav.classList.add('has-nav-pill');

    var hovered = null;
    var lastCentred = null;
    function isPhone() { return window.innerWidth < 992; }
    /* Above the first linked section nothing is active and the pill hides. */
    function activeLink() {
      return nav.querySelector('.nav-link.active');
    }
    function place(link, instant) {
      if (!link) {
        pill.style.opacity = '0';
        return;
      }
      var r = link.getBoundingClientRect();
      var p = nav.getBoundingClientRect();
      var inset = isPhone() ? 4 : 6;
      if (instant) pill.classList.add('no-transition');
      pill.style.width = r.width + 'px';
      pill.style.height = (r.height - inset * 2) + 'px';
      pill.style.transform = 'translate(' + (r.left - p.left + nav.scrollLeft) + 'px,' + (r.top - p.top + inset) + 'px)';
      pill.style.opacity = '1';
      if (instant) {
        void pill.offsetWidth;
        pill.classList.remove('no-transition');
      }
    }
    function refresh(instant) { place(hovered || activeLink(), instant); }
    function centreActive() {
      var a = activeLink();
      if (!isPhone() || !a || a === lastCentred) return;
      lastCentred = a;
      var li = a.parentNode;
      nav.scrollTo({
        left: li.offsetLeft - (nav.clientWidth - li.offsetWidth) / 2,
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    }

    all('.nav-link', nav).forEach(function (a) {
      a.addEventListener('mouseenter', function () { hovered = a; refresh(); });
    });
    nav.addEventListener('mouseleave', function () { hovered = null; refresh(); });
    new MutationObserver(function () {
      if (!hovered) refresh();
      centreActive();
    }).observe(nav, { subtree: true, attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', function () { refresh(true); });
    afterFonts(function () { refresh(true); });
  }

  /* Publications: Selected (featured) / All, with a sliding thumb. Group
     titles only show in "All". */
  function initPublicationFilter() {
    var section = document.getElementById('publications');
    var list = section && section.querySelector('.pub-list');
    var filter = section && section.querySelector('.pub-filter');
    if (!list || !filter) return;
    var buttons = all('[data-pub-filter]', filter);
    var thumb = filter.querySelector('.pub-filter-thumb');
    var items = all(':scope > *', list);
    var mode = 'selected';
    var busy = false;

    function want(el) {
      if (el.classList.contains('pub-group-title')) return mode === 'all';
      return mode === 'all' || el.classList.contains('is-selected');
    }
    function moveThumb() {
      buttons.forEach(function (b) {
        var on = b.getAttribute('data-pub-filter') === mode;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        if (on) {
          thumb.style.width = b.offsetWidth + 'px';
          thumb.style.transform = 'translateX(' + b.offsetLeft + 'px)';
        }
      });
    }
    function apply(animate) {
      moveThumb();
      busy = animate && canAnimate;
      reflow(items, want, animate, function () {
        busy = false;
        refreshScrollspy();
      });
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var next = b.getAttribute('data-pub-filter');
        if (busy || next === mode) return;
        mode = next;
        apply(true);
      });
    });
    filter.hidden = false;
    thumb.classList.add('no-transition');
    apply(false);
    void thumb.offsetWidth;
    thumb.classList.remove('no-transition');
    afterFonts(moveThumb);
  }

  /* News: five at a time, with show more / show less. */
  function initNewsPaging() {
    var list = document.querySelector('#news .news-list');
    var controls = document.querySelector('#news .list-more');
    if (!list || !controls) return;
    var STEP = 5;
    var items = all(':scope > *', list);
    var shown = STEP;
    var more = controls.querySelector('[data-news="more"]');
    var less = controls.querySelector('[data-news="less"]');
    var sep = controls.querySelector('.list-more-sep');
    function apply(animate) {
      reflow(items, function (el) { return items.indexOf(el) < shown; }, animate, refreshScrollspy);
      more.hidden = shown >= items.length;
      less.hidden = shown <= STEP;
      sep.hidden = more.hidden || less.hidden;
    }
    more.addEventListener('click', function () {
      shown = Math.min(shown + STEP, items.length);
      apply(true);
    });
    less.addEventListener('click', function () {
      shown = STEP;
      apply(true);
    });
    controls.hidden = false;
    apply(false);
  }

  /* News from the last two months gets a small pulsing dot. */
  function initNewBadges() {
    var NEW_DAYS = 60;
    all('.news-item[data-date]').forEach(function (el) {
      var age = (Date.now() - new Date(el.getAttribute('data-date') + 'T00:00:00')) / 864e5;
      if (age >= 0 && age <= NEW_DAYS) el.classList.add('is-new');
    });
  }

  /* Publication figures: click (or Enter) zooms the figure from its thumbnail. */
  function initLightbox() {
    function open(thumb) {
      var overlay = document.createElement('div');
      overlay.className = 'lightbox';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', thumb.alt);
      overlay.tabIndex = -1;
      var big = new Image();
      big.className = 'lightbox-img';
      big.src = thumb.getAttribute('data-full') || thumb.currentSrc || thumb.src;
      big.alt = thumb.alt;
      var caption = document.createElement('div');
      caption.className = 'lightbox-caption';
      caption.textContent = thumb.alt;
      overlay.appendChild(big);
      overlay.appendChild(caption);
      document.body.appendChild(overlay);
      document.documentElement.classList.add('lightbox-open');

      function zoom(reverse) {
        if (!canAnimate) return Promise.resolve();
        var from = thumb.getBoundingClientRect();
        var to = big.getBoundingClientRect();
        var start = 'translate(' + (from.left - to.left) + 'px,' + (from.top - to.top) + 'px) scale(' + (from.width / to.width) + ')';
        var direction = reverse ? 'reverse' : 'normal';
        overlay.animate([{ opacity: 0 }, { opacity: 1 }],
          { duration: reverse ? 200 : 260, direction: direction, fill: 'forwards' });
        return big.animate([{ transform: start }, { transform: 'none' }], {
          duration: reverse ? 260 : 420,
          easing: reverse ? 'ease-in' : SPRING,
          direction: direction,
          fill: 'forwards'
        }).finished;
      }
      var closing = false;
      function onKey(e) { if (e.key === 'Escape') close(); }
      function close() {
        if (closing) return;
        closing = true;
        document.removeEventListener('keydown', onKey);
        settle(zoom(true), 300).then(function () {
          overlay.remove();
          document.documentElement.classList.remove('lightbox-open');
          thumb.focus({ preventScroll: true });
        });
      }
      overlay.addEventListener('click', close);
      document.addEventListener('keydown', onKey);
      (big.decode ? big.decode() : Promise.resolve()).catch(function () {}).then(function () {
        zoom(false);
        overlay.focus({ preventScroll: true });
      });
    }

    all('.pub-list .image-container img').forEach(function (img) {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Enlarge figure: ' + img.alt);
      img.addEventListener('click', function () { open(img); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(img);
        }
      });
    });
  }

  /* Figures: shimmer until decoded, then fade in sharp. */
  function initFigureLoading() {
    all('.pub-media img').forEach(function (img) {
      if (img.complete && img.naturalWidth) return;
      var box = img.parentNode;
      box.classList.add('is-loading');
      function clear() { box.classList.remove('is-loading'); }
      img.addEventListener('load', clear, { once: true });
      img.addEventListener('error', clear, { once: true });
    });
  }

  /* Email links: click copies the address and offers to open the mail app
     (modifier-clicks keep the normal mailto behaviour). */
  function initEmailCopy() {
    var links = all('#about a[href^="mailto:"]');
    if (!links.length || !navigator.clipboard) return;
    var toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
    var timer = null;

    function show(address, href) {
      toast.innerHTML = '';
      var msg = document.createElement('span');
      msg.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Copied ';
      var strong = document.createElement('strong');
      strong.textContent = address;
      msg.appendChild(strong);
      var action = document.createElement('a');
      action.href = href;
      action.className = 'copy-toast-action';
      action.textContent = 'Open mail app';
      toast.appendChild(msg);
      toast.appendChild(action);
      replayClass(toast, 'is-visible');
      clearTimeout(timer);
      timer = setTimeout(function () { toast.classList.remove('is-visible'); }, 3500);
    }

    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        var href = a.getAttribute('href');
        var address = href.replace(/^mailto:/, '').split('?')[0];
        navigator.clipboard.writeText(address).then(function () {
          show(address, href);
          replayClass(a, 'is-popped');
        }, function () { window.location.href = href; });
      });
    });
  }

  /* Menu jump: once the scroll settles, the target section's bar stretches. */
  function initArrivalHighlight() {
    function arrive(id) {
      var section = document.getElementById(id);
      if (!section || !section.classList.contains('home-section')) return;
      var fired = false;
      function fire() {
        if (fired) return;
        fired = true;
        replayClass(section, 'is-arrived');
      }
      window.addEventListener('scrollend', fire, { once: true });
      setTimeout(fire, 900); /* browsers without scrollend */
    }
    all('#navbar-main .nav-link[href*="#"]').forEach(function (a) {
      a.addEventListener('click', function () { arrive(a.getAttribute('href').split('#')[1]); });
    });
    document.addEventListener('animationend', function (e) {
      if (e.animationName !== 'arrive') return;
      var section = e.target.closest('.home-section');
      if (section) section.classList.remove('is-arrived');
    });
  }

  /* Back to top: springs in once you are a screen or so down. */
  function initBackToTop() {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    document.body.appendChild(button);
    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    function update() { button.classList.toggle('is-visible', window.scrollY > 700); }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* Scroll reveal: each section fades up, then its rows follow in turn.
     Opt-in via .js-reveal, set before first paint (hooks/head-end/site.html). */
  function initScrollReveal() {
    if (!document.documentElement.classList.contains('js-reveal')) return;
    var ROWS = '.news-item, .pub-entry, .pub-group-title, .list-item, .org-row';
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var section = entry.target;
        section.classList.add('is-revealed');
        observer.unobserve(section);
        if (!canAnimate || section.id === 'about') return;
        all(ROWS, section)
          .filter(function (el) { return !el.classList.contains('is-hidden'); })
          .slice(0, 14)
          .forEach(function (el, i) {
            el.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
              { duration: 520, delay: 120 + i * 45, easing: EASE_OUT, fill: 'backwards' });
          });
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    all('.home-section').forEach(function (section) { observer.observe(section); });
  }

  /* Filters must run before the reveal, so hidden rows are not animated in. */
  [
    initTouchActive,
    initThemeToggle,
    initNavPill,
    initPublicationFilter,
    initNewsPaging,
    initNewBadges,
    initLightbox,
    initFigureLoading,
    initEmailCopy,
    initArrivalHighlight,
    initBackToTop,
    initScrollReveal
  ].forEach(function (init) { init(); });
})();
