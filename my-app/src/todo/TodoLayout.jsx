import { NavLink, Outlet } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import "../App.css";

// TodoLayout — общий каркас демо Todo Manager: панель вкладок + счётчик + Outlet.
// Вложенные маршруты (list / create / settings) рендерятся в Outlet.
export default function TodoLayout() {
  const lang = useAppStore((s) => s.lang);
  const todos = useAppStore((s) => s.todos);
  const t = translations[lang].todo;

  const doneCount = todos.filter((todo) => todo.done).length;

  const linkClass = ({ isActive }) =>
    isActive ? "todo-tab is-active" : "todo-tab";

  return (
    <div className="page todo-page">
      <div className="todo-bar">
        <nav className="todo-tabs">
          {/* end — чтобы «Список» не подсвечивался на /create и /settings */}
          <NavLink to="/todo/app" end className={linkClass}>
            <span className="todo-tab__icon">☰</span> {t.tabList}
          </NavLink>
          <NavLink to="/todo/app/create" className={linkClass}>
            <span className="todo-tab__icon">＋</span> {t.tabCreate}
          </NavLink>
          <NavLink to="/todo/app/settings" className={linkClass}>
            <span className="todo-tab__icon">⚙</span> {t.tabSettings}
          </NavLink>
        </nav>
        <span className="todo-counter">
          <strong>{doneCount} / {todos.length}</strong> {t.doneLabel}
        </span>
      </div>
      <Outlet />
    </div>
  );
}
