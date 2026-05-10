export function PortalPage(container) {
  container.innerHTML = `
    <h1>Dilitant-dev</h1>
    <div class="portal-nav">
      <button class="oval-btn" id="btn-showcase">Подвал</button>
      <button class="oval-btn" id="btn-playground">Полигон</button>
    </div>
  `;

  document.getElementById('btn-showcase').addEventListener('click', () => {
    window.location.hash = '#/showcase';
  });
  document.getElementById('btn-playground').addEventListener('click', () => {
    window.location.hash = '#/playground';
  });
}
