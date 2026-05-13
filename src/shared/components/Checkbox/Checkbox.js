import './Checkbox.css';

export function createCheckbox({ label, checked = false, onChange } = {}) {
  const container = document.createElement('label');
  container.className = 'ui-checkbox';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.className = 'ui-checkbox__input';
  const text = document.createElement('span');
  text.textContent = label;
  container.appendChild(input);
  container.appendChild(text);
  if (onChange) input.addEventListener('change', (e) => onChange(e.target.checked));
  return container;
}
