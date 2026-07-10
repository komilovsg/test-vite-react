import { useContext } from "react";
import { LanguageContext, translations } from "../store/LanguageContext";
import { highlight } from "./highlight";
import "../App.css";

/* Живые SVG — по одной на каждый шаг. Анимация в App.css (keyframes). */

// 01 — Браузер слушает историю: адресная строка + пульс
function SvgBrowser() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="BrowserRouter">
      <rect x="10" y="15" width="180" height="105" rx="10" className="svg-panel" />
      <rect x="10" y="15" width="180" height="26" rx="10" className="svg-bar" />
      <circle cx="24" cy="28" r="3.5" className="svg-dot-r" />
      <circle cx="36" cy="28" r="3.5" className="svg-dot-y" />
      <circle cx="48" cy="28" r="3.5" className="svg-dot-g" />
      <rect x="60" y="22" width="118" height="12" rx="6" className="svg-url" />
      <text x="66" y="31" className="svg-mono">/about</text>
      <circle cx="100" cy="82" r="20" className="svg-pulse" />
      <circle cx="100" cy="82" r="10" className="svg-accent-fill" />
    </svg>
  );
}

// 02 — Routes: подсветка бежит по строкам, находит совпадение
function SvgRoutes() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="Routes matching">
      <rect x="18" y="18" width="164" height="24" rx="6" className="svg-row" />
      <rect x="18" y="52" width="164" height="24" rx="6" className="svg-row svg-row--match" />
      <rect x="18" y="86" width="164" height="24" rx="6" className="svg-row" />
      <text x="30" y="34" className="svg-mono">path="/"</text>
      <text x="30" y="68" className="svg-mono">path="/about"</text>
      <text x="30" y="102" className="svg-mono">path="/contact"</text>
      <rect x="14" y="48" width="172" height="32" rx="8" className="svg-scan" fill="none" />
    </svg>
  );
}

// 03 — Layout: Header/Footer статичны, Outlet меняет контент
function SvgOutlet() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="Layout Outlet">
      <rect x="18" y="14" width="164" height="18" rx="5" className="svg-fixed" />
      <text x="26" y="27" className="svg-mono">Header</text>
      <rect x="18" y="98" width="164" height="18" rx="5" className="svg-fixed" />
      <text x="26" y="111" className="svg-mono">Footer</text>
      <rect x="18" y="38" width="164" height="54" rx="6" className="svg-slot" />
      <g className="svg-swap">
        <rect x="30" y="50" width="140" height="30" rx="5" className="svg-accent-fill" />
        <text x="100" y="70" textAnchor="middle" className="svg-mono svg-mono--light">Outlet</text>
      </g>
    </svg>
  );
}

// 04 — NavLink: активный индикатор скользит между пунктами
function SvgNavLink() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="NavLink active">
      <rect x="20" y="52" width="52" height="26" rx="13" className="svg-pill" />
      <rect x="74" y="52" width="52" height="26" rx="13" className="svg-pill" />
      <rect x="128" y="52" width="52" height="26" rx="13" className="svg-pill" />
      <rect x="20" y="52" width="52" height="26" rx="13" className="svg-pill-active" />
      <text x="46" y="69" textAnchor="middle" className="svg-mono">Home</text>
      <text x="100" y="69" textAnchor="middle" className="svg-mono">About</text>
      <text x="154" y="69" textAnchor="middle" className="svg-mono">Contact</text>
    </svg>
  );
}

const SVGS = [SvgBrowser, SvgRoutes, SvgOutlet, SvgNavLink];

export default function RouterGuide() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang];

  return (
    <div className="page">
      <section className="section">
        <span className="badge">react-router-dom v7</span>
        <h1 className="section__title" style={{ marginTop: 12 }}>{t.routerTitle}</h1>
        <p className="lead">{t.routerLead}</p>
      </section>

      <section className="section guide">
        {t.routerSteps.map((s, i) => {
          const Svg = SVGS[i];
          return (
            <article key={s.n} className="guide-step">
              <div className="guide-step__head">
                <span className="step__num">{s.n}</span>
                <div>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__text">{s.text}</p>
                </div>
              </div>
              <div className="guide-step__body">
                <div className="guide-figure"><Svg /></div>
                <pre className="code"><code
                  dangerouslySetInnerHTML={{ __html: highlight(s.code) }}
                /></pre>
              </div>
            </article>
          );
        })}
      </section>

      <p className="lead" style={{ textAlign: "center" }}>{t.routerOutro}</p>
    </div>
  );
}
