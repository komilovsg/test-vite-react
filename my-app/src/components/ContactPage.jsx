import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import "../App.css";

export default function ContactPage() {
  const lang = useAppStore((s) => s.lang); // ZUSTAND: подписка на язык из стора
  const t = translations[lang];
  const [sent, setSent] = useState(false);

  // ponytail: no backend — just reflect submit in UI. Wire to API when one exists.
  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="page">
      <section className="section">
        <h1 className="section__title">{t.contactTitle}</h1>
        <p className="lead">{t.contactLead}</p>
      </section>

      <section className="section">
        <form className="card form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field__label">{t.contactName}</span>
            <input className="input" type="text" required />
          </label>
          <label className="field">
            <span className="field__label">{t.contactEmail}</span>
            <input className="input" type="email" required />
          </label>
          <label className="field">
            <span className="field__label">{t.contactMessage}</span>
            <textarea className="input" rows={5} required />
          </label>
          <button className="btn btn--primary" type="submit">{t.contactSend}</button>
          {sent && <p className="form__ok">{t.contactSent}</p>}
        </form>
      </section>
    </div>
  );
}
