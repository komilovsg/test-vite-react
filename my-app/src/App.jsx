import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Counter from "./components/Counter";
import RefDemo from "./components/RefDemo";
import { ThemeContext } from "./store/ThemeContext";
import { LanguageContext } from "./store/LanguageContext";

import "./App.css";
import Layout from "./main-layout/layout";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import HomePage from "./components/HomePage";
import RouterGuide from "./components/RouterGuide";

// App — корневой компонент, «каркас» приложения (ШАГ 3):
// Header сверху, контент посередине, Footer снизу.
function App() {
  // ШАГ 4. State темы живёт здесь, наверху,
  // чтобы раздать его всем компонентам через ThemeContext.Provider.
  const [theme, setTheme] = useState("light");

  // ШАГ 5. State языка — точно так же, но со своим контекстом.
  const [lang, setLang] = useState("ru");

  // ШАГ 4. useEffect — «побочный эффект» после рендера.
  // React управляет только своим деревом внутри #root,
  // а <body> — снаружи. Для работы с внешним миром и нужен useEffect.
  // [theme] — эффект срабатывает только когда тема изменилась.
  useEffect(() => {
    document.body.className = theme; // body.light / body.dark — стили в index.css
  }, [theme]);

  return (
    // Provider «раздаёт» значение всем компонентам внутри.
    // Провайдеры можно вкладывать друг в друга — порядок не важен.
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LanguageContext.Provider value={{ lang, setLang }}>
        {/* //Routes это компонент из react-router-dom, который используется для маршрутизации */}
        {/* //element={<Layout/>} это компонент из react-router-dom, который используется 
        для отображения шаблона страницы */}
        {/* //path="/" это путь к странице */}
        {/* //element={<Home/>} это компонент из react-router-dom, который используется 
        для отображения домашней страницы */}
        {/* //<Route path="/about" element={<AboutPage/>}/> это компонент из react-router-dom,
         который используется для отображения страницы about */}
        {/* //<Route path="/contact" element={<ContactPage/>}/> это компонент из react-router-dom, 
        который используется для отображения страницы contact */}
        {/* //</Routes> это компонент из react-router-dom, который используется для отображения страницы */}
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="/router" element={<RouterGuide/>}/>
          </Route>
        </Routes>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

//пройдем на следующем уроке - ЗУСТАНД

export default App;
