import { create } from "zustand";

// Глобальный стор на Zustand — заменяет ThemeContext и LanguageContext.
// Provider не нужен: стор живёт снаружи React, компоненты подписываются селектором.
export const useAppStore = create((set) => ({
  theme: "light",
  lang: "ru",
  toggleTheme: () =>
    set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
  toggleLang: () =>
    set((s) => ({ lang: s.lang === "ru" ? "en" : "ru" })),
}));
