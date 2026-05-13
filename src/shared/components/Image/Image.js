import './Image.css';

export function createImage({ src = '', alt = '', placeholderText = '🖼️' } = {}) {
  const container = document.createElement('div');
  container.className = 'ui-image';

  if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'ui-image__img';
    img.onerror = () => {
      container.innerHTML = '';
      container.classList.add('ui-image--placeholder');
      container.textContent = placeholderText;
    };
    container.appendChild(img);
    return container;
  }

  container.classList.add('ui-image--placeholder');
  container.textContent = placeholderText;
  return container;
}
