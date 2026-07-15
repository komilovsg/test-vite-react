// Русские переводы. Отдельный файл на язык — как resources в i18next.
export default {
    appTitle: "Учебный проект",
    themeToLight: "Светлая тема",
    themeToDark: "Тёмная тема",
    counter: "Счётчик",
    reset: "Сброс",
    refTitle: "useRef: автофокус и «коробка»",
    inputPlaceholder: "Автофокус при загрузке",
    clicksInBox: "Кликов в «коробке» (без ререндера)",
    showBox: "Показать значение из ref",
    footer: "Один проект — шесть шагов",

    navHome: "Главная",
    navAbout: "О проекте",
    navContact: "Контакты",
    navRouter: "Router",
    navZustand: "Zustand",
    navI18n: "i18n",

    routerTitle: "React Router — по шагам",
    routerLead:
      "react-router-dom — клиентский роутинг для React. URL меняется без перезагрузки страницы, а нужный компонент рендерится по маршруту.",
    routerOutro: "Всё. Четыре шага — и SPA-навигация готова.",
    routerSteps: [
      {
        n: "01",
        title: "Установка и BrowserRouter",
        text: "Ставим пакет и оборачиваем всё приложение в BrowserRouter — он слушает историю браузера.",
        code: `npm install react-router-dom

// main.jsx
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);`,
      },
      {
        n: "02",
        title: "Routes и Route",
        text: "Routes — список правил. Каждый Route связывает path с компонентом (element).",
        code: `// App.jsx
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}`,
      },
      {
        n: "03",
        title: "Layout и Outlet",
        text: "Общий каркас (Header/Footer) выносим в Layout. Outlet — место, куда Router подставляет текущую страницу.",
        code: `// Layout.jsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app">
      <Header />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}

// вложенные Route
<Route element={<Layout />}>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
</Route>`,
      },
      {
        n: "04",
        title: "Link и NavLink",
        text: "Link заменяет <a> — переход без перезагрузки. NavLink дополнительно знает, активна ли ссылка.",
        code: `import { Link, NavLink } from "react-router-dom";

<Link to="/about">О проекте</Link>

<NavLink
  to="/about"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  О проекте
</NavLink>`,
      },
    ],

    slidesLink: "Презентация",

    zustandTitle: "Zustand — глобальное состояние по шагам",
    zustandLead:
      "Мы уже знаем пропсы и контекст. Пора познакомиться с глобальным состоянием. Zustand — крошечная библиотека для стора: один хук, без Provider, без бойлерплейта. Redux тоже есть и жив, но начинать легче с Zustand.",
    zustandOutro: "Пять шагов — и общий стор работает во всём приложении без единого Provider.",
    zustandSteps: [
      {
        n: "01",
        title: "От пропсов к глобальному состоянию",
        text: "Пропсы передают данные вниз по дереву. Контекст убирает prop drilling, но перерисовывает всех потребителей. Zustand хранит состояние снаружи React и отдаёт компоненту только тот кусок, на который он подписан.",
        code: `// было: тащим setTheme через пропсы
<Header theme={theme} setTheme={setTheme} />

// контекст: без пропсов, но ререндер всех потребителей
const { theme } = useContext(ThemeContext);

// Zustand: точечная подписка, ререндер только при смене theme
const theme = useAppStore((s) => s.theme);`,
      },
      {
        n: "02",
        title: "Zustand или Redux?",
        text: "Redux мощный, но требует actions, reducers, dispatch и обёртку Provider — много кода ради простой задачи. Zustand — это один create() и хук. Для больших команд Redux всё ещё уместен, но для старта Zustand легче и быстрее.",
        code: `// Redux: action + reducer + dispatch + Provider
dispatch({ type: "theme/toggle" });

// Zustand: вызвал метод стора — и всё
toggleTheme();`,
      },
      {
        n: "03",
        title: "Установка",
        text: "Одна команда. Никаких дополнительных пакетов и middleware для старта.",
        code: `npm install zustand`,
      },
      {
        n: "04",
        title: "Создаём стор",
        text: "create() принимает функцию, которая получает set и возвращает состояние вместе с методами. Provider не нужен — стор живёт сам по себе.",
        code: `// store/useAppStore.js
import { create } from "zustand";

export const useAppStore = create((set) => ({
  theme: "light",
  lang: "ru",
  toggleTheme: () =>
    set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
  toggleLang: () =>
    set((s) => ({ lang: s.lang === "ru" ? "en" : "ru" })),
}));`,
      },
      {
        n: "05",
        title: "Кнопки темы и языка в Header",
        text: "Компонент подписывается на нужные поля селектором и берёт методы. Никаких пропсов и контекста — стор доступен откуда угодно.",
        code: `// Header.jsx
import { useAppStore } from "../store/useAppStore";

export default function Header() {
  const theme = useAppStore((s) => s.theme);
  const lang = useAppStore((s) => s.lang);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const toggleLang = useAppStore((s) => s.toggleLang);

  return (
    <div className="header__actions">
      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <button onClick={toggleLang}>
        {lang === "ru" ? "EN" : "RU"}
      </button>
    </div>
  );
}`,
      },
    ],

    i18nTitle: "Мультиязычность — как в нашем проекте",
    i18nLead:
      "В проекте мультиязычность работает без библиотек: словарь translations + текущий язык lang в Zustand-сторе. Всё, что ниже — реальный код проекта, открой файлы и покажи ребятам.",
    i18nOutro: "Когда словарь разрастётся — переходят на i18next (t('key'), запасной язык, переменные). Принцип тот же: ключ → текст по языку.",
    i18nSteps: [
      {
        n: "01",
        title: "По файлу на язык",
        text: "Каждый язык — отдельный файл: src/store/locales/ru.js и en.js (как resources в i18next). LanguageContext.jsx собирает их в один объект translations.",
        code: `// src/store/locales/ru.js
export default {
  navHome: "Главная",
  navAbout: "О проекте",
  // …остальные тексты
};

// src/store/locales/en.js
export default {
  navHome: "Home",
  navAbout: "About",
  // …
};

// src/store/LanguageContext.jsx — собираем вместе
import ru from "./locales/ru";
import en from "./locales/en";
export const translations = { ru, en };`,
      },
      {
        n: "02",
        title: "Язык живёт в Zustand-сторе",
        text: "src/store/useAppStore.js хранит текущий lang и метод toggleLang. Никакого контекста — язык доступен любому компоненту.",
        code: `// src/store/useAppStore.js
import { create } from "zustand";

export const useAppStore = create((set) => ({
  lang: "ru",
  toggleLang: () =>
    set((s) => ({ lang: s.lang === "ru" ? "en" : "ru" })),
}));`,
      },
      {
        n: "03",
        title: "Переключатель в Header",
        text: "src/components/Header.jsx: кнопка берёт lang и toggleLang из стора. Клик — и язык меняется во всём приложении.",
        code: `// src/components/Header.jsx
const lang = useAppStore((s) => s.lang);
const toggleLang = useAppStore((s) => s.toggleLang);

<button onClick={toggleLang}>
  {lang === "ru" ? "EN" : "RU"}
</button>`,
      },
      {
        n: "04",
        title: "Достаём текст по языку",
        text: "Любой компонент читает lang из стора и берёт нужный кусок словаря: t = translations[lang]. Дальше t.navHome и т.д.",
        code: `// любой компонент, напр. AboutPage.jsx
import { useAppStore } from "../store/useAppStore";
import { translations } from "../store/LanguageContext";

export default function AboutPage() {
  const lang = useAppStore((s) => s.lang);
  const t = translations[lang];

  return <h1>{t.aboutTitle}</h1>;
}`,
      },
      {
        n: "05",
        title: "Что дальше — библиотека i18next",
        text: "Для больших проектов словарь заменяют на i18next: ключи с вложенностью, запасной язык, переменные в строках. Хук useTranslation даёт функцию t.",
        code: `npm install i18next react-i18next

// вместо translations[lang].navHome
const { t } = useTranslation();
t("nav.home");`,
      },
    ],

    heroBadge: "React 19 · Vite · Router",
    heroTitle: "Учимся React по-настоящему",
    heroSubtitle:
      "Шесть шагов: компоненты, состояние, контекст, эффекты, роутинг и рефы — в одном живом проекте.",
    heroCta: "Смотреть демо",
    heroCta2: "О проекте",

    featuresTitle: "Что внутри",
    features: [
      { icon: "🎨", title: "Темы", text: "Светлая и тёмная тема через Context и CSS-переменные." },
      { icon: "🌍", title: "Два языка", text: "Полный интерфейс на русском и английском." },
      { icon: "🧩", title: "Компоненты", text: "Счётчик, useRef-демо и переиспользуемые UI-блоки." },
      { icon: "🧭", title: "Роутинг", text: "React Router: страницы, layout и общий Header/Footer." },
    ],

    demoTitle: "Живое демо",

    aboutTitle: "О проекте",
    aboutLead:
      "Небольшое учебное приложение на React 19, показывающее базовые концепции фронтенда шаг за шагом.",
    aboutSteps: [
      { n: "01", title: "Компоненты", text: "Разбиваем UI на переиспользуемые части." },
      { n: "02", title: "Состояние", text: "useState для локальных данных компонента." },
      { n: "03", title: "Контекст", text: "Тема и язык без prop drilling." },
      { n: "04", title: "Эффекты", text: "useEffect для работы с внешним миром." },
      { n: "05", title: "Роутинг", text: "Навигация между страницами." },
      { n: "06", title: "Рефы", text: "useRef для доступа к DOM и хранения значений." },
    ],

    contactTitle: "Связаться",
    contactLead: "Есть вопрос или идея? Напишите — отвечу.",
    contactName: "Имя",
    contactEmail: "Email",
    contactMessage: "Сообщение",
    contactSend: "Отправить",
    contactSent: "Спасибо! Сообщение отправлено.",
};
