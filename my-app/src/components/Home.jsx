import { useContext } from "react";
import { ThemeContext } from "../store/ThemeContext";

import "./home.styler.css"

export default function Home() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="container">
      <h1 className="title">Компонент Home {theme}</h1>
      <button className={`btn btn-${theme}`} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Смена темы
      </button>
    </div>
  );
}
