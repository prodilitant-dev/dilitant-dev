export function initGlowTitle(container, { text, tag = 'h1' } = {}) {
  if (!container) return;
  const el = document.createElement(tag);
  el.textContent = text || '';
  el.style.fontSize = '2rem';
  el.style.fontWeight = '400';
  el.style.color = 'var(--accent)';
  el.style.fontFamily = 'monospace';
  el.style.textAlign = 'center';
  el.style.margin = '0';
  el.style.animation = 'titleGlow 2s ease-in-out infinite';
  container.appendChild(el);
}
