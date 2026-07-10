import { useContext } from "react";
import { LanguageContext, translations } from "../store/LanguageContext";

// ШАГ 3. Footer — «подвал» приложения.
// Простой компонент без своего state: только читает язык из контекста.
export default function Footer() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang];

  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="brand__dot" />
        <p>{t.footer} · 2026</p>
      </div>
    </footer>
  );
}
