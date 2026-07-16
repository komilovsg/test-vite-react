import { Link } from "react-router-dom";
import Counter from "./Counter";
import RefDemo from "./RefDemo";
import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import "../App.css";

export default function HomePage() {
  const lang = useAppStore((s) => s.lang); // ZUSTAND: подписка на язык из стора
  const t = translations[lang];

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <span className="badge">{t.heroBadge}</span>
        <h1 className="hero__title">{t.heroTitle}</h1>
        <p className="hero__subtitle">{t.heroSubtitle}</p>
        <div className="hero__cta">
          <a href="#demo" className="btn btn--primary">{t.heroCta}</a>
          <Link to="/about" className="btn">{t.heroCta2}</Link>
        </div>
      </section>

      {/* Практическая работа №1 — заметный баннер для студентов */}
      <section className="section">
        <div className="card todo-promo">
          <div>
            <span className="badge">{t.todo.badge}</span>
            <h2 className="section__title" style={{ margin: "10px 0 6px" }}>
              {t.todo.promoTitle}
            </h2>
            <p className="card__text">{t.todo.promoText}</p>
          </div>
          <Link to="/todo" className="btn btn--primary">{t.todo.promoCta} →</Link>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <h2 className="section__title">{t.featuresTitle}</h2>
        <div className="grid">
          {t.features.map((f) => (
            <article key={f.title} className="card">
              <div className="card__icon">{f.icon}</div>
              <h3 className="card__title">{f.title}</h3>
              <p className="card__text">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Live demo */}
      <section id="demo" className="section">
        <h2 className="section__title">{t.demoTitle}</h2>
        <div className="grid grid--2">
          <div className="card"><Counter /></div>
          <div className="card"><RefDemo /></div>
        </div>
      </section>
    </div>
  );
}
