import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext, translations } from "../store/LanguageContext";

// ШАГ 6. useRef — две классические задачи:
// 1) доступ к DOM-элементу (автофокус на input);
// 2) «коробка» для данных, изменение которых НЕ должно вызывать ререндер.
export default function RefDemo() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang];

  // Ссылка на DOM-элемент. После рендера React положит
  // сам <input> в inputRef.current.
  const inputRef = useRef(null);

  // «Коробка»: ref может хранить любое значение, не только DOM.
  // Меняем clicksRef.current — компонент НЕ перерисовывается.
  // Этим ref и отличается от useState.
  const clicksRef = useRef(0);

  // Обычный state — только чтобы показать значение из коробки на экране,
  // когда пользователь сам попросит (кнопкой).
  const [shown, setShown] = useState(null);

  // Пустой массив зависимостей [] = эффект выполнится один раз,
  // после первого рендера. К этому моменту input уже есть в DOM.
  useEffect(() => {
    inputRef.current.focus(); // автофокус
  }, []);

  return (
    <section className="ref-demo">
      <h2>{t.refTitle}</h2>

      {/* ref={inputRef} — так React связывает элемент с ref-объектом */}
      <input ref={inputRef} className="input" placeholder={t.inputPlaceholder} />

      <div className="ref-demo__box">
        {/* Кликаем — счётчик в ref растёт, но на экране цифра НЕ меняется,
            потому что изменение ref не вызывает ререндер */}
        <button className="btn" onClick={() => (clicksRef.current += 1)}>
          {t.clicksInBox}: +1
        </button>

        {/* А эта кнопка меняет state — происходит ререндер,
            и мы видим актуальное значение из коробки */}
        <button className="btn" onClick={() => setShown(clicksRef.current)}>
          {t.showBox}
        </button>

        {shown !== null && <p>ref.current = {shown}</p>}
      </div>
    </section>
  );
}
