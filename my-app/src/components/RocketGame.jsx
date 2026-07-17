import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import styles from "./MotionGuide.module.css";
import "../App.css";

// RocketGame — 2D-полёт: ракета едет за курсором/пальцем во все стороны и
// доворачивается носом по направлению движения (как демо Rocket drag).
// Уворачивайся от преград, собирай ⭐ за бонус-очки, каждые 5 преград — уровень.
// ponytail: цикл на requestAnimationFrame, состояние в ref, re-render дёргаем
//           счётчиком кадра. Без игрового движка — хватает для нескольких тел.
const ROCKET = 34;
const GAP_H = 140;
const OBST_W = 46;
const STAR = 26;

export default function RocketGame() {
  const areaRef = useRef(null);
  const [, setTick] = useState(0);
  const [status, setStatus] = useState("ready"); // ready | playing | over
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const g = useRef(null);

  const start = () => {
    const el = areaRef.current;
    const W = el?.clientWidth ?? 700;
    const H = el?.clientHeight ?? 380;
    g.current = {
      x: W * 0.25,
      y: H / 2,
      tx: W * 0.25,
      ty: H / 2,
      angle: 0,
      obstacles: [],
      stars: [],
      spawnX: 0,
      raf: 0,
    };
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
      const speed = 2.6 + Math.floor(scoreLocal / 5) * 0.7;

      // 2D-движение: плавно тянемся к цели по обеим осям
      const px = st.x;
      const py = st.y;
      st.x += (st.tx - st.x) * 0.16;
      st.y += (st.ty - st.y) * 0.16;
      st.x = Math.max(0, Math.min(W - ROCKET, st.x));
      st.y = Math.max(0, Math.min(H - ROCKET, st.y));

      // поворот носа по направлению движения (только если реально движемся)
      const vx = st.x - px;
      const vy = st.y - py;
      if (Math.hypot(vx, vy) > 0.6) {
        const target = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
        let d = ((target - st.angle + 540) % 360) - 180; // кратчайший путь
        st.angle += d * 0.2;
      }

      // спавн преград + звезды в просвете
      st.spawnX -= speed;
      if (st.spawnX <= 0) {
        const gapY = 30 + Math.random() * (H - GAP_H - 60);
        st.obstacles.push({ x: W, gapY, passed: false });
        st.stars.push({ x: W + OBST_W / 2 - STAR / 2, y: gapY + GAP_H / 2 - STAR / 2, taken: false });
        st.spawnX = 270;
      }

      const rL = st.x, rR = st.x + ROCKET, rT = st.y, rB = st.y + ROCKET;

      // преграды
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
        if (overlapX && (rT < o.gapY || rB > o.gapY + GAP_H)) {
          setStatus("over");
          toast.error(`Разбились! Счёт: ${scoreLocal}`);
          return;
        }
      }
      st.obstacles = st.obstacles.filter((o) => o.x + OBST_W > -10);

      // звёзды-бонусы
      for (const s of st.stars) {
        s.x -= speed;
        if (!s.taken && rR > s.x && rL < s.x + STAR && rB > s.y && rT < s.y + STAR) {
          s.taken = true;
          scoreLocal += 2;
          setScore(scoreLocal);
        }
      }
      st.stars = st.stars.filter((s) => !s.taken && s.x + STAR > -10);

      setTick((t) => t + 1);
      st.raf = requestAnimationFrame(loop);
    };

    g.current.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(g.current.raf);
  }, [status]);

  // управление: 2D за курсором/пальцем
  const onPointer = (e) => {
    const r = areaRef.current.getBoundingClientRect();
    g.current.tx = e.clientX - r.left - ROCKET / 2;
    g.current.ty = e.clientY - r.top - ROCKET / 2;
  };
  useEffect(() => {
    const onKey = (e) => {
      if (!g.current) return;
      const S = 44;
      if (e.key === "ArrowUp") g.current.ty -= S;
      if (e.key === "ArrowDown") g.current.ty += S;
      if (e.key === "ArrowLeft") g.current.tx -= S;
      if (e.key === "ArrowRight") g.current.tx += S;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const st = g.current;

  return (
    <div className={styles.wrap}>
      <Link className={styles.back} to="/motion">← ко всем анимациям</Link>
      <h1 className={styles.detailHead}>🚀 Rocket Run</h1>
      <p className={styles.detailDesc}>
        Веди ракету мышью/пальцем во все стороны (стрелки ←↑↓→ тоже). Нос
        доворачивается по движению. Лети в просветы, собирай ⭐ (+2), каждые 5
        преград — новый уровень и скорость выше.
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

        {status === "playing" && st && (
          <>
            {/* ракета — поворот по направлению */}
            <div
              className={styles.gameRocket}
              style={{ left: st.x, top: st.y, transform: `rotate(${st.angle}deg)` }}
            >
              🚀
            </div>

            {/* звёзды */}
            {st.stars.map((s, i) => (
              <div
                key={`s${i}`}
                style={{ position: "absolute", left: s.x, top: s.y, fontSize: STAR, zIndex: 2 }}
              >
                ⭐
              </div>
            ))}

            {/* преграды */}
            {st.obstacles.map((o, i) => (
              <div key={i}>
                <div className={styles.obstacle} style={{ left: o.x, top: 0, width: OBST_W, height: o.gapY }} />
                <div
                  className={styles.obstacle}
                  style={{ left: o.x, top: o.gapY + GAP_H, width: OBST_W, bottom: 0 }}
                />
              </div>
            ))}
          </>
        )}

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
