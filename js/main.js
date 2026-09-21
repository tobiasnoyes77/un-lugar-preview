/* Fundación Un Lugar — homepage preview
   Minimal, dependency-free behaviour: mobile navigation, submenu disclosure,
   click-to-play YouTube (no autoplay before interaction),
   current year. Everything works without JS except the video (which then links
   to YouTube) and the submenus (which stay closed — links remain in the footer). */
(function () {
  'use strict';

  var desktopQuery = window.matchMedia('(min-width: 64em)');

  /* ---------- Mobile navigation toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('is-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !desktopQuery.matches) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Submenu disclosure (Quiénes somos, Nuestro trabajo) ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.nav__item--has-sub'));

  function closeItem(item) {
    item.classList.remove('is-open');
    var button = item.querySelector('.nav__sub-toggle');
    if (button) button.setAttribute('aria-expanded', 'false');
  }

  function closeAll(except) {
    items.forEach(function (item) { if (item !== except) closeItem(item); });
  }

  items.forEach(function (item) {
    var button = item.querySelector('.nav__sub-toggle');
    if (!button) return;
    button.addEventListener('click', function () {
      var open = item.classList.contains('is-open');
      if (desktopQuery.matches) closeAll(item);
      item.classList.toggle('is-open', !open);
      button.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    item.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && item.classList.contains('is-open')) {
        event.stopPropagation();
        closeItem(item);
        button.focus();
      }
    });
    // On desktop, close the dropdown when focus leaves it (Tab past the last link).
    item.addEventListener('focusout', function (event) {
      if (desktopQuery.matches && !item.contains(event.relatedTarget)) closeItem(item);
    });
  });

  // Click outside closes desktop dropdowns and the mobile panel.
  document.addEventListener('click', function (event) {
    var header = document.querySelector('.site-header');
    if (header && !header.contains(event.target)) {
      closeAll();
      if (!desktopQuery.matches) setMenu(false);
    }
  });

  /* ---------- Click-to-play video (YouTube, privacy-enhanced embed) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.video__play'), function (button) {
    button.addEventListener('click', function () {
      var id = button.getAttribute('data-video-id');
      var title = button.getAttribute('data-video-title') || 'Video';
      if (!id) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      iframe.title = title;
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      var wrapper = button.parentNode;
      wrapper.replaceChild(iframe, button);
      iframe.focus();
    });
  });

  /* ---------- Current year in the copyright line ---------- */
  var year = document.getElementById('anio-actual');
  if (year) year.textContent = String(new Date().getFullYear());
})();
