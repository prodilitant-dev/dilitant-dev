// src/core/theme.js

/** Доступные темы: ключ → CSS-класс */
const THEME_MAP = {
  light: 'theme-light',
  dark: 'theme-dark',
  contrast: 'theme-contrast',
};

/** Читаемые названия тем */
const THEME_NAMES = {
  light: 'Светлая',
  dark: 'Тёмная',
  contrast: 'Контрастная',
};

/** Тема по умолчанию */
const DEFAULT_THEME = 'light';

/**
 * Применить тему к body и сохранить выбор в localStorage.
 * @param {string} themeKey - ключ темы (light, dark, contrast)
 */
export function setTheme(themeKey) {
  if (!(themeKey in THEME_MAP)) return;

  const classToAdd = THEME_MAP[themeKey];
  // Удаляем все возможные классы тем
  document.body.classList.remove(...Object.values(THEME_MAP));
  // Добавляем нужный
  document.body.classList.add(classToAdd);
  localStorage.setItem('dilitant-theme', themeKey);
}

/** Получить текущий ключ темы (из localStorage или по умолчанию) */
export function getCurrentTheme() {
  const saved = localStorage.getItem('dilitant-theme');
  if (saved && saved in THEME_MAP) return saved;
  return DEFAULT_THEME;
}

/** Получить объект всех тем (ключ → CSS-класс) */
export function getThemeMap() {
  return { ...THEME_MAP };
}

/** Получить читаемое название темы по ключу */
export function getThemeName(themeKey) {
  return THEME_NAMES[themeKey] || themeKey;
}

/** Применить тему при инициализации приложения */
export function initTheme() {
  setTheme(getCurrentTheme());
}