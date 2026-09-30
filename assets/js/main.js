/* Compartilhado por index.html e pages/. Cada bloco só age se o elemento existir. */

/* ── Menu mobile (hambúrguer) ───────────────────────────────────── */
const nav = document.querySelector('.site-nav');
const navToggle = document.querySelector('.nav-toggle');
if (nav && navToggle) {
  const setOpen = open => {
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  navToggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
}

/* ── Animações de entrada ───────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Prévia da linha do tempo (home) ────────────────────────────────
   O .webp fica por baixo como pôster e some quando o iframe carrega.
   Se o load não vier em 8 s depois que o iframe começa a carregar
   (ele é lazy), o pôster permanece e o botão fica fixo sobre ele. */
const ldt = document.querySelector('.ldt-preview');
if (ldt) {
  const frame = ldt.querySelector('iframe');
  let timer = null;
  frame.addEventListener('load', () => {
    clearTimeout(timer);
    ldt.classList.remove('is-fallback');
    ldt.classList.add('is-loaded');
  });
  const startObs = new IntersectionObserver(entries => {
    if (!entries.some(e => e.isIntersecting)) return;
    startObs.disconnect();
    timer = setTimeout(() => {
      if (!ldt.classList.contains('is-loaded')) ldt.classList.add('is-fallback');
    }, 8000);
  }, { rootMargin: '200px' });
  startObs.observe(ldt);
}
