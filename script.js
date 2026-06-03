/* ============================================================
   Header: shadow ao rolar
   ============================================================ */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

/* ============================================================
   Menu mobile
   ============================================================ */
const toggle = document.querySelector('.nav__toggle');
const nav    = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

// Fecha o menu ao clicar em um link
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });
});

/* ============================================================
   Link ativo no nav (IntersectionObserver)
   ============================================================ */
const sections  = document.querySelectorAll('main section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const observerOpts = { rootMargin: '-50% 0px -45% 0px', threshold: 0 };
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, observerOpts);

sections.forEach(s => sectionObserver.observe(s));

/* ============================================================
   Lightbox da galeria
   ============================================================ */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxBg      = document.getElementById('lightboxBackdrop');

function openLightbox(src, alt, caption) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightboxCaption.textContent = caption || '';
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery__item').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = btn.dataset.src || img.src;
    openLightbox(src, btn.dataset.alt || img.alt, btn.dataset.caption);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBg.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});
