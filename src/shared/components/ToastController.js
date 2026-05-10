/** @type {HTMLElement|null} */
let toastContainer = null;

function ensureContainer() {
  if (!toastContainer || !toastContainer.isConnected) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
}

/**
 * Показать уведомление-тост (одно одновременно).
 * @param {string} message - текст
 * @param {'success'|'error'|'info'} [type='info'] - тип
 * @param {number} [duration=3000] - время показа в мс
 */
export function showToast(message, type = 'info', duration = 3000) {
  ensureContainer();

  // Удаляем предыдущий тост
  while (toastContainer.firstChild) {
    toastContainer.firstChild.remove();
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;

  toast.addEventListener('click', () => {
    removeToast(toast);
  });

  toastContainer.appendChild(toast);

  const timer = setTimeout(() => {
    removeToast(toast);
  }, duration);

  function removeToast(el) {
    clearTimeout(timer);
    if (el && el.parentNode === toastContainer) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      el.addEventListener('transitionend', () => {
        if (el.parentNode === toastContainer) {
          el.remove();
        }
      }, { once: true });
    }
  }
}
