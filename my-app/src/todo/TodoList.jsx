import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import "../App.css";

// TodoList — главная страница демо: список задач + фильтр + счётчик.
// Все данные берём из Zustand-стора селекторами, без пропсов и контекста.
export default function TodoList() {
  const lang = useAppStore((s) => s.lang);
  const todos = useAppStore((s) => s.todos);
  const filter = useAppStore((s) => s.filter);
  const setFilter = useAppStore((s) => s.setFilter);
  const toggleTodo = useAppStore((s) => s.toggleTodo);
  const removeTodo = useAppStore((s) => s.removeTodo);
  const t = translations[lang].todo;

  const doneCount = todos.filter((todo) => todo.done).length;
  const visible = todos.filter((todo) =>
    filter === "active" ? !todo.done : filter === "done" ? todo.done : true
  );

  const filters = [
    { key: "all", label: t.filterAll },
    { key: "active", label: t.filterActive },
    { key: "done", label: t.filterDone },
  ];

  return (
    <section className="section">
      <div className="todo-head">
        <h2 className="section__title" style={{ margin: 0 }}>{t.listTitle}</h2>
        <span className="todo-counter">
          {doneCount} / {todos.length} {t.doneLabel}
        </span>
      </div>

      <div className="todo-filters">
        {filters.map((f) => (
          <button
            key={f.key}
            className={filter === f.key ? "todo-chip is-active" : "todo-chip"}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="todo-empty">
          <p>{t.empty}</p>
          <Link to="/todo/app/create" className="btn btn--primary">{t.addFirst}</Link>
        </div>
      ) : (
        <ul className="todo-list">
          {visible.map((todo) => (
            <li key={todo.id} className={todo.done ? "todo-item is-done" : "todo-item"}>
              <label className="todo-item__main">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="todo-item__text">{todo.title}</span>
              </label>
              <div className="todo-item__meta">
                <time dateTime={todo.createdAt}>
                  {new Date(todo.createdAt).toLocaleDateString(
                    lang === "ru" ? "ru-RU" : "en-US",
                    { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }
                  )}
                </time>
                <button
                  className="todo-del"
                  aria-label={t.delete}
                  title={t.delete}
                  onClick={() => removeTodo(todo.id)}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
