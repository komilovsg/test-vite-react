import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useAnimate,
  AnimatePresence,
  useSpring,
  useTransform,
  useMotionValue,
} from "motion/react";
import styles from "./MotionGuide.module.css";

/* ===================================================================
   motionDemos — единый реестр анимаций для страницы /motion.
   Каждая запись: { id, title, text, desc, Comp, code }.
   Индекс-галерея и страница-деталь /motion/:id берут данные отсюда —
   компонент и его код лежат в одном месте, дублей нет.
=================================================================== */

/* ---------- 1. Typewriter ---------- */
export function Typewriter({ text = "Печатаю текст по буквам…" }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const id = setInterval(() => setN((v) => v + 1), 55);
    return () => clearInterval(id);
  }, [n, text]);
  return (
    <span>
      {text.slice(0, n)}
      <motion.span
        className={styles.caret}
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.7 }}
      >
        &nbsp;
      </motion.span>
    </span>
  );
}

/* ---------- 2. Magnetic button ---------- */
export function MagneticButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 12 });
  const sy = useSpring(y, { stiffness: 200, damping: 12 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.5);
    y.set((e.clientY - r.top - r.height / 2) * 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.button
      className={styles.magnet}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.94 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      Наведи на меня
    </motion.button>
  );
}

/* ---------- 3. Celebrate confetti ---------- */
const CONFETTI_COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#22c55e", "#06b6d4", "#ef4444"];
export function CelebrateButton() {
  const [burst, setBurst] = useState(0);
  const [pieces, setPieces] = useState([]);
  const fire = () => {
    const next = Array.from({ length: 34 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 34 + Math.random() * 0.4;
      const dist = 80 + Math.random() * 120;
      return {
        id: `${burst}-${i}`,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 40,
        rot: Math.random() * 720 - 360,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      };
    });
    setPieces(next);
    setBurst((b) => b + 1);
  };
  return (
    <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            className={styles.confetti}
            style={{ background: p.color }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rot }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
      <motion.button className={styles.pill} whileTap={{ scale: 0.92 }} onClick={fire}>
        🎉 Celebrate
      </motion.button>
    </div>
  );
}

/* ---------- 4. Like button ---------- */
export function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(128);
  const toggle = () => {
    setLiked((v) => !v);
    setCount((c) => c + (liked ? -1 : 1));
  };
  return (
    <button className={styles.pill} onClick={toggle} style={{ position: "relative" }}>
      <motion.span
        animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.35 }}
        style={{ fontSize: 18, lineHeight: 1 }}
      >
        {liked ? "❤️" : "🤍"}
      </motion.span>
      <AnimatePresence>
        {liked &&
          Array.from({ length: 6 }).map((_, i) => (
            <motion.span
              key={i}
              style={{
                position: "absolute",
                left: 18,
                top: "50%",
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#ec4899",
                pointerEvents: "none",
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: 1,
                x: Math.cos((Math.PI * 2 * i) / 6) * 22,
                y: Math.sin((Math.PI * 2 * i) / 6) * 22,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
      </AnimatePresence>
      <span style={{ overflow: "hidden", height: 20, display: "inline-block" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={count}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: "inline-block" }}
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}

/* ---------- 5. 3D tilt ---------- */
export function TiltCard() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 200, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 15 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };
  return (
    <div style={{ perspective: 700 }} onMouseMove={onMove} onMouseLeave={reset}>
      <motion.div className={styles.tilt} style={{ rotateX: rx, rotateY: ry }}>
        3D tilt
      </motion.div>
    </div>
  );
}

/* ---------- 6. Skeleton shimmer ---------- */
export function SkeletonDemo() {
  const [loading, setLoading] = useState(true);
  return (
    <div style={{ width: "100%", display: "grid", gap: 10 }}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="skel" style={{ display: "flex", gap: 12 }} exit={{ opacity: 0 }}>
            <div className={`${styles.skel} ${styles.skelBox}`} />
            <div style={{ flex: 1, display: "grid", gap: 8 }}>
              <div className={`${styles.skel} ${styles.skelLine}`} style={{ width: "80%" }} />
              <div className={`${styles.skel} ${styles.skelLine}`} style={{ width: "55%" }} />
              <div className={`${styles.skel} ${styles.skelLine}`} style={{ width: "70%" }} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="real"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", gap: 12, alignItems: "center" }}
          >
            <div className={styles.skelBox} style={{ background: "var(--accent)" }} />
            <div>
              <strong>Готово ✨</strong>
              <p style={{ margin: 0 }}>Контент загружен.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button className={styles.ghostBtn} onClick={() => setLoading((v) => !v)}>
        {loading ? "загрузить" : "сброс"}
      </button>
    </div>
  );
}

/* ---------- 7. Drag & drop ---------- */
export function DragDemo() {
  const ref = useRef(null);
  return (
    <div className={styles.dragArea} ref={ref}>
      <motion.div
        className={styles.dragChip}
        drag
        dragConstraints={ref}
        dragElastic={0.4}
        whileDrag={{ scale: 1.15 }}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 18 }}
      >
        ✦
      </motion.div>
    </div>
  );
}

