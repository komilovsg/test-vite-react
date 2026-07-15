import ru from "./locales/ru";
import en from "./locales/en";

// Словарь переводов. Каждый язык — отдельный файл в locales/ (ru.js, en.js),
// как resources в i18next. Здесь только собираем их вместе.
// Текущий язык хранит Zustand-стор (useAppStore), а тексты берут так:
// const t = translations[lang];  →  t.navHome
export const translations = { ru, en };
