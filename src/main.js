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
    workspace.classList.add('workspace--start');
    workspace.classList.remove('workspace--scroll');
    workspace.innerHTML = ''; // очищаем
  } else {
    startContent.style.display = 'none';
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
