import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../store/ThemeContext";
import { LanguageContext, translations } from "../store/LanguageContext";
import "../App.css";

// ШАГ 3 + ШАГ 4. Header — «шапка» приложения.
// Навигация + кнопки смены темы и языка.
export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LanguageContext);
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
        </nav>

        <div className="header__actions">
          <button
            className="icon-btn"
            aria-label={theme === "light" ? t.themeToDark : t.themeToLight}
            title={theme === "light" ? t.themeToDark : t.themeToLight}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button
            className="icon-btn icon-btn--text"
            onClick={() => setLang(lang === "ru" ? "en" : "ru")}
          >
            {lang === "ru" ? "EN" : "RU"}
          </button>
        </div>
      </div>
    </header>
  );
}
