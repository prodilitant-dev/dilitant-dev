export function createButton({ label, onClick, variant = 'secondary', disabled = false }) {
  const btn = document.createElement('button');
  btn.className = `ui-button ui-button--${variant}`;
  btn.textContent = label;
  btn.disabled = disabled;
  btn.type = 'button';
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}
