import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import Skeleton from "../components/Skeleton";
import "../App.css";

// TodoList — главный экран демо (дашборд): слева список + фильтр,
// справа быстрая форма создания и настройки темы. Всё из Zustand-стора.
export default function TodoList() {
  const lang = useAppStore((s) => s.lang);
  const todos = useAppStore((s) => s.todos);
  const filter = useAppStore((s) => s.filter);
  const setFilter = useAppStore((s) => s.setFilter);
  const toggleTodo = useAppStore((s) => s.toggleTodo);
  const removeTodo = useAppStore((s) => s.removeTodo);
  const addTodo = useAppStore((s) => s.addTodo);
  const t = translations[lang].todo;

  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  // Короткая имитация загрузки списка — показываем скелетон.
  // ponytail: setTimeout вместо реального запроса; тут данные из localStorage.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(id);
  }, []);

  const handleRemove = (id, titleText) => {
    removeTodo(id);
    toast(`Удалено: ${titleText}`);
  };

  const onToggle = (todo) => {
    toggleTodo(todo.id);
    if (!todo.done) toast.success(`Готово: ${todo.title}`);
  };

  const visible = todos.filter((todo) =>
    filter === "active" ? !todo.done : filter === "done" ? todo.done : true
  );

  const filters = [
    { key: "all", label: t.filterAll },
    { key: "active", label: t.filterActive },
    { key: "done", label: t.filterDone },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    const value = title.trim();
    if (!value) return;
    addTodo(value);
    setTitle(""); // очищаем поле, остаёмся на дашборде
    toast.success(`Добавлено: ${value}`);
  };

  return (
    <div className="todo-grid">
      {/* Левая колонка — список */}
      <section className="card todo-panel">
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

        {loading ? (
          <ul className="todo-list" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <li key={i} className="todo-item" style={{ gap: 12 }}>
                <Skeleton width={20} height={20} radius={6} />
                <Skeleton width={`${70 - i * 10}%`} height={14} />
                <Skeleton width={60} height={12} style={{ marginLeft: "auto" }} />
              </li>
            ))}
          </ul>
        ) : visible.length === 0 ? (
          <div className="todo-empty">
            <p>{t.empty}</p>
            <button className="btn btn--primary" onClick={() => navigate("/todo/app/create")}>
              {t.addFirst}
            </button>
          </div>
        ) : (
          <ul className="todo-list">
            {visible.map((todo) => (
              <li key={todo.id} className={todo.done ? "todo-item is-done" : "todo-item"}>
                <label className="todo-item__main">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => onToggle(todo)}
                  />
                  <span className="todo-item__text">{todo.title}</span>
                </label>
                <div className="todo-item__meta">
                  <time dateTime={todo.createdAt}>
                    {new Date(todo.createdAt).toLocaleDateString(
                      lang === "ru" ? "ru-RU" : "en-US",
                      { day: "2-digit", month: "short", year: "numeric" }
                    )}
                  </time>
                  <button
                    className="todo-del"
                    aria-label={t.delete}
                    title={t.delete}
                    onClick={() => handleRemove(todo.id, todo.title)}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Правая колонка — форма создания */}
      <aside className="todo-side">
        <div className="card">
          <h3 className="todo-card__title">{t.createCardTitle}</h3>
          <form className="todo-add" onSubmit={onSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.titleLabel}
            />
            <button type="submit" className="btn btn--primary" disabled={!title.trim()}>
              {t.add}
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}
