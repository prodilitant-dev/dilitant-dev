import { HashRouter } from '@core/router';
import { initTheme } from '@core/theme';
import { PortalPage } from '@features/portal/PortalPage';
import { ShowcasePage } from '@features/showcase/ShowcasePage';
import { PlaygroundPage } from '@features/playground/PlaygroundPage';
import { initGlowTitle } from '@shared/components/GlowTitle';
import { initThemeSwitcher } from '@shared/components/ThemeSwitcher';
import { storageService } from '@core/services/storageService';

initTheme();

const glowContainer = document.getElementById('glowTitleContainer');
const searchContainer = document.getElementById('globalSearchContainer');
const fsIndicator = document.getElementById('fsIndicatorContainer');
const themeSwitcherContainer = document.getElementById('themeSwitcherContainer');
const settingsBtn = document.getElementById('settingsBtn');
const backBtn = document.getElementById('backBtn');

if (glowContainer) initGlowTitle(glowContainer, { text: 'Dilitant-Dev', tag: 'h1' });
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

window.setTitle = (text) => {
  if (glowContainer) {
    const titleEl = glowContainer.querySelector('h1');
    if (titleEl) titleEl.textContent = text;
  }
};

window.setBackVisible = (visible) => {
  if (backBtn) backBtn.style.display = visible ? 'inline-block' : 'none';
  if (settingsBtn) settingsBtn.style.display = visible ? 'none' : 'inline-block';
};

const router = new HashRouter(document.getElementById('workspace'));
router.addRoute('/', () => {
  window.setTitle('Dilitant-dev');
  window.setBackVisible(false);
  PortalPage(document.getElementById('workspace'));
});
router.addRoute('/showcase', () => {
  window.setTitle('Подвал');
  window.setBackVisible(true);
  ShowcasePage(document.getElementById('workspace'));
});
router.addRoute('/playground', () => {
  window.setTitle('Полигон');
  window.setBackVisible(true);
  PlaygroundPage(document.getElementById('workspace'));
});
router.start();
