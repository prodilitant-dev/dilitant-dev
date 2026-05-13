import './FsStatusIndicator.css';

export function initFsIndicator(container, { currentWorld = '' } = {}) {
  if (!container) return;
  container.innerHTML = `
    <div class="storage-status">
      <span class="led" id="statusLed"></span>
      <span id="statusText">Хранилище: песочница</span>
    </div>
  `;
  const led = document.getElementById('statusLed');
  if (led) {
    led.style.background = 'var(--success)';
    led.style.boxShadow = '0 0 4px var(--success)';
  }
}
