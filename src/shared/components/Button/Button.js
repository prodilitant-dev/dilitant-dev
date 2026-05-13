import './Button.css';

const VARIANT_MAP = {
  primary: 'oval-btn',
  secondary: 'sub-tab',
  danger: 'sub-tab',
};

export function createButton({ label, onClick, variant = 'secondary', disabled = false }) {
  const btn = document.createElement('button');
  const cssClass = VARIANT_MAP[variant] || 'sub-tab';
  btn.className = cssClass;
  btn.textContent = label;
  btn.disabled = disabled;
  btn.type = 'button';
  if (onClick) {
    btn.addEventListener('click', onClick);
  }
  return btn;
}
