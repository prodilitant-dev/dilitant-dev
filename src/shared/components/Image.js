/**
 * Создаёт элемент изображения с плейсхолдером.
 * @param {Object} options
 * @param {string} [options.src=''] - URL или data-uri картинки. Если пусто — показывается заглушка.
 * @param {string} [options.alt=''] - альтернативный текст
 * @param {string} [options.placeholderText='🖼️'] - текст заглушки (или эмодзи)
 * @returns {HTMLDivElement} корневой контейнер с img или заглушкой
 */
export function createImage({ src = '', alt = '', placeholderText = '🖼️' } = {}) {
  const container = document.createElement('div');
  container.className = 'ui-image';

  // Если есть src, показываем картинку
  if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'ui-image__img';
    img.onerror = () => {
      // При ошибке загрузки показываем заглушку
      container.innerHTML = '';
      container.classList.add('ui-image--placeholder');
      container.textContent = placeholderText;
    };
    container.appendChild(img);
    return container;
  }

  // Заглушка
  container.classList.add('ui-image--placeholder');
  container.textContent = placeholderText;
  return container;
}
