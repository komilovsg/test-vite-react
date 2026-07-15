import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import "../App.css";

export default function AboutPage() {
  const lang = useAppStore((s) => s.lang); // ZUSTAND: подписка на язык из стора
  const t = translations[lang];

  return (
    <div className="page">
      <section className="section">
        <h1 className="section__title">{t.aboutTitle}</h1>
        <p className="lead">{t.aboutLead}</p>
      </section>

      <section className="section">
        <ol className="steps">
          {t.aboutSteps.map((s) => (
            <li key={s.n} className="step">
              <span className="step__num">{s.n}</span>
              <div>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__text">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
