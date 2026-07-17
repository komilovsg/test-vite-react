import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { useAppStore } from "../store/useAppStore";
import { DEMOS, Typewriter, CylinderGallery } from "./motionDemos";
import styles from "./MotionGuide.module.css";
import "../App.css";

// MotionGuide — индекс-галерея анимаций на Motion (motion.dev).
// У каждой анимации своя страница /motion/:id с описанием и полным кодом.
export default function MotionGuide() {
  const theme = useAppStore((s) => s.theme);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className={styles.wrap}>
      <motion.div className={styles.progress} style={{ scaleX }} />

      <section className={styles.hero}>
        <span className="badge">motion.dev · {theme}</span>
        <h1 className={styles.heroTitle}>
          Анимации, которые <span className={styles.grad}>стоят дорого</span>
        </h1>
        <p className={styles.heroSub}>
          <Typewriter text="Скролл, пружины, конфетти, 3D, drag — жми на карточку, чтобы открыть разбор и код." />
        </p>
      </section>

      {/* фичевый цилиндр прямо на индексе */}
      <section className={styles.cylSection}>
        <h2 className={styles.cylHead}>3D cylinder gallery</h2>
        <p style={{ color: "var(--muted)", margin: "0 0 12px" }}>
          Крутится сам, тяни мышью/пальцем.
        </p>
        <CylinderGallery />
      </section>

      {/* мини-игра */}
      <section className={styles.cylSection}>
        <div className={styles.card} style={{ minHeight: 0 }}>
          <h3>🚀 Rocket Run — мини-игра</h3>
          <p>Управляй ракетой, уворачивайся от преград, проходи уровни.</p>
          <Link className={styles.cardLink} to="/motion/game">
            играть →
          </Link>
        </div>
      </section>

      {/* галерея всех анимаций */}
      <div className={styles.grid}>
        {DEMOS.map((d) => {
          const Comp = d.Comp;
          return (
            <motion.article
              key={d.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h3>{d.title}</h3>
              <p>{d.text}</p>
              <div className={styles.cardDemo}>
                <Comp />
              </div>
              <Link className={styles.cardLink} to={`/motion/${d.id}`}>
                разбор и код →
              </Link>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
