import { Link, useParams } from "react-router-dom";
import { DEMO_BY_ID } from "./motionDemos";
import { highlight } from "./highlight";
import styles from "./MotionGuide.module.css";
import "../App.css";

// MotionDemoPage — индивидуальная страница одной анимации: описание,
// живое демо и полный исходник. Данные берём из реестра по :id.
export default function MotionDemoPage() {
  const { id } = useParams();
  const demo = DEMO_BY_ID[id];

  if (!demo) {
    return (
      <div className={styles.wrap}>
        <Link className={styles.back} to="/motion">← ко всем анимациям</Link>
        <p>Анимация «{id}» не найдена.</p>
      </div>
    );
  }

  const Comp = demo.Comp;
  return (
    <div className={styles.wrap}>
      <Link className={styles.back} to="/motion">← ко всем анимациям</Link>

      <span className="badge">motion.dev</span>
      <h1 className={styles.detailHead}>{demo.title}</h1>
      <p className={styles.detailDesc}>{demo.desc}</p>

      {/* живое демо */}
      <div className={styles.stage}>
        <Comp />
      </div>

      <h3 style={{ margin: "0 0 8px" }}>Полный код</h3>
      <pre className="code guide-code" style={{ maxWidth: "100%" }}>
        <code
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          dangerouslySetInnerHTML={{ __html: highlight(demo.code) }}
        />
      </pre>
    </div>
  );
}
