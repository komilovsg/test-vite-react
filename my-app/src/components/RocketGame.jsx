import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import styles from "./MotionGuide.module.css";
import "../App.css";

// RocketGame — мини-игра в духе Flappy/Mario: ведёшь ракету мышью/пальцем
// (или стрелками), уворачиваешься от преград, каждые 5 проходов — новый уровень.
// ponytail: игровой цикл на requestAnimationFrame, состояние в ref, а re-render
//           дёргаем счётчиком кадра. Хватает для пары преград, без игрового движка.
const ROCKET_X = 80;
const ROCKET_SIZE = 34;
const GAP_H = 130;
const OBST_W = 44;

export default function RocketGame() {
  const areaRef = useRef(null);
  const [, setTick] = useState(0); // форсим перерисовку каждого кадра
  const [status, setStatus] = useState("ready"); // ready | playing | over
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  // изменяемое состояние игры живёт в ref — не пересоздаётся между кадрами
  const g = useRef({
    y: 170,
    targetY: 170,
    obstacles: [],
    spawnX: 0,
    raf: 0,
  });

  const start = () => {
    const h = areaRef.current?.clientHeight ?? 380;
    g.current = { y: h / 2, targetY: h / 2, obstacles: [], spawnX: 0, raf: 0 };
    setScore(0);
    setLevel(1);
    setStatus("playing");
  };

  useEffect(() => {
    if (status !== "playing") return;
    const area = areaRef.current;
    let scoreLocal = 0;

    const loop = () => {
      const W = area.clientWidth;
      const H = area.clientHeight;
      const st = g.current;
      const speed = 2.6 + (Math.floor(scoreLocal / 5)) * 0.7;

      // ракета плавно тянется к цели
      st.y += (st.targetY - st.y) * 0.18;
      st.y = Math.max(0, Math.min(H - ROCKET_SIZE, st.y));

      // спавн новых преград
      st.spawnX -= speed;
      if (st.spawnX <= 0) {
        const gapY = 30 + Math.random() * (H - GAP_H - 60);
        st.obstacles.push({ x: W, gapY, passed: false });
        st.spawnX = 260; // расстояние между преградами
      }

      // движение + скоринг + столкновения
      const rTop = st.y;
      const rBot = st.y + ROCKET_SIZE;
      const rL = ROCKET_X;
      const rR = ROCKET_X + ROCKET_SIZE;
      for (const o of st.obstacles) {
        o.x -= speed;
        if (!o.passed && o.x + OBST_W < rL) {
          o.passed = true;
          scoreLocal += 1;
          setScore(scoreLocal);
          const lvl = Math.floor(scoreLocal / 5) + 1;
          setLevel((prev) => {
            if (lvl > prev) toast.success(`Уровень ${lvl}! 🚀`);
            return lvl;
          });
        }
        const overlapX = rR > o.x && rL < o.x + OBST_W;
        const hitBars = rTop < o.gapY || rBot > o.gapY + GAP_H;
        if (overlapX && hitBars) {
          setStatus("over");
          toast.error(`Разбились! Счёт: ${scoreLocal}`);
          return; // стоп-кадр, следующий rAF не планируем
        }
      }
      st.obstacles = st.obstacles.filter((o) => o.x + OBST_W > -10);

      setTick((t) => t + 1);
      st.raf = requestAnimationFrame(loop);
    };

    g.current.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(g.current.raf);
  }, [status]);

  // управление
  const onPointer = (e) => {
    const r = areaRef.current.getBoundingClientRect();
    g.current.targetY = e.clientY - r.top - ROCKET_SIZE / 2;
  };
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") g.current.targetY -= 40;
      if (e.key === "ArrowDown") g.current.targetY += 40;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const st = g.current;
  const H = areaRef.current?.clientHeight ?? 380;

  return (
    <div className={styles.wrap}>
      <Link className={styles.back} to="/motion">← ко всем анимациям</Link>
      <h1 className={styles.detailHead}>🚀 Rocket Run</h1>
      <p className={styles.detailDesc}>
        Веди ракету мышью или пальцем (стрелки ↑↓ тоже работают). Пролетай в
        просветы, каждые 5 преград — новый уровень и скорость выше.
      </p>

      <div
        className={styles.game}
        ref={areaRef}
        onPointerMove={status === "playing" ? onPointer : undefined}
      >
        <div className={styles.gameHud}>
          <span>Счёт: {score}</span>
          <span>Уровень: {level}</span>
        </div>

        {/* ракета */}
        <div
          className={styles.gameRocket}
          style={{ left: ROCKET_X, top: st.y, transform: "rotate(90deg)" }}
        >
          🚀
        </div>

        {/* преграды: верхний и нижний бар с просветом */}
        {status === "playing" &&
          st.obstacles.map((o, i) => (
            <div key={i}>
              <div
                className={styles.obstacle}
                style={{ left: o.x, top: 0, width: OBST_W, height: o.gapY }}
              />
              <div
                className={styles.obstacle}
                style={{
                  left: o.x,
                  top: o.gapY + GAP_H,
                  width: OBST_W,
                  height: Math.max(0, H - o.gapY - GAP_H),
                }}
              />
            </div>
          ))}

        {status !== "playing" && (
          <div className={styles.gameOver}>
            {status === "over" ? (
              <>
                <h2 style={{ margin: 0 }}>💥 Игра окончена</h2>
                <p style={{ margin: 0 }}>Счёт: {score} · уровень {level}</p>
              </>
            ) : (
              <h2 style={{ margin: 0 }}>Готов лететь?</h2>
            )}
            <button className={styles.magnet} onClick={start}>
              {status === "over" ? "Ещё раз" : "Старт"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
