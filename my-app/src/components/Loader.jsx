import { motion } from "motion/react";

// Loader — крутящийся спиннер на Motion. Тема через currentColor/var(--accent).
// fullscreen: занимает всю область страницы (фолбэк для Suspense при загрузке чанка).
export default function Loader({ fullscreen = false, size = 40, label = "Загрузка…" }) {
  const box = fullscreen
    ? { minHeight: "60vh", display: "grid", placeItems: "center", gap: 14 }
    : { display: "inline-grid", placeItems: "center", gap: 10 };

  return (
    <div style={box} role="status" aria-live="polite">
      <motion.span
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `${Math.max(3, size / 12)}px solid var(--border)`,
          borderTopColor: "var(--accent)",
          display: "block",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 0.8 }}
      />
      {label && <span style={{ color: "var(--muted)", fontSize: 14 }}>{label}</span>}
    </div>
  );
}
