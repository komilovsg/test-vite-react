import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import "../App.css";

// TodoSettings — управление темой. Кнопка «Сменить тему» дёргает метод стора,
// тема меняется мгновенно во всём приложении (см. useEffect в App.jsx).
export default function TodoSettings() {
  const lang = useAppStore((s) => s.lang);
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const todos = useAppStore((s) => s.todos);
  const t = translations[lang].todo;

  return (
    <section className="section">
      <h2 className="section__title">{t.settingsTitle}</h2>
      <div className="card todo-settings">
        <p>
          {t.currentTheme}:{" "}
          <strong>{theme === "light" ? t.themeLight : t.themeDark}</strong>
        </p>
        <button className="btn btn--primary" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"} {t.toggleTheme}
        </button>
        <p className="todo-settings__hint">
          {t.totalTasks}: <strong>{todos.length}</strong>
        </p>
      </div>
    </section>
  );
}
