import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import { highlight } from "./highlight";
import "../App.css";

/* Живые SVG — по одной на каждый шаг. Анимации в App.css. */

// 01 — Два файла-словаря: ru.js и en.js.
function SvgFiles() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="ru.js and en.js files">
      <rect x="22" y="26" width="70" height="80" rx="8" className="svg-panel" />
      <rect x="22" y="26" width="70" height="20" rx="8" className="svg-bar" />
      <text x="57" y="40" textAnchor="middle" className="svg-mono">ru.js</text>
      <text x="57" y="66" textAnchor="middle" className="svg-mono">navHome:</text>
      <text x="57" y="80" textAnchor="middle" className="svg-mono">"Главная"</text>

      <rect x="108" y="26" width="70" height="80" rx="8" className="svg-panel" />
      <rect x="108" y="26" width="70" height="20" rx="8" className="svg-bar" />
      <text x="143" y="40" textAnchor="middle" className="svg-mono">en.js</text>
      <text x="143" y="66" textAnchor="middle" className="svg-mono">navHome:</text>
      <text x="143" y="80" textAnchor="middle" className="svg-mono">"Home"</text>
    </svg>
  );
}

// 02 — Язык хранится в Zustand-сторе, вытекает наружу без Provider.
function SvgStore() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="lang in Zustand store">
      <rect x="18" y="34" width="90" height="62" rx="10" className="svg-slot" />
      <text x="63" y="28" textAnchor="middle" className="svg-mono">useAppStore</text>
      <rect x="30" y="46" width="66" height="16" rx="3" className="svg-row svg-row--match" />
      <text x="40" y="58" className="svg-mono">lang: "ru"</text>
      <rect x="30" y="68" width="66" height="16" rx="3" className="svg-row" />
      <text x="40" y="80" className="svg-mono">toggleLang</text>
      <circle cx="118" cy="65" r="5" className="svg-flow" />
      <rect x="150" y="52" width="40" height="26" rx="6" className="svg-row" />
      <text x="170" y="69" textAnchor="middle" className="svg-mono">компонент</text>
    </svg>
  );
}

// 03 — Кнопка RU/EN дёргает toggleLang (живой toggle).
function SvgToggle() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="toggleLang button">
      <g className="svg-toggle">
        <rect x="40" y="34" width="54" height="30" rx="8" className="svg-accent-fill" />
        <text x="67" y="54" textAnchor="middle" className="svg-mono svg-mono--light">RU</text>
      </g>
      <g className="svg-toggle" style={{ animationDelay: "1.3s" }}>
        <rect x="106" y="34" width="54" height="30" rx="8" className="svg-row" />
        <text x="133" y="54" textAnchor="middle" className="svg-mono">EN</text>
      </g>
      <rect x="34" y="80" width="132" height="24" rx="6" className="svg-row svg-row--match" />
      <text x="100" y="96" textAnchor="middle" className="svg-mono">onClick={'{toggleLang}'}</text>
    </svg>
  );
}

// 04 — translations[lang] достаёт нужный текст (swap ru/en).
function SvgPick() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="translations[lang]">
      <rect x="30" y="24" width="140" height="24" rx="6" className="svg-row" />
      <text x="100" y="40" textAnchor="middle" className="svg-mono">translations[lang].navHome</text>
      <path d="M100 50 L100 70" className="svg-path" />
      <g className="svg-swap">
        <rect x="46" y="74" width="108" height="24" rx="6" className="svg-row svg-row--match" />
        <text x="100" y="90" textAnchor="middle" className="svg-mono">Главная / Home</text>
      </g>
    </svg>
  );
}

// 05 — Терминал: библиотека i18next (следующий шаг).
function SvgNext() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="install i18next">
      <rect x="12" y="20" width="176" height="90" rx="10" className="svg-panel" />
      <rect x="12" y="20" width="176" height="22" rx="10" className="svg-bar" />
      <circle cx="26" cy="31" r="3.5" className="svg-dot-r" />
      <circle cx="38" cy="31" r="3.5" className="svg-dot-y" />
      <circle cx="50" cy="31" r="3.5" className="svg-dot-g" />
      <text x="24" y="64" className="svg-mono">$ npm install</text>
      <text x="24" y="82" className="svg-mono">i18next react-i18next</text>
      <rect x="150" y="74" width="6" height="11" className="svg-caret" />
    </svg>
  );
}

const SVGS = [SvgFiles, SvgStore, SvgToggle, SvgPick, SvgNext];

export default function I18nGuide() {
  const lang = useAppStore((s) => s.lang); // ZUSTAND: подписка на язык из стора
  const t = translations[lang];

  return (
    <div className="page">
      <section className="section">
        <span className="badge">i18next · react-i18next</span>
        <h1 className="section__title" style={{ marginTop: 12 }}>{t.i18nTitle}</h1>
        <p className="lead">{t.i18nLead}</p>
      </section>

      <section className="section guide">
        {t.i18nSteps.map((s, i) => {
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

      <p className="lead" style={{ textAlign: "center" }}>{t.i18nOutro}</p>
    </div>
  );
}
