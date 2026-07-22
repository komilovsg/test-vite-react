import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import { highlight } from "./highlight";
import "../App.css";

/* Живые SVG — по одной на каждый шаг гайда type vs interface. */

// 01 — Одинаковая форма объекта: две карточки interface / type
function SvgSame() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="interface vs type">
      <rect x="14" y="24" width="80" height="82" rx="8" className="svg-panel" />
      <rect x="106" y="24" width="80" height="82" rx="8" className="svg-panel" />
      <text x="54" y="44" textAnchor="middle" className="svg-mono">interface</text>
      <text x="146" y="44" textAnchor="middle" className="svg-mono">type</text>
      <rect x="26" y="56" width="56" height="10" rx="5" className="svg-url" />
      <rect x="26" y="74" width="56" height="10" rx="5" className="svg-url" />
      <rect x="118" y="56" width="56" height="10" rx="5" className="svg-url" />
      <rect x="118" y="74" width="56" height="10" rx="5" className="svg-url" />
      <circle cx="100" cy="65" r="9" className="svg-accent-fill" />
      <text x="100" y="69" textAnchor="middle" className="svg-mono svg-mono--light">=</text>
    </svg>
  );
}

// 02 — Declaration merging: два interface сливаются в один
function SvgMerge() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="declaration merging">
      <rect x="16" y="20" width="70" height="30" rx="6" className="svg-row" />
      <rect x="16" y="80" width="70" height="30" rx="6" className="svg-row" />
      <text x="51" y="39" textAnchor="middle" className="svg-mono">name</text>
      <text x="51" y="99" textAnchor="middle" className="svg-mono">age</text>
      <path d="M92 35 H120 M92 95 H120 M120 35 Q134 65 148 65 M120 95 Q134 65 148 65"
        className="svg-scan" fill="none" />
      <rect x="150" y="50" width="42" height="30" rx="6" className="svg-row svg-row--match" />
      <text x="171" y="69" textAnchor="middle" className="svg-mono">User</text>
    </svg>
  );
}

// 03 — Что описывают: interface = объект, type = union / tuple / primitive
function SvgScope() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="what each describes">
      <rect x="16" y="18" width="80" height="94" rx="8" className="svg-slot" />
      <text x="56" y="36" textAnchor="middle" className="svg-mono">interface</text>
      <rect x="30" y="48" width="52" height="48" rx="6" className="svg-accent-fill" />
      <text x="56" y="76" textAnchor="middle" className="svg-mono svg-mono--light">obj</text>
      <rect x="104" y="18" width="80" height="94" rx="8" className="svg-slot" />
      <text x="144" y="36" textAnchor="middle" className="svg-mono">type</text>
      <rect x="114" y="46" width="60" height="14" rx="7" className="svg-pill" />
      <text x="144" y="57" textAnchor="middle" className="svg-mono">union</text>
      <rect x="114" y="66" width="60" height="14" rx="7" className="svg-pill" />
      <text x="144" y="77" textAnchor="middle" className="svg-mono">tuple</text>
      <rect x="114" y="86" width="60" height="14" rx="7" className="svg-pill" />
      <text x="144" y="97" textAnchor="middle" className="svg-mono">"a" | "b"</text>
    </svg>
  );
}

// 04 — Наследование: extends против &
function SvgExtend() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="extends vs intersection">
      <rect x="70" y="14" width="60" height="26" rx="6" className="svg-row" />
      <text x="100" y="31" textAnchor="middle" className="svg-mono">Person</text>
      <path d="M100 40 V64" className="svg-scan" fill="none" />
      <rect x="20" y="66" width="76" height="26" rx="6" className="svg-row svg-row--match" />
      <rect x="104" y="66" width="76" height="26" rx="6" className="svg-row svg-row--match" />
      <text x="58" y="83" textAnchor="middle" className="svg-mono">extends</text>
      <text x="142" y="83" textAnchor="middle" className="svg-mono">&amp;</text>
      <rect x="20" y="100" width="160" height="18" rx="5" className="svg-fixed" />
      <text x="100" y="113" textAnchor="middle" className="svg-mono">Employee</text>
    </svg>
  );
}

// 05 — Правило команды: один стиль на весь проект
function SvgRule() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="team rule">
      <rect x="20" y="30" width="70" height="70" rx="10" className="svg-panel" />
      <text x="55" y="60" textAnchor="middle" className="svg-mono">interface</text>
      <text x="55" y="80" textAnchor="middle" className="svg-mono">объект/props</text>
      <rect x="110" y="30" width="70" height="70" rx="10" className="svg-panel" />
      <text x="145" y="60" textAnchor="middle" className="svg-mono">type</text>
      <text x="145" y="80" textAnchor="middle" className="svg-mono">union/utils</text>
      <circle cx="100" cy="65" r="12" className="svg-pulse" />
      <circle cx="100" cy="65" r="6" className="svg-accent-fill" />
    </svg>
  );
}

const SVGS = [SvgSame, SvgMerge, SvgScope, SvgExtend, SvgRule];

export default function TsGuide() {
  const lang = useAppStore((s) => s.lang);
  const t = translations[lang];

  return (
    <div className="page">
      <section className="section">
        <span className="badge">TypeScript</span>
        <h1 className="section__title" style={{ marginTop: 12 }}>{t.tsTitle}</h1>
        <p className="lead">{t.tsLead}</p>
      </section>

      <section className="section guide">
        {t.tsSteps.map((s, i) => {
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

      <p className="lead" style={{ textAlign: "center" }}>{t.tsOutro}</p>
    </div>
  );
}
