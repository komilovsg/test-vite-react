import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";

// ШАГ 3. Footer — «подвал» приложения.
// Простой компонент без своего state: только читает язык из контекста.
export default function Footer() {
  const lang = useAppStore((s) => s.lang); // ZUSTAND: подписка на язык из стора
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
