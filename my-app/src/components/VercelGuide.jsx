import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import { highlight } from "./highlight";
import "../App.css";

/* Живые SVG — по одной на каждый шаг деплоя через Vercel. */

// 01 — Код уходит на GitHub: локальный репо → облако
function SvgPush() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="push to GitHub">
      <rect x="14" y="46" width="70" height="38" rx="8" className="svg-panel" />
      <text x="49" y="70" textAnchor="middle" className="svg-mono">local</text>
      <path d="M86 65 H150" className="svg-scan" fill="none" />
      <path d="M142 57 L152 65 L142 73" className="svg-scan" fill="none" />
      <circle cx="168" cy="65" r="22" className="svg-slot" />
      <text x="168" y="70" textAnchor="middle" className="svg-mono">git</text>
      <text x="118" y="52" textAnchor="middle" className="svg-mono">push</text>
    </svg>
  );
}

// 02 — Вход в Vercel через GitHub: OAuth-рукопожатие
function SvgLogin() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="login with GitHub">
      <rect x="16" y="40" width="66" height="50" rx="8" className="svg-panel" />
      <text x="49" y="69" textAnchor="middle" className="svg-mono">Vercel</text>
      <path d="M84 55 H116" className="svg-scan" fill="none" />
      <path d="M116 75 H84" className="svg-scan" fill="none" />
      <path d="M92 49 L82 55 L92 61 M108 69 L118 75 L108 81" className="svg-scan" fill="none" />
      <rect x="118" y="40" width="66" height="50" rx="8" className="svg-slot" />
      <text x="151" y="63" textAnchor="middle" className="svg-mono">GitHub</text>
      <text x="151" y="79" textAnchor="middle" className="svg-mono svg-mono--light">OAuth</text>
      <text x="100" y="46" textAnchor="middle" className="svg-mono">token</text>
    </svg>
  );
}

// 03 — Import: выбор репозитория из списка
function SvgImport() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="import repository">
      <rect x="24" y="22" width="152" height="86" rx="8" className="svg-panel" />
      <rect x="36" y="34" width="128" height="18" rx="5" className="svg-row" />
      <rect x="36" y="56" width="128" height="18" rx="5" className="svg-row svg-row--match" />
      <rect x="36" y="78" width="128" height="18" rx="5" className="svg-row" />
      <text x="100" y="68" textAnchor="middle" className="svg-mono">my-app</text>
      <text x="150" y="68" textAnchor="middle" className="svg-mono svg-mono--light">Import</text>
    </svg>
  );
}

// 04 — Build settings: Vercel сам угадал Vite-пресет
function SvgBuild() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="build settings">
      <rect x="20" y="24" width="160" height="20" rx="5" className="svg-fixed" />
      <text x="100" y="38" textAnchor="middle" className="svg-mono">Framework: Vite</text>
      <rect x="20" y="52" width="160" height="18" rx="5" className="svg-url" />
      <text x="100" y="65" textAnchor="middle" className="svg-mono svg-mono--light">vite build</text>
      <rect x="20" y="78" width="160" height="18" rx="5" className="svg-url" />
      <text x="100" y="91" textAnchor="middle" className="svg-mono svg-mono--light">dist/</text>
      <circle cx="176" cy="106" r="9" className="svg-accent-fill" />
      <text x="176" y="110" textAnchor="middle" className="svg-mono svg-mono--light">✓</text>
    </svg>
  );
}

// 05 — SPA rewrite: любой путь → index.html (нет 404 на /todo)
function SvgRewrite() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="SPA rewrite">
      <rect x="14" y="30" width="60" height="22" rx="6" className="svg-row" />
      <rect x="14" y="58" width="60" height="22" rx="6" className="svg-row" />
      <rect x="14" y="86" width="60" height="22" rx="6" className="svg-row" />
      <text x="44" y="45" textAnchor="middle" className="svg-mono">/todo</text>
      <text x="44" y="73" textAnchor="middle" className="svg-mono">/motion</text>
      <text x="44" y="101" textAnchor="middle" className="svg-mono">/router</text>
      <path d="M76 41 Q110 69 128 69 M76 69 H128 M76 97 Q110 69 128 69"
        className="svg-scan" fill="none" />
      <rect x="130" y="56" width="56" height="26" rx="6" className="svg-row--match" />
      <text x="158" y="73" textAnchor="middle" className="svg-mono">index.html</text>
    </svg>
  );
}

// 06 — CI/CD: push → авто-билд → прод. Preview на каждую ветку.
function SvgAuto() {
  return (
    <svg viewBox="0 0 200 130" className="guide-svg" role="img" aria-label="auto deploy on push">
      <circle cx="30" cy="65" r="14" className="svg-slot" />
      <text x="30" y="69" textAnchor="middle" className="svg-mono">push</text>
      <path d="M46 65 H74" className="svg-scan" fill="none" />
      <path d="M66 59 L76 65 L66 71" className="svg-scan" fill="none" />
      <rect x="78" y="51" width="44" height="28" rx="7" className="svg-panel" />
      <text x="100" y="69" textAnchor="middle" className="svg-mono">build</text>
      <path d="M124 65 H152" className="svg-scan" fill="none" />
      <path d="M144 59 L154 65 L144 71" className="svg-scan" fill="none" />
      <circle cx="172" cy="65" r="16" className="svg-pulse" />
      <circle cx="172" cy="65" r="8" className="svg-accent-fill" />
      <text x="172" y="98" textAnchor="middle" className="svg-mono svg-mono--light">live</text>
    </svg>
  );
}

const SVGS = [SvgPush, SvgLogin, SvgImport, SvgBuild, SvgRewrite, SvgAuto];

export default function VercelGuide() {
  const lang = useAppStore((s) => s.lang);
  const t = translations[lang];

  return (
    <div className="page">
      <section className="section">
        <span className="badge">Deploy</span>
        <h1 className="section__title" style={{ marginTop: 12 }}>{t.vercelTitle}</h1>
        <p className="lead">{t.vercelLead}</p>
      </section>

      <section className="section guide">
        {t.vercelSteps.map((s, i) => {
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

      <p className="lead" style={{ textAlign: "center" }}>{t.vercelOutro}</p>
    </div>
  );
}
