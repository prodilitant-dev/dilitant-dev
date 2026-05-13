import './ConfirmDialog.css';

export function showConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  danger = false
}) {
  const overlay = document.createElement('div');
  overlay.className = 'confirm-overlay';

  const box = document.createElement('div');
  box.className = 'confirm-box';

  const titleEl = document.createElement('h3');
  titleEl.className = 'confirm-title';
  titleEl.textContent = title;

  const msgEl = document.createElement('p');
  msgEl.className = 'confirm-message';
  msgEl.textContent = message;

  const btnContainer = document.createElement('div');
  btnContainer.className = 'confirm-buttons';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'ui-button';
  cancelBtn.textContent = cancelText;
  cancelBtn.addEventListener('click', () => {
    close();
    if (onCancel) onCancel();
  });

  const confirmBtn = document.createElement('button');
  confirmBtn.className = 'ui-button' + (danger ? ' ui-button--danger' : ' ui-button--primary');
  confirmBtn.textContent = confirmText;
  confirmBtn.addEventListener('click', () => {
    close();
    if (onConfirm) onConfirm();
  });

  btnContainer.appendChild(cancelBtn);
  btnContainer.appendChild(confirmBtn);
  box.appendChild(titleEl);
  box.appendChild(msgEl);
  box.appendChild(btnContainer);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  requestAnimationFrame(() => overlay.classList.add('confirm-overlay--show'));

  function close() {
    overlay.classList.remove('confirm-overlay--show');
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 200);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      close();
      if (onCancel) onCancel();
    }
  });

  return { close };
}
