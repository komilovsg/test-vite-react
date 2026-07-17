import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppStore } from "./store/useAppStore";

import "./App.css";
import Layout from "./main-layout/Layout";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import HomePage from "./components/HomePage";
import RouterGuide from "./components/RouterGuide";
import ZustandGuide from "./components/ZustandGuide";
import I18nGuide from "./components/I18nGuide";
import ThemeGuide from "./components/ThemeGuide";
import TailwindThemeGuide from "./components/TailwindThemeGuide";
import TodoGuide from "./todo/TodoGuide";
import TodoLayout from "./todo/TodoLayout";
import TodoList from "./todo/TodoList";
import TodoCreate from "./todo/TodoCreate";
import TodoSettings from "./todo/TodoSettings";

// App — корневой компонент, «каркас» приложения.
// РАНЬШЕ здесь жили useState(theme/lang) и два Context.Provider.
// ТЕПЕРЬ состояние переехало в Zustand-стор (src/store/useAppStore.js),
// поэтому здесь НЕТ ни useState, ни Provider — стор доступен компонентам напрямую.
function App() {
  // Подписка на одно поле стора. Компонент перерисуется только когда theme изменится.
  const theme = useAppStore((s) => s.theme);

  // useEffect — побочный эффект: тему держит стор, а <body> живёт снаружи React.
  // При каждой смене theme красим body (стили body.light / body.dark в index.css).
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/router" element={<RouterGuide />} />
        <Route path="/zustand" element={<ZustandGuide />} />
        <Route path="/i18n" element={<I18nGuide />} />
        <Route path="/theme" element={<ThemeGuide />} />
        <Route path="/theme-tw" element={<TailwindThemeGuide />} />
        <Route path="/todo" element={<TodoGuide />} />
        <Route path="/todo/app" element={<TodoLayout />}>
          <Route index element={<TodoList />} />
          <Route path="create" element={<TodoCreate />} />
          <Route path="settings" element={<TodoSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
