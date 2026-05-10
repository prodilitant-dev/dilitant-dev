/** Доступные темы: ключ → CSS-класс */
const THEME_MAP = {
  forest: 'theme-forest',
  reef: 'theme-reef',
  dust: 'theme-dust',
  abyss: 'theme-abyss',
  aurora: 'theme-aurora',
  vinyl: 'theme-vinyl',
  neonabyss: 'theme-neonabyss',
  moonsand: 'theme-moonsand',
  punk: 'theme-punk',
  sanskirt: 'theme-sanskirt',
};

/** Читаемые названия тем (русский) */
const THEME_NAMES = {
  forest: 'Чернолесье',
  reef: 'Бесконечный риф',
  dust: 'Пыльный тракт',
  abyss: 'Абисс',
  aurora: 'Северное сияние',
  vinyl: 'Винил и пыль',
  neonabyss: 'Неоновая бездна',
  moonsand: 'Лунный песок',
  punk: 'Панк‑бессмертен',
  sanskirt: 'Санскритские сумерки',
};

const DEFAULT_THEME = 'forest';

export function setTheme(themeKey) {
  if (!(themeKey in THEME_MAP)) return;
  const classToAdd = THEME_MAP[themeKey];
  document.body.classList.remove(...Object.values(THEME_MAP));
  document.body.classList.add(classToAdd);
  localStorage.setItem('dilitant-theme', themeKey);
}

export function getCurrentTheme() {
  const saved = localStorage.getItem('dilitant-theme');
  if (saved && saved in THEME_MAP) return saved;
  return DEFAULT_THEME;
}

export function getThemeMap() {
  return { ...THEME_MAP };
}

export function getThemeName(themeKey) {
  return THEME_NAMES[themeKey] || themeKey;
}

export function initTheme() {
  setTheme(getCurrentTheme());
}
