export function createInput({ placeholder = '', type = 'text', value = '', onChange } = {}) {
  const input = document.createElement('input');
  input.className = 'ui-input';
  input.type = type;
  input.placeholder = placeholder;
  input.value = value;
  if (onChange) input.addEventListener('input', (e) => onChange(e.target.value));
  return input;
}
