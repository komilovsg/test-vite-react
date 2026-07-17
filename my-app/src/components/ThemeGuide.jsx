import { useAppStore } from "../store/useAppStore";
import styles from "./ThemeGuide.module.css";

// ThemeGuide — страница-пример: у компонента СВОЙ .module.css,
// где лежат и базовые стили, и цвета под тёмную/светлую тему.
// Zustand хранит только строку theme ("light"|"dark"). Компонент НЕ красит себя из JS —
// он просто рендерит классы, а CSS сам решает цвет по body.light / body.dark.
export default function ThemeGuide() {
  // theme нужен тут только чтобы показать текущее значение в тексте.
  // Для самих цветов он НЕ нужен — их разруливает CSS через body-класс.
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <span className={styles.badge}>тема: {theme}</span>
        <h1 className={styles.title}>Стили темы живут в самом компоненте</h1>
        <p>
          Цвета этого блока для светлой и тёмной темы лежат в
          <code> ThemeGuide.module.css</code>, а не в общем App.css.
          Zustand меняет только класс на <code>&lt;body&gt;</code>, CSS ловит его
          через <code>:global(body.dark)</code>.
        </p>
        <button className={styles.badge} onClick={toggleTheme}>
          переключить тему
        </button>
      </div>
    </div>
  );
}
