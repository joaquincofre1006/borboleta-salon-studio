// ===== BORBOLETA SALÓN STUDIO — SCRIPT =====
// Estructura de datos escalable: agregar una nueva profesional o categoría
// solo requiere sumar un objeto al arreglo CATEGORIES de más abajo.

(function () {

  // ---------- NÚMEROS DE WHATSAPP POR PROFESIONAL ----------
  var WA = {
    cabello: '56974070491',
    belleza: '56966717174'
  };

  // ---------- CATEGORÍAS Y SERVICIOS (solo datos reales confirmados) ----------
  var CATEGORIES = [
    {
      id: 'cabello',
      label: 'Cabello',
      professional: WA.cabello,
      services: [
        { name: 'Balayage', price: 49900, from: true },
        { name: 'Visos o mechas con papel', price: 39990, from: true },
        { name: 'Tonos fantasía', price: 25000, from: true },
        { name: 'Macrolights', price: 29990, from: true },
        { name: 'Highlights', price: 39990, from: true },
        { name: 'Babylights', price: 49990, from: true },
        { name: 'Lavado + masaje + corte + brushing', price: 19990, from: false },
        { name: 'Lavado + corte + brushing', price: 14990, from: false },
        { name: 'Color crecimiento', price: 30000, from: false },
        { name: 'Color global', price: 35000, from: false },
        { name: 'Tratamientos capilares', price: 24990, from: true },
        { name: 'Alisados permanentes', price: 25000, from: true }
      ]
    },
    {
      id: 'cosmetologia',
      label: 'Cosmetología',
      professional: WA.belleza,
      services: [
        { name: 'Limpieza facial básica', price: 20000, from: true },
        { name: 'Limpieza facial avanzada', price: 28000, from: true },
        { name: 'Asesoría de rutina de skincare y diagnóstico de piel', price: 8000, from: false }
      ]
    },
    {
      id: 'masoterapia',
      label: 'Masoterapia',
      professional: WA.belleza,
      services: [
        { name: 'Sesión reductiva abdomen-cintura-espalda', price: 15000, from: false, note: 'Cada sesión' },
        { name: 'Drenaje linfático + sesión reductiva', price: 22000, from: false, note: 'Abdomen-cintura-espalda · cada sesión' }
      ]
    },
    {
      id: 'cejas',
      label: 'Cejas',
      professional: WA.belleza,
      services: [
        { name: 'Perfilado de cejas', price: 9000, from: false },
        { name: 'Perfilado de cejas + tinte', price: 13000, from: false }
      ]
    },
    {
      id: 'pestanas',
      label: 'Pestañas',
      professional: WA.belleza,
      services: [
        { name: 'Lifting de pestañas', price: 18000, from: false }
      ]
    },
    {
      id: 'maquillaje',
      label: 'Maquillaje',
      professional: WA.belleza,
      services: [
        { name: 'Maquillaje social / editorial', price: 28000, from: true }
      ]
    },
    {
      id: 'peinados',
      label: 'Peinados',
      professional: null,
      services: []
    },
    {
      id: 'depilacion',
      label: 'Depilación',
      professional: null,
      services: []
    }
  ];

  // ---------- GALERÍA (solo fotografías reales) ----------
  var GALLERY = [
    {
      category: 'cabello',
      src: 'assets/img/trabajo-balayage-rojo.jpg',
      alt: 'Coloración fantasía en tonos rojo borgoña realizada en Borboleta Salón Studio'
    }
  ];
  var GALLERY_CATEGORIES = [
    { id: 'todos', label: 'Todos' },
    { id: 'cabello', label: 'Cabello' },
    { id: 'cosmetologia', label: 'Cosmetología' },
    { id: 'cejas', label: 'Cejas' },
    { id: 'pestanas', label: 'Pestañas' },
    { id: 'maquillaje', label: 'Maquillaje' }
  ];

  // ---------- HELPERS ----------
  function formatCLP(n) {
    return '$' + n.toLocaleString('es-CL');
  }

  function waLink(number, message) {
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  }

  function bookingMessage(serviceName) {
    return 'Hola, vi la página de Borboleta y quisiera reservar una hora para ' + serviceName + '.';
  }

  // ---------- RENDER: TABS + TARJETAS DE SERVICIOS ----------
  function renderServices() {
    var tabsEl = document.getElementById('serviceTabs');
    var panelsEl = document.getElementById('servicePanels');
    if (!tabsEl || !panelsEl) return;

    CATEGORIES.forEach(function (cat, index) {
      // Botón de tab
      var tabBtn = document.createElement('button');
      tabBtn.type = 'button';
      tabBtn.className = 'tab-btn' + (index === 0 ? ' active' : '');
      tabBtn.textContent = cat.label;
      tabBtn.setAttribute('data-tab', cat.id);
      tabBtn.setAttribute('role', 'tab');
      tabBtn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      tabsEl.appendChild(tabBtn);

      // Panel de servicios
      var panel = document.createElement('div');
      panel.className = 'service-panel' + (index === 0 ? ' active' : '');
      panel.setAttribute('data-panel', cat.id);
      panel.setAttribute('role', 'tabpanel');

      if (cat.services.length === 0) {
        var empty = document.createElement('div');
        empty.className = 'service-empty';
        empty.innerHTML = '<p>Próximamente disponible en esta categoría.</p><a href="https://instagram.com/borboleta_salon" target="_blank" rel="noopener" class="btn-outline-dark btn-sm">Síguenos para novedades</a>';
        panel.appendChild(empty);
      } else {
        var list = document.createElement('ul');
        list.className = 'servicios-list servicios-list--cards';

        cat.services.forEach(function (s) {
          var li = document.createElement('li');
          li.className = 'service-card';

          var info = document.createElement('div');
          info.className = 'service-card-info';

          var nameEl = document.createElement('p');
          nameEl.className = 'serv-name';
          nameEl.textContent = s.name;
          if (s.from) {
            var em = document.createElement('em');
            em.textContent = 'desde';
            nameEl.appendChild(document.createTextNode(' '));
            nameEl.appendChild(em);
          }
          info.appendChild(nameEl);

          if (s.note) {
            var noteEl = document.createElement('p');
            noteEl.className = 'serv-note';
            noteEl.textContent = s.note;
            info.appendChild(noteEl);
          }

          var priceEl = document.createElement('span');
          priceEl.className = 'serv-price';
          priceEl.textContent = formatCLP(s.price);

          var bookBtn = document.createElement('a');
          bookBtn.className = 'btn-reservar-mini';
          bookBtn.href = waLink(cat.professional, bookingMessage(s.name));
          bookBtn.target = '_blank';
          bookBtn.rel = 'noopener';
          bookBtn.textContent = 'Reservar';

          var right = document.createElement('div');
          right.className = 'service-card-right';
          right.appendChild(priceEl);
          right.appendChild(bookBtn);

          li.appendChild(info);
          li.appendChild(right);
          list.appendChild(li);
        });

        panel.appendChild(list);
      }

      panelsEl.appendChild(panel);
    });

    // Interacción de tabs
    tabsEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.tab-btn');
      if (!btn) return;
      var target = btn.getAttribute('data-tab');

      tabsEl.querySelectorAll('.tab-btn').forEach(function (b) {
        var isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      panelsEl.querySelectorAll('.service-panel').forEach(function (p) {
        p.classList.toggle('active', p.getAttribute('data-panel') === target);
      });
    });
  }

  // ---------- RENDER: GALERÍA CON FILTRO ----------
  function renderGallery() {
    var tabsEl = document.getElementById('galleryTabs');
    var contentEl = document.getElementById('galleryContent');
    if (!tabsEl || !contentEl) return;

    GALLERY_CATEGORIES.forEach(function (cat, index) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gtab-btn' + (index === 0 ? ' active' : '');
      btn.textContent = cat.label;
      btn.setAttribute('data-gtab', cat.id);
      tabsEl.appendChild(btn);
    });

    function renderFor(catId) {
      contentEl.innerHTML = '';
      var items = catId === 'todos' ? GALLERY : GALLERY.filter(function (g) { return g.category === catId; });

      if (items.length === 0) {
        var empty = document.createElement('div');
        empty.className = 'trabajo-empty';
        empty.innerHTML = '<p>Aún no tenemos fotografías en esta categoría. Muy pronto sumaremos más trabajos reales.</p><a href="https://instagram.com/borboleta_salon" target="_blank" rel="noopener" class="btn btn-outline-dark">Síguenos en Instagram</a>';
        contentEl.appendChild(empty);
        return;
      }

      items.forEach(function (item) {
        var frame = document.createElement('figure');
        frame.className = 'trabajo-frame';
        var img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.loading = 'lazy';
        frame.appendChild(img);
        contentEl.appendChild(frame);
      });

      var caption = document.createElement('div');
      caption.className = 'trabajo-caption';
      caption.innerHTML = '<p>¿Quieres ver más transformaciones?</p><a href="https://instagram.com/borboleta_salon" target="_blank" rel="noopener" class="btn btn-outline-dark">Síguenos en Instagram</a>';
      contentEl.appendChild(caption);
    }

    renderFor('todos');

    tabsEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.gtab-btn');
      if (!btn) return;
      tabsEl.querySelectorAll('.gtab-btn').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      renderFor(btn.getAttribute('data-gtab'));
    });
  }

  // ---------- SELECTOR FLOTANTE DE WHATSAPP ----------
  function initWaWidget() {
    var floatBtn = document.getElementById('waFloatBtn');
    var panel = document.getElementById('waPanel');
    if (!floatBtn || !panel) return;

    function togglePanel(show) {
      var willShow = typeof show === 'boolean' ? show : panel.hidden;
      panel.hidden = !willShow;
      floatBtn.setAttribute('aria-expanded', willShow ? 'true' : 'false');
    }

    floatBtn.addEventListener('click', function () {
      togglePanel();
    });

    panel.querySelectorAll('.wa-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        var number = opt.getAttribute('data-wa');
        var msg = opt.getAttribute('data-msg');
        window.open(waLink(number, msg), '_blank', 'noopener');
        togglePanel(false);
      });
    });

    // Cualquier otro disparador en la página (hero, servicios) abre el mismo panel
    document.querySelectorAll('.wa-trigger').forEach(function (trigger) {
      if (trigger.id === 'waFloatBtn') return;
      trigger.addEventListener('click', function () {
        document.getElementById('waWidget').scrollIntoView({ behavior: 'smooth', block: 'end' });
        togglePanel(true);
      });
    });

    document.addEventListener('click', function (e) {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== floatBtn && !floatBtn.contains(e.target)) {
        togglePanel(false);
      }
    });
  }

  // ---------- MENÚ MÓVIL ----------
  function initMobileMenu() {
    var menuToggle = document.getElementById('menuToggle');
    var nav = document.getElementById('nav');
    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', function () {
      var isActive = nav.classList.toggle('active');
      menuToggle.classList.toggle('active', isActive);
      menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- ANIMACIÓN AL HACER SCROLL ----------
  function initReveal() {
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) { observer.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  // ---------- INIT ----------
  document.addEventListener('DOMContentLoaded', function () {
    renderServices();
    renderGallery();
    initWaWidget();
    initMobileMenu();
    initReveal();

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

})();
