import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import { highlight } from "./highlight";
import "../App.css";

/* Живые SVG — по одной на каждый шаг Zustand. Анимации в App.css. */

// 01 — Три подхода: props → context → zustand. Стрелка «проходит» через стор.
function SvgLayers() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="props → context → zustand">
      <rect x="16" y="14" width="168" height="24" rx="6" className="svg-row" />
      <text x="26" y="29" className="svg-mono">props → вниз по дереву</text>
      <rect x="16" y="46" width="168" height="24" rx="6" className="svg-row" />
      <text x="26" y="61" className="svg-mono">context → всем потребителям</text>
      <rect x="16" y="78" width="168" height="24" rx="6" className="svg-row svg-row--match" />
      <text x="26" y="93" className="svg-mono">zustand → точечно</text>
      <rect x="16" y="78" width="10" height="24" rx="3" className="svg-accent-fill" />
      <circle cx="150" cy="90" r="14" className="svg-pulse" style={{ transformOrigin: "150px 90px" }} />
    </svg>
  );
}

// 02 — Redux (пачка коробок) против Zustand (одна коробка).
function SvgVs() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="Zustand vs Redux">
      <text x="45" y="22" textAnchor="middle" className="svg-mono">Redux</text>
      <rect x="16" y="30" width="58" height="14" rx="3" className="svg-row" />
      <rect x="16" y="48" width="58" height="14" rx="3" className="svg-row" />
      <rect x="16" y="66" width="58" height="14" rx="3" className="svg-row" />
      <rect x="16" y="84" width="58" height="14" rx="3" className="svg-row" />
      <text x="30" y="112" className="svg-mono">action…dispatch</text>

      <text x="150" y="22" textAnchor="middle" className="svg-mono">Zustand</text>
      <rect x="118" y="30" width="66" height="52" rx="8" className="svg-row svg-row--match" />
      <text x="151" y="60" textAnchor="middle" className="svg-mono">create()</text>
      <text x="151" y="112" className="svg-mono" textAnchor="middle">один хук</text>
    </svg>
  );
}

// 03 — Терминал с командой установки + мигающий курсор.
function SvgInstall() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="npm install zustand">
      <rect x="12" y="20" width="176" height="90" rx="10" className="svg-panel" />
      <rect x="12" y="20" width="176" height="22" rx="10" className="svg-bar" />
      <circle cx="26" cy="31" r="3.5" className="svg-dot-r" />
      <circle cx="38" cy="31" r="3.5" className="svg-dot-y" />
      <circle cx="50" cy="31" r="3.5" className="svg-dot-g" />
      <text x="24" y="66" className="svg-mono">$ npm install</text>
      <text x="24" y="84" className="svg-mono">zustand</text>
      <rect x="72" y="76" width="6" height="11" className="svg-caret" />
    </svg>
  );
}

// 04 — Стор-коробка, поля вытекают наружу без Provider.
function SvgStore() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="Zustand store">
      <rect x="18" y="30" width="90" height="70" rx="10" className="svg-slot" />
      <text x="63" y="24" textAnchor="middle" className="svg-mono">store</text>
      <rect x="30" y="42" width="66" height="14" rx="3" className="svg-row" />
      <text x="38" y="52" className="svg-mono">theme</text>
      <rect x="30" y="62" width="66" height="14" rx="3" className="svg-row" />
      <text x="38" y="72" className="svg-mono">lang</text>
      <rect x="30" y="82" width="66" height="14" rx="3" className="svg-row" />
      <text x="38" y="92" className="svg-mono">toggle()</text>
      <circle cx="118" cy="65" r="5" className="svg-flow" />
      <rect x="150" y="52" width="40" height="26" rx="6" className="svg-row svg-row--match" />
      <text x="170" y="69" textAnchor="middle" className="svg-mono">Header</text>
    </svg>
  );
}

// 05 — Кнопки темы и языка мигают (живой toggle).
function SvgButtons() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="theme & lang buttons">
      <rect x="18" y="30" width="164" height="70" rx="10" className="svg-panel" />
      <text x="100" y="24" textAnchor="middle" className="svg-mono">header__actions</text>
      <g className="svg-toggle">
        <rect x="52" y="50" width="40" height="30" rx="8" className="svg-accent-fill" />
        <text x="72" y="70" textAnchor="middle" className="svg-mono svg-mono--light">🌙</text>
      </g>
      <g className="svg-toggle" style={{ animationDelay: "1.3s" }}>
        <rect x="108" y="50" width="40" height="30" rx="8" className="svg-row" />
        <text x="128" y="70" textAnchor="middle" className="svg-mono">EN</text>
      </g>
    </svg>
  );
}

const SVGS = [SvgLayers, SvgVs, SvgInstall, SvgStore, SvgButtons];

export default function ZustandGuide() {
  const lang = useAppStore((s) => s.lang); // ZUSTAND: подписка на язык из стора
  const t = translations[lang];

  return (
    <div className="page">
      <section className="section">
        <span className="badge">zustand · global state</span>
        <h1 className="section__title" style={{ marginTop: 12 }}>{t.zustandTitle}</h1>
        <p className="lead">{t.zustandLead}</p>
      </section>

      <section className="section guide">
        {t.zustandSteps.map((s, i) => {
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

      <p className="lead" style={{ textAlign: "center" }}>{t.zustandOutro}</p>
    </div>
  );
}
