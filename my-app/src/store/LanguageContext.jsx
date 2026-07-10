import { createContext } from "react";

// ШАГ 5. Второй контекст — язык интерфейса.
// Контекстов в приложении может быть сколько угодно,
// каждый отвечает за свою часть данных.
export const LanguageContext = createContext();

// Словарь переводов. Ключ верхнего уровня — код языка,
// внутри — все тексты интерфейса.
// Компоненты берут текст так: translations[lang].counter
export const translations = {
  ru: {
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
  },
  en: {
    appTitle: "Study project",
    themeToLight: "Light theme",
    themeToDark: "Dark theme",
    counter: "Counter",
    reset: "Reset",
    refTitle: "useRef: autofocus and the “box”",
    inputPlaceholder: "Autofocus on load",
    clicksInBox: "Clicks in the “box” (no re-render)",
    showBox: "Show value from ref",
    footer: "One project — six steps",

    navHome: "Home",
    navAbout: "About",
    navContact: "Contact",
    navRouter: "Router",

    routerTitle: "React Router — step by step",
    routerLead:
      "react-router-dom is client-side routing for React. The URL changes without a full page reload, and the matching component renders for each route.",
    routerOutro: "That's it. Four steps and SPA navigation is ready.",
    routerSteps: [
      {
        n: "01",
        title: "Install & BrowserRouter",
        text: "Install the package and wrap the whole app in BrowserRouter — it listens to browser history.",
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
        title: "Routes & Route",
        text: "Routes is the rule list. Each Route maps a path to a component (element).",
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
        title: "Layout & Outlet",
        text: "Move the shared shell (Header/Footer) into a Layout. Outlet is where the Router injects the current page.",
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

// nested Route
<Route element={<Layout />}>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
</Route>`,
      },
      {
        n: "04",
        title: "Link & NavLink",
        text: "Link replaces <a> — navigate without a reload. NavLink also knows whether the link is active.",
        code: `import { Link, NavLink } from "react-router-dom";

<Link to="/about">About</Link>

<NavLink
  to="/about"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  About
</NavLink>`,
      },
    ],

    heroBadge: "React 19 · Vite · Router",
    heroTitle: "Learn React for real",
    heroSubtitle:
      "Six steps: components, state, context, effects, routing and refs — in one living project.",
    heroCta: "See the demo",
    heroCta2: "About",

    featuresTitle: "What's inside",
    features: [
      { icon: "🎨", title: "Themes", text: "Light & dark theme via Context and CSS variables." },
      { icon: "🌍", title: "Two languages", text: "Full interface in Russian and English." },
      { icon: "🧩", title: "Components", text: "Counter, useRef demo and reusable UI blocks." },
      { icon: "🧭", title: "Routing", text: "React Router: pages, layout and shared Header/Footer." },
    ],

    demoTitle: "Live demo",

    aboutTitle: "About",
    aboutLead:
      "A small learning app built with React 19 that walks through core frontend concepts step by step.",
    aboutSteps: [
      { n: "01", title: "Components", text: "Split the UI into reusable pieces." },
      { n: "02", title: "State", text: "useState for local component data." },
      { n: "03", title: "Context", text: "Theme and language without prop drilling." },
      { n: "04", title: "Effects", text: "useEffect to talk to the outside world." },
      { n: "05", title: "Routing", text: "Navigate between pages." },
      { n: "06", title: "Refs", text: "useRef for DOM access and stored values." },
    ],

    contactTitle: "Get in touch",
    contactLead: "Got a question or an idea? Drop a line — I'll reply.",
    contactName: "Name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactSend: "Send",
    contactSent: "Thanks! Your message was sent.",
  },
};
