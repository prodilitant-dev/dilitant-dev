import { HashRouter } from '@core/router';
import { initTheme } from '@core/theme';
import { PortalPage } from '@features/portal/PortalPage';
import { ShowcasePage } from '@features/showcase/ShowcasePage';
import { PlaygroundPage } from '@features/playground/PlaygroundPage';
import { initThemeSwitcher } from '@shared/components/ThemeSwitcher';

initTheme();

const workspace = document.getElementById('workspace');
const startContent = document.getElementById('startContent');
const searchContainer = document.getElementById('globalSearchContainer');
const fsIndicator = document.getElementById('fsIndicatorContainer');
const themeSwitcherContainer = document.getElementById('themeSwitcherContainer');
const settingsBtn = document.getElementById('settingsBtn');
const backBtn = document.getElementById('backBtn');

if (searchContainer) {
  searchContainer.innerHTML = '<input type="text" class="global-search sub-tab" placeholder="поиск..." disabled>';
}
if (fsIndicator) {
  fsIndicator.innerHTML = '<span class="storage-status sub-tab" id="storagePath">Хранилище: не выбрано</span>';
  const storagePathEl = document.getElementById('storagePath');
  storagePathEl.style.cursor = 'pointer';
  storagePathEl.addEventListener('click', () => console.log('Выбор хранилища'));
}

if (themeSwitcherContainer) initThemeSwitcher(themeSwitcherContainer);

if (backBtn) {
  backBtn.className = 'sub-tab';
  backBtn.textContent = 'вернуться';
  backBtn.addEventListener('click', () => window.location.hash = '#/');
}

function setPageMode(isStart) {
  if (!workspace || !startContent) return;
  if (isStart) {
    startContent.style.display = 'flex';
    // Сбрасываем все старые позиционирования и задаём центрирование
    workspace.style.position = 'static';
    workspace.style.left = 'auto';
    workspace.style.right = 'auto';
    workspace.style.width = '60%';
    workspace.style.maxWidth = '800px';
    workspace.style.height = '30vh';
    workspace.style.margin = '2rem auto';
    workspace.style.border = '1px solid var(--border)';
    workspace.style.borderRadius = '20px';
    workspace.style.background = '#0a0a0a';
    workspace.style.display = 'block';
    workspace.style.overflow = 'hidden';
    // Убираем классы, которые могут помешать
    workspace.classList.remove('workspace--scroll');
    workspace.classList.add('workspace--start');
    workspace.innerHTML = '';
  } else {
    startContent.style.display = 'none';
    // Возвращаем стили для прокручиваемой зоны через класс
    workspace.style.position = '';
    workspace.style.left = '';
    workspace.style.right = '';
    workspace.style.width = '';
    workspace.style.maxWidth = '';
    workspace.style.height = '';
    workspace.style.margin = '';
    workspace.style.border = '';
    workspace.style.borderRadius = '';
    workspace.style.background = '';
    workspace.style.display = '';
    workspace.style.overflow = '';
    workspace.classList.remove('workspace--start');
    workspace.classList.add('workspace--scroll');
  }
}

window.setBackVisible = (visible) => {
  if (backBtn) backBtn.style.display = visible ? 'inline-block' : 'none';
  if (settingsBtn) settingsBtn.style.display = visible ? 'none' : 'inline-block';
};

const router = new HashRouter(workspace);
router.addRoute('/', () => {
  setPageMode(true);
  window.setBackVisible(false);
  PortalPage(startContent);
});
router.addRoute('/showcase', () => {
  setPageMode(false);
  window.setBackVisible(true);
  ShowcasePage(workspace);
});
router.addRoute('/playground', () => {
  setPageMode(false);
  window.setBackVisible(true);
  PlaygroundPage(workspace);
});
router.start();
