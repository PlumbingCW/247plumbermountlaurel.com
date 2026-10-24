/* Mount Laurel 24/7 Plumbing - main.js */
(function () {
  var BP = 768;
  var root = document.documentElement;
  var toggle = document.getElementById('mob-toggle');
  var drawer = document.getElementById('mob-drawer');
  var overlay = document.getElementById('mob-overlay');
  var closeBtn = document.getElementById('mob-close');

  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('open', open);
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    root.classList.toggle('lock', open);
    if (open && closeBtn) closeBtn.focus();
    if (!open && toggle) toggle.focus();
  }
  if (toggle) toggle.addEventListener('click', function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });
  if (overlay) overlay.addEventListener('click', function () { setDrawer(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) setDrawer(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > BP && drawer && drawer.classList.contains('open')) setDrawer(false);
  });

  var qs = document.querySelectorAll('.faq-q');
  Array.prototype.forEach.call(qs, function (q) {
    q.addEventListener('click', function () {
      var ans = document.getElementById(q.getAttribute('aria-controls'));
      var open = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (ans) ans.classList.toggle('open', !open);
    });
  });

  var sticky = document.querySelector('.sticky-cta');
  var footer = document.querySelector('.site-footer');
  if (sticky && footer && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { sticky.classList.toggle('is-hidden', en.isIntersecting); });
    }, { threshold: 0.05 });
    io.observe(footer);
  }
})();
