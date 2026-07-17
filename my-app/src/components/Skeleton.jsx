import "./skeleton.css";

// Skeleton — переливающийся плейсхолдер под контент, который ещё грузится.
// Задаём размеры пропсами; shimmer и цвета темы — в skeleton.css.
export default function Skeleton({ width = "100%", height = 12, radius = 8, style }) {
  return <span className="skeleton" style={{ width, height, borderRadius: radius, ...style }} />;
}
