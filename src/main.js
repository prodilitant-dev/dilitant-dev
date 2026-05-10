import { HashRouter } from '@core/router';
import { initTheme } from '@core/theme';
import { PortalPage } from '@features/portal/PortalPage';
import { ShowcasePage } from '@features/showcase/ShowcasePage';
import { PlaygroundPage } from '@features/playground/PlaygroundPage';
import { initGlowTitle } from '@shared/components/GlowTitle';
import { initThemeSwitcher } from '@shared/components/ThemeSwitcher';

initTheme();

const glowContainer = document.getElementById('glowTitleContainer');
const searchContainer = document.getElementById('globalSearchContainer');
const workspace = document.getElementById('workspace');
const themeSwitcherContainer = document.getElementById('themeSwitcherContainer');
const settingsBtn = document.getElementById('settingsBtn');
const backBtn = document.getElementById('backBtn');
const storagePathEl = document.getElementById('storagePath');

// Инициализируем поиск (пока заглушка)
if (searchContainer) {
  searchContainer.innerHTML = '<input type="text" class="global-search sub-tab" placeholder="поиск..." disabled>';
}

// Индикатор хранилища
if (storagePathEl) {
  storagePathEl.addEventListener('click', () => console.log('Выбор хранилища'));
}

// Переключатель тем
if (themeSwitcherContainer) initThemeSwitcher(themeSwitcherContainer);

// Кнопка "вернуться"
if (backBtn) {
  backBtn.className = 'sub-tab';
  backBtn.textContent = 'вернуться';
  backBtn.addEventListener('click', () => window.location.hash = '#/');
}

// Глобальные функции для страниц
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

// Функция переключения режима главной страницы
function setHomeMode(active) {
  if (active) {
    // Скрываем панели
    if (glowContainer) glowContainer.style.display = 'none';
    if (searchContainer) searchContainer.style.display = 'none';
    workspace.classList.remove('workspace');
    workspace.style.position = '';
    workspace.style.inset = '';
    workspace.style.padding = '';
    workspace.style.border = '';
  } else {
    // Показываем панели
    if (glowContainer) glowContainer.style.display = '';
    if (searchContainer) searchContainer.style.display = '';
    workspace.classList.add('workspace');
  }
}

// Роутер
const router = new HashRouter(workspace);
router.addRoute('/', () => {
  setHomeMode(true);
  window.setBackVisible(false);
  PortalPage(workspace);
});
router.addRoute('/showcase', () => {
  setHomeMode(false);
  window.setTitle('Подвал');
  window.setBackVisible(true);
  ShowcasePage(workspace);
});
router.addRoute('/playground', () => {
  setHomeMode(false);
  window.setTitle('Полигон');
  window.setBackVisible(true);
  PlaygroundPage(workspace);
});
router.start();
