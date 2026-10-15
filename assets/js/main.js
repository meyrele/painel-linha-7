/* Compartilhado por index.html e pages/. Cada bloco só age se o elemento existir. */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Viúvas: fallback para navegadores sem text-wrap: balance ────────
   Em títulos com mais de três palavras, o último espaço vira espaço
   inquebrável, e as duas últimas palavras descem juntas. Opera só no
   último nó de texto que tem espaço, sem achatar os <span> de cor. */
if (!(window.CSS && CSS.supports('text-wrap', 'balance'))) {
  document.querySelectorAll('h1, h2, h3, .hero-subtitle, .page-subtitle, .row-title, .lesson-title, .estrategia summary').forEach(el => {
    if (el.textContent.trim().split(/\s+/).length <= 3) return;
    const nos = [];
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) nos.push(w.currentNode);
    // do fim para o começo: o primeiro espaço encontrado depois de já ter passado por uma palavra
    let viuPalavra = false;
    for (let i = nos.length - 1; i >= 0; i--) {
      const v = nos[i].nodeValue;
      for (let j = v.length - 1; j >= 0; j--) {
        if (!/\s/.test(v[j])) { viuPalavra = true; continue; }
        if (viuPalavra) {
          nos[i].nodeValue = v.slice(0, j) + '\u00a0' + v.slice(j + 1);
          return;
        }
      }
    }
  });
}

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

/* ── Submenu "Sobre" ────────────────────────────────────────────────
   "Sobre" é link para o-projeto.html (clique e Enter navegam). O submenu
   abre ao passar o mouse (CSS) e ao focar pelo teclado (:focus-within);
   ↓/↑ percorrem os subitens, Esc fecha e devolve o foco a "Sobre".
   No menu hambúrguer os subitens ficam sempre visíveis, indentados. */
const sub = document.querySelector('.nav-sub');
if (sub) {
  const link = sub.querySelector('.nav-sub-toggle');
  const itens = [...sub.querySelectorAll('.nav-submenu a')];
  const hamburguer = window.matchMedia('(max-width: 1100px)');
  const comHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const sync = () => {
    const aberto = hamburguer.matches ||
      (sub.matches(':focus-within') && !sub.classList.contains('is-dismissed')) ||
      (comHover.matches && sub.matches(':hover'));
    link.setAttribute('aria-expanded', String(aberto));
  };
  sub.addEventListener('keydown', e => {
    const pos = itens.indexOf(document.activeElement);  // -1 quando o foco está em "Sobre"
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      sub.classList.remove('is-dismissed');
      itens[Math.min(pos + 1, itens.length - 1)].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      (pos <= 0 ? link : itens[pos - 1]).focus();
    } else if (e.key === 'Escape') {
      sub.classList.add('is-dismissed');
      link.focus();
    } else {
      return;
    }
    sync();
  });
  sub.addEventListener('focusout', e => {
    if (!sub.contains(e.relatedTarget)) sub.classList.remove('is-dismissed');
    requestAnimationFrame(sync);
  });
  ['focusin', 'mouseenter', 'mouseleave'].forEach(ev => sub.addEventListener(ev, () => requestAnimationFrame(sync)));
  hamburguer.addEventListener('change', sync);
  sync();
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

/* ── Barra de âncoras (página O projeto) ────────────────────────────
   Marca como ativo o botão da seção que ocupa o topo da área visível
   (logo abaixo da navbar e da própria barra). */
const anchorBar = document.querySelector('.anchor-bar');
if (anchorBar) {
  const links = [...anchorBar.querySelectorAll('a[href^="#"]')];
  const secoes = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  let ativo = null;
  const marcar = () => {
    const corte = anchorBar.getBoundingClientRect().bottom + 24;
    let atual = secoes[0];
    secoes.forEach(s => { if (s.getBoundingClientRect().top <= corte) atual = s; });
    // no fim da página, a última seção pode não chegar ao topo: marca-a mesmo assim
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) atual = secoes[secoes.length - 1];
    if (atual === ativo) return;
    ativo = atual;
    links.forEach(a => {
      const on = a.getAttribute('href') === '#' + atual.id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
    // no celular a barra rola na horizontal: mantém o botão ativo à vista
    const a = links.find(l => l.classList.contains('is-active'));
    const ul = anchorBar.querySelector('ul');
    if (a && ul.scrollWidth > ul.clientWidth) ul.scrollTo({ left: a.offsetLeft - 16, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  let pendente = false;
  window.addEventListener('scroll', () => {
    if (pendente) return;
    pendente = true;
    requestAnimationFrame(() => { pendente = false; marcar(); });
  }, { passive: true });
  window.addEventListener('resize', marcar);
  marcar();
}
