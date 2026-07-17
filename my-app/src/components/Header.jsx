import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import "../App.css";

// Все страницы одним списком — рендерим и в шторке, и (если понадобится) где угодно.
const NAV = [
  { to: "/", end: true, key: "navHome" },
  { to: "/about", key: "navAbout" },
  { to: "/contact", key: "navContact" },
  { to: "/router", key: "navRouter" },
  { to: "/zustand", key: "navZustand" },
  { to: "/i18n", key: "navI18n" },
  { to: "/todo", key: "navTodo" },
  { to: "/theme", key: "navTheme" },
  { to: "/theme-tw", key: "navThemeTw" },
  { to: "/motion", key: "navMotion" },
];

// Header — «шапка». Страниц много → ссылки уехали в выпадающую шторку.
export default function Header() {
  const theme = useAppStore((s) => s.theme);
  const lang = useAppStore((s) => s.lang);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const toggleLang = useAppStore((s) => s.toggleLang);
  const t = translations[lang];

  // open — открыта ли шторка. Закрываем по клику вне меню и по Escape.
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // header имеет backdrop-filter → он containing block для fixed, поэтому
  // прозрачный оверлей не покрывал сайт. Надёжнее — слушатель на документе.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    isActive ? "nav__link is-active" : "nav__link";

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="brand" aria-label={t.appTitle}>
          <span className="brand__dot" />
          <span className="brand__text">{t.appTitle}</span>
        </NavLink>

        <div className="header__actions">
          {/* Кнопка-шторка со списком всех страниц */}
          <div className="menu" ref={menuRef}>
            <button
              className="icon-btn"
              aria-label={t.menu}
              title={t.menu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              ☰
            </button>

            {open && (
              <nav className="menu__panel">
                {NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={linkClass}
                    onClick={() => setOpen(false)}
                  >
                    {t[item.key]}
                  </NavLink>
                ))}
                <a
                  className="nav__link"
                  href="https://preza-react-html-format.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  {t.slidesLink} ↗
                </a>
              </nav>
            )}
          </div>

          <button
            className="icon-btn"
            aria-label={theme === "light" ? t.themeToDark : t.themeToLight}
            title={theme === "light" ? t.themeToDark : t.themeToLight}
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button className="icon-btn icon-btn--text" onClick={toggleLang}>
            {lang === "ru" ? "EN" : "RU"}
          </button>
        </div>
      </div>
    </header>
  );
}
