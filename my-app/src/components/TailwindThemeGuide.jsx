import { useAppStore } from "../store/useAppStore";
import { highlight } from "./highlight";
import "../App.css";

// TailwindThemeGuide — та же тема, но БЕЗ своего css. Цвета обеих тем — прямо
// в className утилитами Tailwind: base = светлая, dark: = тёмная.

const STEPS = [
  {
    n: "01",
    title: "Ставим Tailwind (v4)",
    text: "Плагин для Vite + импорт в index.css. Конфиг-файл в v4 не нужен.",
    code: `npm i -D tailwindcss @tailwindcss/vite

// vite.config.js
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
});`,
  },
  {
    n: "02",
    title: "Импорт + подсказка про тему",
    text: "По умолчанию dark: в v4 = системная тема. Одной строкой переключаем на класс — тот, что zustand вешает на body.",
    code: `/* src/index.css */
@import "tailwindcss";

/* dark: срабатывает, когда элемент внутри .dark (у нас body.dark) */
@custom-variant dark (&:where(.dark, .dark *));`,
  },
  {
    n: "03",
    title: "Тема — тот же класс на <body>",
    text: "Ничего нового: zustand хранит theme, App.jsx вешает класс. Tailwind этот класс и ловит.",
    code: `// App.jsx — уже есть
useEffect(() => {
  document.body.className = theme; // <body class="dark">
}, [theme]);`,
  },
  {
    n: "04",
    title: "Пишем цвета прямо в className",
    text: "Без префикса — светлая тема. С dark: — тёмная. Отдельный css-файл не нужен.",
    code: `<div className="bg-white text-slate-900
                dark:bg-slate-900 dark:text-white">
  ...
</div>`,
  },
  {
    n: "05",
    title: "Переключаем — метод из стора",
    text: "Та же кнопка toggleTheme. Меняется класс body → Tailwind перекрашивает все dark:-классы.",
    code: `const toggleTheme = useAppStore((s) => s.toggleTheme);

<button onClick={toggleTheme}>переключить</button>`,
  },
];

export default function TailwindThemeGuide() {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  return (
    <div className="page">
      <section className="section">
        <span className="badge">tailwind · dark:</span>
        <h1 className="section__title" style={{ marginTop: 12 }}>
          Тема через Tailwind <code>dark:</code>
        </h1>
        <p className="lead">
          Нет своего css. Цвета обеих тем стоят прямо в className. zustand так же
          меняет класс на <code>&lt;body&gt;</code>, а <code>dark:</code> его
          ловит.
        </p>
      </section>

      {/* Живое демо на чистом Tailwind */}
      <section className="section">
        <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 text-slate-900 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
          <span className="inline-block rounded-full bg-indigo-100 px-2.5 py-1 text-sm text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            тема: {theme}
          </span>
          <h3 className="mt-3 text-lg font-bold">👇 живое демо — жми кнопку</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Блок красит себя классами <code>dark:*</code>.
          </p>
          <button
            onClick={toggleTheme}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            переключить тему
          </button>
        </div>
      </section>

      <section className="section guide">
        {STEPS.map((s) => (
          <article key={s.n} className="guide-step">
            <div className="guide-step__head">
              <span className="step__num">{s.n}</span>
              <div>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__text">{s.text}</p>
              </div>
            </div>
            <pre className="code guide-code">
              <code dangerouslySetInnerHTML={{ __html: highlight(s.code) }} />
            </pre>
          </article>
        ))}
      </section>

      <p className="lead" style={{ textAlign: "center" }}>
        Итог: цвета темы живут в самом компоненте — в его className. Отдельный css
        не нужен.
      </p>
    </div>
  );
}
