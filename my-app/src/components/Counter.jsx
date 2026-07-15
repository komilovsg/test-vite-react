import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";

// ШАГ 2. Счётчик — первый компонент со своим state.
export default function Counter() {
  // useState возвращает пару: [текущее значение, функция изменения].
  // Вызов setCount(...) говорит React: «данные изменились, перерисуй компонент».
  // Обычная переменная (let count = 0) так не работает — React о ней не знает.
  const [count, setCount] = useState(0);

  const lang = useAppStore((s) => s.lang); // ZUSTAND: подписка на язык из стора
  const t = translations[lang];

  return (
    <section className="counter">
      <h2>
        {t.counter}: {count}
      </h2>

      {/* В setCount передаём функцию (prev => prev + 1), а не count + 1.
          Так React гарантированно берёт самое свежее значение,
          даже если обновлений несколько подряд */}
      <div className="counter__buttons">
        <button className="btn" onClick={() => setCount((prev) => prev - 1)}>
          −1
        </button>
        <button className="btn" onClick={() => setCount((prev) => prev + 1)}>
          +1
        </button>
        <button className="btn" onClick={() => setCount(0)}>
          {t.reset}
        </button>
      </div>
    </section>
  );
}
