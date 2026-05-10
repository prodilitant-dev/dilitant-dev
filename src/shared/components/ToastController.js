let toastContainer = null;

/**
 * Показать уведомление-тост (одно одновременно).
 * @param {string} message - текст
 * @param {'success'|'error'|'info'} [type='info'] - тип
 * @param {number} [duration=3000] - время показа в мс
 */
export function showToast(message, type = 'info', duration = 3000) {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  // Удаляем предыдущий тост
  while (toastContainer.firstChild) {
    toastContainer.firstChild.remove();
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;

  toast.addEventListener('click', () => removeToast(toast));
  toastContainer.appendChild(toast);

  setTimeout(() => removeToast(toast), duration);

  function removeToast(el) {
    if (el && el.parentNode === toastContainer) {
      el.remove();
    }
  }
}
