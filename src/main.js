import { HashRouter } from '@core/router';
import { initTheme } from '@core/theme';
import { PortalPage } from '@features/portal/PortalPage';
import { ShowcasePage } from '@features/showcase/ShowcasePage';
import { PlaygroundPage } from '@features/playground/PlaygroundPage';
import { initThemeSwitcher } from '@shared/components/ThemeSwitcher';

initTheme();

const workspace = document.getElementById('workspace');
const startContent = document.getElementById('startContent');
const pageTitle = document.getElementById('pageTitle');
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

// Инициализируем заголовок (будет переиспользоваться)
if (pageTitle) {
  const h1 = document.createElement('h1');
  h1.id = 'titleText';
  pageTitle.appendChild(h1);
}

window.setTitle = (text) => {
  const titleEl = document.getElementById('titleText');
  if (titleEl) titleEl.textContent = text;
};

function setPageMode(isStart) {
  if (!workspace || !startContent || !pageTitle) return;
  if (isStart) {
    startContent.style.display = 'flex';
    pageTitle.style.display = 'none';
    workspace.classList.add('workspace--start');
    workspace.classList.remove('workspace--scroll');
    workspace.innerHTML = '';
  } else {
    startContent.style.display = 'none';
    pageTitle.style.display = 'block';
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
  window.setTitle('Подвал');
  window.setBackVisible(true);
  ShowcasePage(workspace);
});
router.addRoute('/playground', () => {
  setPageMode(false);
  window.setTitle('Полигон');
  window.setBackVisible(true);
  PlaygroundPage(workspace);
});
router.start();
