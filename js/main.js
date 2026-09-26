/* BR1 — comportamenti comuni a tutte le pagine */
(function () {
  'use strict';

  /* --- anno corrente nel footer --- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- header compatto + barra di avanzamento --- */
  var head = document.querySelector('.site-head');
  var bar = document.querySelector('.progress');
  function onScroll() {
    if (head) head.classList.toggle('is-stuck', window.scrollY > 40);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? window.scrollY / h : 0) + ')';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- chiude il menu mobile dopo il click --- */
  var toggle = document.getElementById('nav-toggle');
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { if (toggle) toggle.checked = false; });
  });

  /* --- rivelazione allo scorrimento --- */
  var targets = document.querySelectorAll('.reveal, .mask, .ink-line');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  /* --- griglia lavori sempre rettangolare ---
     se l'ultima riga non e' piena, le ultime foto si allargano
     fino a chiudere il rettangolo */
  var grids = document.querySelectorAll('.works');
  function fillGrid(grid) {
    var items = Array.prototype.filter.call(grid.children, function (w) {
      return !w.classList.contains('is-hidden');
    });
    Array.prototype.forEach.call(grid.children, function (w) { w.style.gridColumn = ''; });
    var cs = getComputedStyle(grid);
    if (cs.display !== 'grid' || !items.length) return;
    var cols = cs.gridTemplateColumns.split(' ').filter(Boolean).length;
    var r = items.length % cols;
    if (!r) return;
    var extra = cols - r;
    var last = items.slice(-r);
    last.forEach(function (w, i) {
      var span = 1 + Math.floor(extra / r) + (i < extra % r ? 1 : 0);
      if (span > 1) w.style.gridColumn = 'span ' + span;
    });
  }
  function fillAll() { grids.forEach(fillGrid); }
  fillAll();
  var rz;
  window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(fillAll, 120); });

  /* --- filtri della galleria --- */
  var chips = document.querySelectorAll('[data-filter]');
  var works = document.querySelectorAll('.work');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.classList.toggle('is-on', c === chip); });
      works.forEach(function (w) {
        var show = f === 'tutti' || w.getAttribute('data-style') === f;
        w.classList.toggle('is-hidden', !show);
        if (show) w.classList.add('in');
      });
      fillAll();
    });
  });

  /* --- mappa caricata solo dopo il consenso (nessun cookie prima) --- */
  document.querySelectorAll('[data-map]').forEach(function (box) {
    var btn = box.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', function () {
      box.innerHTML = '<iframe title="Mappa dello studio BR1" loading="lazy" '
        + 'referrerpolicy="no-referrer-when-downgrade" '
        + 'src="https://www.google.com/maps?q=Via%20Palmino%20Sterzi%2041&output=embed"></iframe>';
      box.classList.add('is-on');
    });
  });

  /* --- preventivo indicativo --- */
  var calc = document.getElementById('calc');
  if (calc) {
    var out = document.getElementById('calc-out');
    var range = document.getElementById('calc-range');
    var label = document.getElementById('calc-time');
    var update = function () {
      var size = +calc.querySelector('[name=misura]').value;      // ore base
      var stile = +calc.querySelector('[name=stile]').value;      // moltiplicatore
      var zona = +calc.querySelector('[name=zona]').value;        // moltiplicatore
      var colore = +calc.querySelector('[name=colore]').value;    // moltiplicatore
      var ore = size * stile * zona * colore;
      var basso = Math.round((80 + ore * 70) / 10) * 10;
      var alto = Math.round((80 + ore * 105) / 10) * 10;
      out.textContent = '€' + basso + ' – €' + alto;
      label.textContent = ore < 1.2
        ? 'circa 1 seduta breve'
        : ore < 4 ? 'circa ' + Math.ceil(ore) + ' ore, 1 seduta'
          : 'circa ' + Math.ceil(ore) + ' ore, ' + Math.ceil(ore / 4) + ' sedute';
      if (range) range.value = ore.toFixed(1);
    };
    calc.querySelectorAll('select').forEach(function (s) { s.addEventListener('change', update); });
    update();
  }

  /* --- form prenotazione: compone l'email --- */
  var form = document.getElementById('booking');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var d = new FormData(form);
      var corpo = [
        'Nome: ' + (d.get('nome') || ''),
        'Telefono: ' + (d.get('telefono') || ''),
        'Email: ' + (d.get('email') || ''),
        'Stile: ' + (d.get('stile') || ''),
        'Zona del corpo: ' + (d.get('zona') || ''),
        'Misura indicativa: ' + (d.get('misura') || ''),
        'Prima volta: ' + (d.get('prima') || ''),
        '',
        'Idea:',
        (d.get('idea') || '')
      ].join('\n');
      window.location.href = 'mailto:studiomenny.web@gmail.com'
        + '?subject=' + encodeURIComponent('Richiesta appuntamento — ' + (d.get('nome') || 'BR1'))
        + '&body=' + encodeURIComponent(corpo);
      var msg = document.getElementById('booking-msg');
      if (msg) msg.hidden = false;
    });
  }
})();
