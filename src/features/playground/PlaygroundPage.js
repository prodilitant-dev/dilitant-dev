export function PlaygroundPage(container) {
  container.innerHTML = '';
  const area = document.createElement('div');
  area.id = 'playground-area';
  area.style.minHeight = '300px';
  area.style.border = '1px solid var(--border)';
  area.style.borderRadius = '12px';
  area.style.padding = '1rem';
  area.textContent = 'Полигон — свободная зона для экспериментов';
  container.appendChild(area);
}