/* ---------- 8. Icon draw ---------- */
export function DrawIcon() {
  const [k, setK] = useState(0);
  return (
    <div style={{ display: "grid", placeItems: "center", gap: 12 }}>
      <div className={styles.iconWrap}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            key={k}
            d="M20 6 9 17l-5-5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </svg>
      </div>
      <button className={styles.ghostBtn} onClick={() => setK((v) => v + 1)}>
        ▶ проиграть
      </button>
    </div>
  );
}

/* ---------- 9. Scroll reveal ---------- */
export function ScrollRevealDemo() {
  const [k, setK] = useState(0);
  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }} key={k}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
          }}
        >
          строка {i + 1} выехала
        </motion.div>
      ))}
      <button className={styles.ghostBtn} onClick={() => setK((v) => v + 1)}>
        ▶ проиграть заново
      </button>
    </div>
  );
}

/* ---------- 10. 3D cylinder gallery ---------- */
const CYL = [
  { emoji: "🎨", c: "#6366f1" },
  { emoji: "🚀", c: "#ec4899" },
  { emoji: "⚡", c: "#f59e0b" },
  { emoji: "🌈", c: "#22c55e" },
  { emoji: "💎", c: "#06b6d4" },
  { emoji: "🔥", c: "#ef4444" },
  { emoji: "✨", c: "#8b5cf6" },
  { emoji: "🎯", c: "#14b8a6" },
];
export function CylinderGallery() {
  const count = CYL.length;
  const step = 360 / count;
  const radius = 240;
  const auto = useMotionValue(0);
  const drag = useMotionValue(0);
  const rotateY = useTransform(() => auto.get() + drag.get());
  useEffect(() => {
    const controls = animate(auto, 360, { duration: 26, ease: "linear", repeat: Infinity });
    return () => controls.stop();
  }, [auto]);
  const last = useRef(null);
  const onDown = (e) => {
    last.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (last.current == null) return;
    drag.set(drag.get() + (e.clientX - last.current) * 0.4);
    last.current = e.clientX;
  };
  const onUp = () => {
    last.current = null;
  };
  return (
    <div
      className={styles.cylScene}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
    >
      <motion.div className={styles.cylRing} style={{ rotateY }}>
        {CYL.map((item, i) => (
          <div
            key={i}
            className={styles.cylItem}
            style={{
              background: `linear-gradient(135deg, ${item.c}, ${CYL[(i + 3) % count].c})`,
              transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- 11. Click pulse (keyframe scale) ---------- */
export function ClickPulse() {
  const [scope, run] = useAnimate();
  const pulse = () =>
    run(
      scope.current,
      { scale: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1] },
      { duration: 1, times: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1] }
    );
  return (
    <button ref={scope} className={styles.magnet} onClick={pulse}>
      click
    </button>
  );
}

/* ---------- 12. Rocket drag (инерция + поворот по направлению) ---------- */
export function RocketDrag() {
  const ref = useRef(null);
  const angle = useMotionValue(0);
  const last = useRef(null);
  const onMove = (e) => {
    if (!last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    if (Math.hypot(dx, dy) > 6) {
      angle.set((Math.atan2(dy, dx) * 180) / Math.PI + 90);
      last.current = { x: e.clientX, y: e.clientY };
    }
  };
  return (
    <div
      className={styles.dragArea}
      style={{ height: 130 }}
      ref={ref}
      onPointerDown={(e) => (last.current = { x: e.clientX, y: e.clientY })}
      onPointerMove={onMove}
      onPointerUp={() => (last.current = null)}
    >
      <motion.div
        className={styles.rocket}
        style={{ rotate: useSpring(angle, { stiffness: 300, damping: 20 }) }}
        drag
        dragConstraints={ref}
        dragElastic={0.3}
        whileDrag={{ scale: 1.2 }}
        dragTransition={{ power: 0.4, timeConstant: 200 }}
      >
        🚀
      </motion.div>
    </div>
  );
}

/* ===================================================================
   Реестр: порядок = порядок в галерее. code — полный исходник компонента.
=================================================================== */
export const DEMOS = [
  {
    id: "typewriter",
    title: "Typewriter",
    text: "Текст печатается по буквам с мигающим курсором.",
    desc: "Печатающийся текст — классика hero-секций. Здесь символы открываются по таймеру, а курсор мигает бесконечной анимацией opacity через Motion. Сам текст режем срезом строки по индексу.",
    Comp: Typewriter,
    code: `import { useEffect, useState } from "react";
import { motion } from "motion/react";

function Typewriter({ text }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (n >= text.length) return;
    const id = setInterval(() => setN((v) => v + 1), 55);
    return () => clearInterval(id);
  }, [n, text]);

  return (
    <span>
      {text.slice(0, n)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.7 }}
      >
        &nbsp;
      </motion.span>
    </span>
  );
}`,
  },
  {
    id: "magnetic",
    title: "Magnetic button",
    text: "Кнопка тянется за курсором и пружиной возвращается.",
    desc: "«Магнитная» кнопка притягивается к курсору. Позицию считаем от центра кнопки, умножаем на коэффициент и кладём в motion value. useSpring делает движение упругим, а на уходе мыши возвращаем в ноль.",
    Comp: MagneticButton,
    code: `import { motion, useMotionValue, useSpring } from "motion/react";

function MagneticButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 12 });
  const sy = useSpring(y, { stiffness: 200, damping: 12 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.5);
    y.set((e.clientY - r.top - r.height / 2) * 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.94 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      Наведи на меня
    </motion.button>
  );
}`,
  },
  {
    id: "celebrate",
    title: "Celebrate 🎉",
    text: "Взрыв конфетти по клику — micro-interaction.",
    desc: "Микро-взаимодействие «празднования». По клику генерим массив частиц со случайным углом, дистанцией, поворотом и цветом. AnimatePresence проигрывает разлёт с затуханием. Такое встречается в дорогих продуктах на важных действиях.",
    Comp: CelebrateButton,
    code: `import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#22c55e", "#06b6d4"];

function CelebrateButton() {
  const [pieces, setPieces] = useState([]);

  const fire = () => setPieces(
    Array.from({ length: 34 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 34 + Math.random() * 0.4;
      const dist = 80 + Math.random() * 120;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 40,
        rot: Math.random() * 720 - 360,
        color: COLORS[i % COLORS.length],
      };
    })
  );

  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            style={{ background: p.color, position: "absolute" }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rot }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
      <button onClick={fire}>🎉 Celebrate</button>
    </div>
  );
}`,
  },
  {
    id: "like",
    title: "Like button",
    text: "Сердце пружинит, вылетают частицы, счётчик прокручивается.",
    desc: "Кнопка лайка в духе uicapsule. Сердце делает keyframe-скейл, из точки вылетают 6 частиц по кругу, а число меняется через AnimatePresence с mode=popLayout — старое уезжает вверх, новое приезжает снизу.",
    Comp: LikeButton,
    code: `import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(128);

  const toggle = () => {
    setLiked((v) => !v);
    setCount((c) => c + (liked ? -1 : 1));
  };

  return (
    <button onClick={toggle} style={{ position: "relative" }}>
      <motion.span animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}>
        {liked ? "❤️" : "🤍"}
      </motion.span>

      <span style={{ overflow: "hidden", display: "inline-block" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={count}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}`,
  },
  {
    id: "tilt",
    title: "3D tilt",
    text: "Карточка наклоняется в 3D за движением мыши.",
    desc: "3D-наклон за курсором. Нормализуем позицию мыши внутри карточки в диапазон -0.5…0.5, useTransform превращает это в углы rotateX/rotateY, useSpring сглаживает. Родителю нужен perspective, карточке — transform-style: preserve-3d.",
    Comp: TiltCard,
    code: `import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

function TiltCard() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]));
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]));

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <div style={{ perspective: 700 }} onMouseMove={onMove} onMouseLeave={reset}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
        3D tilt
      </motion.div>
    </div>
  );
}`,
  },
  {
    id: "skeleton",
    title: "Skeleton shimmer",
    text: "Переливающийся лоадер, плавно сменяется контентом.",
    desc: "Скелетон-заглушка на время загрузки. Переливание делает CSS-градиент, который ездит через ::after. Смену «скелетон → контент» проигрывает AnimatePresence с mode=wait, чтобы старое успело исчезнуть до появления нового.",
    Comp: SkeletonDemo,
    code: `import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function SkeletonDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div key="skel" exit={{ opacity: 0 }}>
          <div className="skeleton" /> {/* shimmer в CSS */}
        </motion.div>
      ) : (
        <motion.div
          key="real"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Готово ✨
        </motion.div>
      )}
    </AnimatePresence>
  );
}`,
  },
  {
    id: "drag",
    title: "Drag & drop",
    text: "Перетаскивание с эластичными границами и инерцией.",
    desc: "Перетаскивание из коробки Motion. Проп drag включает жест, dragConstraints ограничивает область ссылкой на контейнер, dragElastic даёт «резинку» на краях, а dragTransition задаёт упругий возврат с инерцией.",
    Comp: DragDemo,
    code: `import { useRef } from "react";
import { motion } from "motion/react";

function DragDemo() {
  const ref = useRef(null);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <motion.div
        drag
        dragConstraints={ref}
        dragElastic={0.4}
        whileDrag={{ scale: 1.15 }}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 18 }}
      >
        ✦
      </motion.div>
    </div>
  );
}`,
  },
  {
    id: "icon-draw",
    title: "Icon draw",
    text: "SVG-иконка «рисуется» через pathLength.",
    desc: "Иконка рисуется линией. Motion умеет анимировать pathLength у SVG-path от 0 до 1 — линия будто прочерчивается. Кнопка меняет key, из-за чего path перемонтируется и анимация играет заново.",
    Comp: DrawIcon,
    code: `import { useState } from "react";
import { motion } from "motion/react";

function DrawIcon() {
  const [k, setK] = useState(0); // смена key → анимация заново

  return (
    <>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <motion.path
          key={k}
          d="M20 6 9 17l-5-5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </svg>
      <button onClick={() => setK((v) => v + 1)}>▶ проиграть</button>
    </>
  );
}`,
  },
  {
    id: "scroll-reveal",
    title: "Scroll reveal",
    text: "Элементы выезжают при попадании в вид.",
    desc: "Появление по скроллу. whileInView запускает анимацию, когда элемент входит во вьюпорт, viewport.once=true проигрывает один раз. Разные delay дают эффект «лесенки» (stagger).",
    Comp: ScrollRevealDemo,
    code: `import { motion } from "motion/react";

function ScrollReveal() {
  return [0, 1, 2].map((i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.12 }}
    >
      строка {i + 1}
    </motion.div>
  ));
}`,
  },
  {
    id: "cylinder",
    title: "3D cylinder gallery",
    text: "Карточки по кругу цилиндра, вращается и тянется.",
    desc: "Галерея-цилиндр. Каждая карточка развёрнута на свой угол (360/N) и отодвинута по оси Z на радиус — получается кольцо. Весь цилиндр крутим одним rotateY: авто-вращение через animate + ручной сдвиг указателем, суммируем в useTransform.",
    Comp: CylinderGallery,
    code: `import { useEffect, useRef } from "react";
import { motion, animate, useMotionValue, useTransform } from "motion/react";

const ITEMS = ["🎨","🚀","⚡","🌈","💎","🔥","✨","🎯"];

function CylinderGallery() {
  const step = 360 / ITEMS.length;
  const radius = 240;
  const auto = useMotionValue(0);
  const drag = useMotionValue(0);
  const rotateY = useTransform(() => auto.get() + drag.get());

  useEffect(() => {
    const c = animate(auto, 360, { duration: 26, ease: "linear", repeat: Infinity });
    return () => c.stop();
  }, [auto]);

  const last = useRef(null);
  const onMove = (e) => {
    if (last.current == null) return;
    drag.set(drag.get() + (e.clientX - last.current) * 0.4);
    last.current = e.clientX;
  };

  return (
    <div
      style={{ perspective: 1100 }}
      onPointerDown={(e) => (last.current = e.clientX)}
      onPointerUp={() => (last.current = null)}
      onPointerMove={onMove}
    >
      <motion.div style={{ rotateY, transformStyle: "preserve-3d" }}>
        {ITEMS.map((emoji, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              transform: \`rotateY(\${i * step}deg) translateZ(\${radius}px)\`,
            }}
          >
            {emoji}
          </div>
        ))}
      </motion.div>
    </div>
  );
}`,
  },
  {
    id: "click-pulse",
    title: "Click pulse",
    text: "Кнопка «пружинит» по цепочке scale-кадров.",
    desc: "Пульс по клику из набора keyframe-значений scale (сжатие → перелёт → возврат). Проигрываем императивно через useAnimate: на каждый клик запускаем последовательность заново с точными таймингами через параметр times.",
    Comp: ClickPulse,
    code: `import { useAnimate } from "motion/react";

function ClickPulse() {
  const [scope, animate] = useAnimate();

  const pulse = () =>
    animate(
      scope.current,
      { scale: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1] },
      { duration: 1, times: [0, .25, .35, .45, .55, .65, .75, 1] }
    );

  return <button ref={scope} onClick={pulse}>click</button>;
}`,
  },
  {
    id: "rocket",
    title: "Rocket drag",
    text: "Ракета летит за перетаскиванием, с инерцией и поворотом.",
    desc: "Перетаскиваемая ракета с инерцией: dragTransition с power/timeConstant даёт «выброс» по инерции после отпускания. Ракета доворачивается носом по направлению движения — угол считаем через atan2 и сглаживаем пружиной. Отсюда один шаг до мини-игры (см. ниже).",
    Comp: RocketDrag,
    code: `import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

function RocketDrag() {
  const ref = useRef(null);
  const angle = useMotionValue(0);
  const last = useRef(null);

  const onMove = (e) => {
    if (!last.current) return;
    const dx = e.clientX - last.current.x, dy = e.clientY - last.current.y;
    if (Math.hypot(dx, dy) > 6) {
      angle.set(Math.atan2(dy, dx) * 180 / Math.PI + 90);
      last.current = { x: e.clientX, y: e.clientY };
    }
  };

  return (
    <div ref={ref}
      onPointerDown={(e) => (last.current = { x: e.clientX, y: e.clientY })}
      onPointerMove={onMove}
      onPointerUp={() => (last.current = null)}>
      <motion.div
        style={{ rotate: useSpring(angle, { stiffness: 300, damping: 20 }) }}
        drag dragConstraints={ref} dragElastic={0.3}
        whileDrag={{ scale: 1.2 }}
        dragTransition={{ power: 0.4, timeConstant: 200 }}>
        🚀
      </motion.div>
    </div>
  );
}`,
  },
];

export const DEMO_BY_ID = Object.fromEntries(DEMOS.map((d) => [d.id, d]));
