/* Compartilhado por index.html e pages/. Cada bloco só age se o elemento existir. */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

/* ── Fios e linhas (D2) ─────────────────────────────────────────────
   Cada [data-reveal] recebe .in uma única vez ao entrar na viewport:
   os fios desenham (scaleX) e os [data-item] entram escalonados.
   --i dá a ordem: nas .rows vai no <li> (fio e conteúdo herdam). */
const reveals = document.querySelectorAll('[data-reveal]');
reveals.forEach(group => {
  const units = group.matches('.rows') ? group.children : group.querySelectorAll('[data-item]');
  [...units].forEach((el, i) => el.style.setProperty('--i', i));
});
if (reveals.length) {
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObs.observe(el));
}

/* ── Contadores do hero (D3) ────────────────────────────────────────
   Sobem de 0 ao valor em 900 ms na primeira entrada na viewport.
   O HTML já traz o valor final: sem JS ou com reduced-motion, fica como está. */
const counters = document.querySelectorAll('[data-count]');
if (counters.length && !reduceMotion) {
  const DURACAO = 900;
  const ATRASO = 240;  // mesmo atraso da entrada dos indicadores no hero (home.css)
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const run = async el => {
    const alvo = Number(el.dataset.count);
    // fixa a largura do valor final (os algarismos da Playfair têm larguras diferentes);
    // mede só com a fonte carregada, trocando o texto no mesmo quadro
    await document.fonts.ready;
    el.textContent = alvo;
    el.style.minWidth = el.getBoundingClientRect().width + 'px';
    el.textContent = '0';
    const t0 = performance.now() + ATRASO;
    const tick = now => {
      const t = Math.max(0, Math.min(1, (now - t0) / DURACAO));
      el.textContent = Math.round(alvo * easeOut(t));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  counters.forEach(el => { el.textContent = '0'; });
  const countObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      run(e.target);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObs.observe(el));
}

/* ── Prévia da linha do tempo (home) ────────────────────────────────
   O .webp fica por baixo como pôster e some quando o iframe carrega.
   Se o load não vier em 8 s depois que o iframe começa a carregar
   (ele é lazy), o pôster permanece e o botão vai para o centro. */
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
