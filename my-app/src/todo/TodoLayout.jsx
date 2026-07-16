import { NavLink, Outlet } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import "../App.css";

// TodoLayout — общий каркас демо Todo Manager: подменю + Outlet.
// Вложенные маршруты (list / create / settings) рендерятся в Outlet.
export default function TodoLayout() {
  const lang = useAppStore((s) => s.lang);
  const t = translations[lang].todo;

  const linkClass = ({ isActive }) =>
    isActive ? "todo-tab is-active" : "todo-tab";

  return (
    <div className="page">
      <nav className="todo-tabs">
        {/* end — чтобы «Список» не подсвечивался на /create и /settings */}
        <NavLink to="/todo/app" end className={linkClass}>{t.tabList}</NavLink>
        <NavLink to="/todo/app/create" className={linkClass}>{t.tabCreate}</NavLink>
        <NavLink to="/todo/app/settings" className={linkClass}>{t.tabSettings}</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
