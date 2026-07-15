import { NavLink } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import "../App.css";

// Header — «шапка» приложения. Навигация + кнопки темы и языка.
// ZUSTAND: вместо useContext подписываемся на стор селектором useAppStore((s) => s.поле).
// Каждый селектор берёт ровно один кусок стора — так компонент перерисуется
// только когда именно это поле изменится.
export default function Header() {
  const theme = useAppStore((s) => s.theme);
  const lang = useAppStore((s) => s.lang);
  // Методы стора тоже берём селектором — это обычные функции, дёргаем их в onClick.
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const toggleLang = useAppStore((s) => s.toggleLang);
  const t = translations[lang];

  // NavLink сам подставляет класс на активный маршрут
  const linkClass = ({ isActive }) =>
    isActive ? "nav__link is-active" : "nav__link";

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="brand" aria-label={t.appTitle}>
          <span className="brand__dot" />
          <span className="brand__text">{t.appTitle}</span>
        </NavLink>

        <nav className="nav">
          <NavLink to="/" end className={linkClass}>{t.navHome}</NavLink>
          <NavLink to="/about" className={linkClass}>{t.navAbout}</NavLink>
          <NavLink to="/contact" className={linkClass}>{t.navContact}</NavLink>
          <NavLink to="/router" className={linkClass}>{t.navRouter}</NavLink>
          <NavLink to="/zustand" className={linkClass}>{t.navZustand}</NavLink>
          <NavLink to="/i18n" className={linkClass}>{t.navI18n}</NavLink>
          <a
            className="nav__link"
            href="https://preza-react-html-format.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            {t.slidesLink} ↗
          </a>
        </nav>

        <div className="header__actions">
          <button
            className="icon-btn"
            aria-label={theme === "light" ? t.themeToDark : t.themeToLight}
            title={theme === "light" ? t.themeToDark : t.themeToLight}
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button
            className="icon-btn icon-btn--text"
            onClick={toggleLang}
          >
            {lang === "ru" ? "EN" : "RU"}
          </button>
        </div>
      </div>
    </header>
  );
}
