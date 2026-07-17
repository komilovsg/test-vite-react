import { useAppStore } from "../store/useAppStore";

// TailwindThemeGuide — та же фишка темы, но БЕЗ своего css-файла.
// Цвета пишем прямо в className утилитами Tailwind.
// base-класс = светлая тема, dark:... = тёмная.
// dark: работает, потому что в index.css мы объявили:
//   @custom-variant dark (&:where(.dark, .dark *));
// и App.jsx ставит <body class="dark">. Больше ничего настраивать не надо.
export default function TailwindThemeGuide() {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* bg-white -> светлая, dark:bg-slate-900 -> тёмная. Аналогично текст/бордер. */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-900 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
        <span className="inline-block rounded-full bg-indigo-100 px-2.5 py-1 text-sm text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          тема: {theme}
        </span>

        <h1 className="mt-3 mb-2 text-xl font-bold">
          Тема через Tailwind dark:
        </h1>

        <p className="text-slate-600 dark:text-slate-300">
          Тут нет своего css. Цвета обеих тем стоят прямо в className:
          <code> bg-white dark:bg-slate-900</code>. Zustand так же меняет только
          класс на <code>&lt;body&gt;</code>, а <code>dark:</code> его ловит.
        </p>

        <button
          onClick={toggleTheme}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          переключить тему
        </button>
      </div>
    </div>
  );
}
