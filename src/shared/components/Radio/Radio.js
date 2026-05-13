import './Radio.css';

export function createRadio({ name, value, label, checked = false, onChange } = {}) {
  const container = document.createElement('label');
  container.className = 'ui-radio';
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = name;
  input.value = value;
  input.checked = checked;
  input.className = 'ui-radio__input';
  const text = document.createElement('span');
  text.textContent = label;
  container.appendChild(input);
  container.appendChild(text);
  if (onChange) input.addEventListener('change', (e) => { if (e.target.checked) onChange(e.target.value); });
  return container;
}
