import { create } from "zustand";
import { persist } from "zustand/middleware";

// Глобальный стор на Zustand — заменяет ThemeContext и LanguageContext.
// Provider не нужен: стор живёт снаружи React, компоненты подписываются селектором.
// persist — middleware из zustand: автоматически сохраняет стор в localStorage
// (бонус практической: задачи и тема переживают перезагрузку страницы).
export const useAppStore = create(
  persist(
    (set) => ({
      theme: "light",
      lang: "ru",
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
      toggleLang: () =>
        set((s) => ({ lang: s.lang === "ru" ? "en" : "ru" })),

      // --- Todo Manager (практическая работа №1) ---
      todos: [], // { id, title, done, createdAt }
      filter: "all", // all | active | done

      addTodo: (title) =>
        set((s) => ({
          todos: [
            {
              id: crypto.randomUUID(),
              title,
              done: false,
              createdAt: new Date().toISOString(),
            },
            ...s.todos,
          ],
        })),

      toggleTodo: (id) =>
        set((s) => ({
          todos: s.todos.map((todo) =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
          ),
        })),

      removeTodo: (id) =>
        set((s) => ({ todos: s.todos.filter((todo) => todo.id !== id) })),

      setFilter: (filter) => set({ filter }),
    }),
    { name: "app-store" } // ключ в localStorage
  )
);
