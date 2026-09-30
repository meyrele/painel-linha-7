function openZoom() {
  document.getElementById('zoomOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeZoom() {
  document.getElementById('zoomOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeZoom(); });

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
