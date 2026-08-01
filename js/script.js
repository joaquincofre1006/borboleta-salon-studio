// ===== BORBOLETA SALÓN STUDIO — SCRIPT =====

document.addEventListener('DOMContentLoaded', function () {

  // --- Menú móvil ---
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const isActive = nav.classList.toggle('active');
      menuToggle.classList.toggle('active', isActive);
      menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Cerrar el menú al hacer clic en un link
    document.querySelectorAll('.nav-link, .nav .btn-reservar').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Animación al hacer scroll (fade-in suave) ---
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: si no hay soporte, mostrar todo directamente
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // --- Año automático en el footer ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
