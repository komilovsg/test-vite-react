import { useAppStore } from "../store/useAppStore";
import { highlight } from "./highlight";
import styles from "./ThemeGuide.module.css";
import "../App.css";

// ThemeGuide — обучающая страница: как держать стили темы В САМОМ компоненте
// через CSS Modules + :global(body.dark). Сверху живое демо, ниже — шаги.
// Тема хранится в zustand (одна строка theme), App.jsx красит <body>.

// Пошаговый разбор. Каждый шаг: номер, заголовок, текст, код-сниппет.
const STEPS = [
  {
    n: "01",
    title: "Тема — это класс на <body>",
    text: "zustand хранит только строку theme. App.jsx вешает её классом на body. Компонент себя из JS НЕ красит.",
    code: `// App.jsx — уже есть
const theme = useAppStore((s) => s.theme);
useEffect(() => {
  document.body.className = theme; // <body class="dark"> или "light"
}, [theme]);`,
  },
  {
    n: "02",
    title: "У компонента свой .module.css",
    text: "Рядом с ThemeGuide.jsx лежит ThemeGuide.module.css. Классы хешируются — конфликтов имён между компонентами нет.",
    code: `// ThemeGuide.jsx
import styles from "./ThemeGuide.module.css";

<div className={styles.card}>...</div>`,
  },
  {
    n: "03",
    title: "Светлая тема = базовые стили",
    text: "Обычный класс без префиксов. Это состояние по умолчанию.",
    code: `/* ThemeGuide.module.css */
.card {
  background: #ffffff;
  color: #1a1a1a;
  border: 1px solid #e5e5e5;
}`,
  },
  {
    n: "04",
    title: "Тёмная тема — тут же, через :global(body.dark)",
    text: "body.dark ставится СНАРУЖИ модуля — глобальный класс. :global() дотягивается до него, а .card остаётся локальным.",
    code: `/* тот же ThemeGuide.module.css */
:global(body.dark) .card {
  background: #1e1e2e;
  color: #e6e6e6;
  border-color: #33334d;
}`,
  },
  {
    n: "05",
    title: "Переключаем — метод из стора",
    text: "Кнопка дёргает toggleTheme из zustand. Меняется класс body → CSS сам перекрашивает. Никаких цветов в JS.",
    code: `const toggleTheme = useAppStore((s) => s.toggleTheme);

<button onClick={toggleTheme}>переключить</button>`,
  },
];

export default function ThemeGuide() {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  return (
    <div className="page">
      <section className="section">
        <span className="badge">css modules · тема в компоненте</span>
        <h1 className="section__title" style={{ marginTop: 12 }}>
          Стили темы живут в самом компоненте
        </h1>
        <p className="lead">
          Цвета для светлой и тёмной темы лежат в{" "}
          <code>ThemeGuide.module.css</code>, а не в общем App.css. zustand
          меняет только класс на <code>&lt;body&gt;</code>.
        </p>
      </section>

      {/* Живое демо — жми и смотри в браузере как перекрашивается */}
      <section className="section">
        <div className={styles.card}>
          <span className={styles.badge}>тема: {theme}</span>
          <h3 className={styles.title} style={{ marginTop: 12 }}>
            👇 живое демо — жми кнопку
          </h3>
          <p>Этот блок красит себя сам через свой .module.css.</p>
          <button className={styles.button} onClick={toggleTheme}>
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
        Итог: каждый компонент → свой .module.css → там и стили, и обе темы. Ноль
        централизации.
      </p>
    </div>
  );
}
