import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/Language";
import "../App.css";

// TodoCreate — форма добавления задачи.
// useNavigate — после сохранения программно уводим пользователя на список.
export default function TodoCreate() {
  const lang = useAppStore((s) => s.lang);
  const addTodo = useAppStore((s) => s.addTodo);
  const t = translations[lang].todo;

  const [title, setTitle] = useState(""); // локальное состояние формы — это ок
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const value = title.trim();
    if (!value) return; // пустую задачу не добавляем
    addTodo(value); // сохраняем в Zustand
    navigate("/todo/app"); // редирект на главную (список)
  };

  return (
    <section className="section">
      <h2 className="section__title">{t.createTitle}</h2>
      <form className="todo-form" onSubmit={onSubmit}>
        <label className="todo-field">
          <span>{t.titleLabel}</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.titlePlaceholder}
            autoFocus
          />
        </label>
        <button type="submit" className="btn btn--primary" disabled={!title.trim()}>
          {t.add}
        </button>
      </form>
    </section>
  );
}
