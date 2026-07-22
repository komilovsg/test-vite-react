import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useAppStore } from "./store/useAppStore";

import "./App.css";
import Layout from "./main-layout/Layout";
import HomePage from "./components/HomePage";
import Loader from "./components/Loader";

// Тяжёлые страницы грузим лениво (code-splitting): каждый гайд — свой чанк,
// подгружается только при заходе на маршрут. Пока чанк летит — показываем Loader.
// Особенно важно для /motion: тянет библиотеку motion (~140kb).
const AboutPage = lazy(() => import("./components/AboutPage"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const RouterGuide = lazy(() => import("./components/RouterGuide"));
const TsGuide = lazy(() => import("./components/TsGuide"));
const ZustandGuide = lazy(() => import("./components/ZustandGuide"));
const I18nGuide = lazy(() => import("./components/I18nGuide"));
const ThemeGuide = lazy(() => import("./components/ThemeGuide"));
const TailwindThemeGuide = lazy(() => import("./components/TailwindThemeGuide"));
const MotionGuide = lazy(() => import("./components/MotionGuide"));
const VercelGuide = lazy(() => import("./components/VercelGuide"));
const MotionDemoPage = lazy(() => import("./components/MotionDemoPage"));
const RocketGame = lazy(() => import("./components/RocketGame"));
const TodoGuide = lazy(() => import("./todo/TodoGuide"));
const TodoLayout = lazy(() => import("./todo/TodoLayout"));
const TodoList = lazy(() => import("./todo/TodoList"));
const TodoCreate = lazy(() => import("./todo/TodoCreate"));
const TodoSettings = lazy(() => import("./todo/TodoSettings"));

function App() {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      {/* Тосты sonner — глобально, тема синхронна с приложением */}
      <Toaster theme={theme} richColors position="bottom-right" />

      {/* Suspense ловит ленивые чанки; пока грузится — крутим Loader */}
      <Suspense fallback={<Loader fullscreen />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/router" element={<RouterGuide />} />
            <Route path="/typescript" element={<TsGuide />} />
            <Route path="/zustand" element={<ZustandGuide />} />
            <Route path="/i18n" element={<I18nGuide />} />
            <Route path="/theme" element={<ThemeGuide />} />
            <Route path="/theme-tw" element={<TailwindThemeGuide />} />
            <Route path="/motion" element={<MotionGuide />} />
            <Route path="/vercel" element={<VercelGuide />} />
            <Route path="/motion/game" element={<RocketGame />} />
            <Route path="/motion/:id" element={<MotionDemoPage />} />
            <Route path="/todo" element={<TodoGuide />} />
            <Route path="/todo/app" element={<TodoLayout />}>
              <Route index element={<TodoList />} />
              <Route path="create" element={<TodoCreate />} />
              <Route path="settings" element={<TodoSettings />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
