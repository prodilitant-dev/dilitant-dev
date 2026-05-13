import './ThemeSwitcher.css';
import { setTheme, getCurrentTheme, getThemeMap, getThemeName } from '@core/theme';

export function initThemeSwitcher(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="theme-switcher">
      <button class="sub-tab" id="themeToggle">оформление</button>
      <div class="switcher-dropdown" id="themeMenu"></div>
    </div>
  `;

  const themeMenu = document.getElementById('themeMenu');
  const themeToggle = document.getElementById('themeToggle');
  if (!themeMenu || !themeToggle) return;

  const themeMap = getThemeMap();
  const currentTheme = getCurrentTheme();

  Object.keys(themeMap).forEach(key => {
    const btn = document.createElement('button');
    btn.setAttribute('data-theme', key);
    btn.textContent = getThemeName(key);
    if (key === currentTheme) btn.classList.add('active');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setTheme(key);
      themeMenu.classList.remove('show');
      themeMenu.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    themeMenu.appendChild(btn);
  });

  themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!themeToggle.contains(e.target) && !themeMenu.contains(e.target)) {
      themeMenu.classList.remove('show');
    }
  });
}
