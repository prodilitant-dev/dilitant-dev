export function createToggle({ checked = false, onChange } = {}) {
  const container = document.createElement('label');
  container.className = 'ui-toggle';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.className = 'ui-toggle__input';
  const track = document.createElement('span');
  track.className = 'ui-toggle__track';
  const thumb = document.createElement('span');
  thumb.className = 'ui-toggle__thumb';
  track.appendChild(thumb);
  container.appendChild(input);
  container.appendChild(track);
  if (onChange) input.addEventListener('change', (e) => onChange(e.target.checked));
  return container;
}
