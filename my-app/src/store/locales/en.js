// English translations. One file per language — like i18next resources.
export default {
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
    navZustand: "Zustand",
    navI18n: "i18n",
    navTodo: "Todo",

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

    slidesLink: "Slides",

    zustandTitle: "Zustand — global state, step by step",
    zustandLead:
      "We already know props and context. Time to meet global state. Zustand is a tiny store library: one hook, no Provider, no boilerplate. Redux is still around and alive, but Zustand is easier to start with.",
    zustandOutro: "Five steps and a shared store works across the whole app without a single Provider.",
    zustandSteps: [
      {
        n: "01",
        title: "From props to global state",
        text: "Props pass data down the tree. Context removes prop drilling but re-renders every consumer. Zustand keeps state outside React and gives a component only the slice it subscribes to.",
        code: `// before: drag setTheme through props
<Header theme={theme} setTheme={setTheme} />

// context: no props, but re-renders all consumers
const { theme } = useContext(ThemeContext);

// Zustand: precise subscription, re-render only when theme changes
const theme = useAppStore((s) => s.theme);`,
      },
      {
        n: "02",
        title: "Zustand or Redux?",
        text: "Redux is powerful but needs actions, reducers, dispatch and a Provider wrapper — lots of code for a simple task. Zustand is one create() and a hook. Redux still fits big teams, but Zustand is easier and faster to start.",
        code: `// Redux: action + reducer + dispatch + Provider
dispatch({ type: "theme/toggle" });

// Zustand: call a store method — done
toggleTheme();`,
      },
      {
        n: "03",
        title: "Install",
        text: "One command. No extra packages or middleware to get started.",
        code: `npm install zustand`,
      },
      {
        n: "04",
        title: "Create the store",
        text: "create() takes a function that receives set and returns state plus methods. No Provider needed — the store lives on its own.",
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
        title: "Theme & language buttons in Header",
        text: "The component subscribes to the fields it needs with a selector and grabs the methods. No props, no context — the store is reachable anywhere.",
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

    i18nTitle: "Multi-language — how our project does it",
    i18nLead:
      "In this project multi-language works without a library: a translations dictionary + the current lang in the Zustand store. Everything below is real project code — open the files and show it to the students.",
    i18nOutro: "Once the dictionary grows, teams move to i18next (t('key'), fallback language, variables). Same principle: key → text by language.",
    i18nSteps: [
      {
        n: "01",
        title: "One file per language",
        text: "Each language is its own file: src/store/locales/ru.js and en.js (like i18next resources). LanguageContext.jsx assembles them into one translations object.",
        code: `// src/store/locales/ru.js
export default {
  navHome: "Главная",
  navAbout: "О проекте",
  // …the rest of the texts
};

// src/store/locales/en.js
export default {
  navHome: "Home",
  navAbout: "About",
  // …
};

// src/store/LanguageContext.jsx — assemble
import ru from "./locales/ru";
import en from "./locales/en";
export const translations = { ru, en };`,
      },
      {
        n: "02",
        title: "Language lives in the Zustand store",
        text: "src/store/useAppStore.js holds the current lang and a toggleLang method. No context — the language is reachable from any component.",
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
        title: "The switch in Header",
        text: "src/components/Header.jsx: the button reads lang and toggleLang from the store. One click switches the language across the whole app.",
        code: `// src/components/Header.jsx
const lang = useAppStore((s) => s.lang);
const toggleLang = useAppStore((s) => s.toggleLang);

<button onClick={toggleLang}>
  {lang === "ru" ? "EN" : "RU"}
</button>`,
      },
      {
        n: "04",
        title: "Read the text by language",
        text: "Any component reads lang from the store and grabs the right slice of the dictionary: t = translations[lang]. Then t.navHome and so on.",
        code: `// any component, e.g. AboutPage.jsx
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
        title: "Next step — the i18next library",
        text: "For big projects the dictionary is replaced with i18next: nested keys, a fallback language, in-string variables. The useTranslation hook gives the t function.",
        code: `npm install i18next react-i18next

// instead of translations[lang].navHome
const { t } = useTranslation();
t("nav.home");`,
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

    todo: {
      badge: "Practical work #1",
      // Home banner
      promoTitle: "Todo Manager — React + Zustand",
      promoText:
        "Practical work #1: a live demo plus a step-by-step guide to build it yourself. Tasks, filters, a counter and theme switching via a global store.",
      promoCta: "Open the practical",

      // Assignment page
      guideTitle: "Todo Manager (React + Zustand)",
      guideLead:
        "Goal — practice React Router and Zustand: store and change global state without useContext. Below is a working demo (click and see) and the steps to build it from scratch.",
      openDemo: "Open demo",
      guideOutro: "Build it yourself with the steps above — or play with the demo and peek at the code in src/todo and src/store.",

      reqTitle: "What to build",
      requirements: [
        "Zustand store: task list + current theme (light / dark).",
        "Task list page (/) — the main screen.",
        "Create page (/create) — a form with a single field.",
        "Settings page (/settings) — a “Toggle theme” button.",
        "React Router: Routes, Route, Link, NavLink, useNavigate.",
        "No useContext, no passing data through props.",
        "Bonus: localStorage, filters, counter, created date, animations.",
      ],

      stepsTitle: "How to build — step by step",
      steps: [
        {
          n: "01",
          title: "Task store in Zustand",
          text: "Add a todos array plus add/toggle/remove methods to the store. crypto.randomUUID() gives an id, the date goes into createdAt.",
          code: `// store/useAppStore.js
export const useAppStore = create((set) => ({
  theme: "light",
  todos: [],
  addTodo: (title) => set((s) => ({
    todos: [
      { id: crypto.randomUUID(), title, done: false,
        createdAt: new Date().toISOString() },
      ...s.todos,
    ],
  })),
  toggleTodo: (id) => set((s) => ({
    todos: s.todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t),
  })),
  removeTodo: (id) => set((s) => ({
    todos: s.todos.filter((t) => t.id !== id),
  })),
}));`,
        },
        {
          n: "02",
          title: "App routes",
          text: "Routes + Route define the three pages. A nested Layout with Outlet holds the shared sub-nav (NavLink) above the pages.",
          code: `// App.jsx
<Route path="/todo/app" element={<TodoLayout />}>
  <Route index element={<TodoList />} />
  <Route path="create" element={<TodoCreate />} />
  <Route path="settings" element={<TodoSettings />} />
</Route>`,
        },
        {
          n: "03",
          title: "List + filter + counter",
          text: "The component subscribes to todos and filter from the store. Count the done ones, filter the visible ones; the checkbox calls toggleTodo, the cross calls removeTodo.",
          code: `const todos = useAppStore((s) => s.todos);
const filter = useAppStore((s) => s.filter);
const toggleTodo = useAppStore((s) => s.toggleTodo);

const doneCount = todos.filter((t) => t.done).length;
const visible = todos.filter((t) =>
  filter === "active" ? !t.done
  : filter === "done" ? t.done
  : true);`,
        },
        {
          n: "04",
          title: "Form + useNavigate",
          text: "The field keeps local useState. On submit we save the task to the store and use useNavigate to send the user to the list.",
          code: `const addTodo = useAppStore((s) => s.addTodo);
const [title, setTitle] = useState("");
const navigate = useNavigate();

const onSubmit = (e) => {
  e.preventDefault();
  if (!title.trim()) return;
  addTodo(title.trim());
  navigate("/todo/app"); // redirect to the list
};`,
        },
        {
          n: "05",
          title: "Settings: toggle theme",
          text: "The button calls toggleTheme from the store. Theme is a global field, so it changes instantly across the whole app (a useEffect in App.jsx paints the body).",
          code: `const theme = useAppStore((s) => s.theme);
const toggleTheme = useAppStore((s) => s.toggleTheme);

<button onClick={toggleTheme}>
  Toggle theme ({theme})
</button>`,
        },
        {
          n: "06",
          title: "Bonus: localStorage",
          text: "The persist middleware from zustand saves the store to localStorage on its own — tasks and theme survive a reload. One wrapper around create().",
          code: `import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({ /* ...store... */ }),
    { name: "app-store" } // localStorage key
  )
);`,
        },
      ],

      // Demo: sub-nav
      tabList: "List",
      tabCreate: "Create",
      tabSettings: "Settings",

      // List
      listTitle: "My tasks",
      doneLabel: "done",
      filterAll: "All",
      filterActive: "Active",
      filterDone: "Done",
      empty: "Nothing yet. Add your first task.",
      addFirst: "Add a task",
      delete: "Delete",

      // Create
      createTitle: "New task",
      titleLabel: "Task title",
      titlePlaceholder: "e.g. learn Zustand",
      add: "Add",

      // Settings
      settingsTitle: "Settings",
      currentTheme: "Current theme",
      themeLight: "light",
      themeDark: "dark",
      toggleTheme: "Toggle theme",
      totalTasks: "Total tasks",
    },
};
