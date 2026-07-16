import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import { highlight } from "../components/highlight";
import "../App.css";

// TodoGuide — страница практической работы №1.
// Слева описание задания и пошаговая сборка, вверху — кнопка «Открыть демо».
export default function TodoGuide() {
  const lang = useAppStore((s) => s.lang);
  const t = translations[lang].todo;

  return (
    <div className="page">
      <section className="section">
        <span className="badge">{t.badge}</span>
        <h1 className="section__title" style={{ marginTop: 12 }}>{t.guideTitle}</h1>
        <p className="lead">{t.guideLead}</p>
        <div className="hero__cta">
          <Link to="/todo/app" className="btn btn--primary">{t.openDemo} →</Link>
          <Link to="/todo/app/create" className="btn">{t.tabCreate}</Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">{t.reqTitle}</h2>
        <ul className="todo-req">
          {t.requirements.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="section guide">
        <h2 className="section__title">{t.stepsTitle}</h2>
        {t.steps.map((s) => (
          <article key={s.n} className="guide-step">
            <div className="guide-step__head">
              <span className="step__num">{s.n}</span>
              <div>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__text">{s.text}</p>
              </div>
            </div>
            {s.code && (
              <div className="guide-step__body">
                <pre className="code"><code
                  dangerouslySetInnerHTML={{ __html: highlight(s.code) }}
                /></pre>
              </div>
            )}
          </article>
        ))}
      </section>

      <p className="lead" style={{ textAlign: "center" }}>{t.guideOutro}</p>
      <div className="hero__cta" style={{ justifyContent: "center" }}>
        <Link to="/todo/app" className="btn btn--primary">{t.openDemo} →</Link>
      </div>
    </div>
  );
}
