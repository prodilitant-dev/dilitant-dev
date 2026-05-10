export function createTextarea({ placeholder = '', value = '', rows = 4, onChange } = {}) {
  const textarea = document.createElement('textarea');
  textarea.className = 'ui-textarea';
  textarea.placeholder = placeholder;
  textarea.rows = rows;
  textarea.value = value;
  if (onChange) textarea.addEventListener('input', (e) => onChange(e.target.value));
  return textarea;
}
