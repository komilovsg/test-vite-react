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
    navTs: "TypeScript",
    navZustand: "Zustand",
    navI18n: "i18n",
    navTodo: "Todo",
    navTheme: "Theme (CSS)",
    navThemeTw: "Theme (Tailwind)",
    navMotion: "Motion ✨",
    navVercel: "Deploy 🚀",
    menu: "Pages",

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

    tsTitle: "type vs interface — step by step",
    tsLead:
      "One of the most common interview questions. Both type and interface describe the shape of an object — in most cases they work the same. Let's break down the differences and when to pick which.",
    tsOutro:
      "Simple rule: for any type — use type. For an object shape (User, Product, ButtonProps) — either works. What matters is consistency across the project, not the keyword you pick.",
    tsSteps: [
      {
        n: "01",
        title: "Both describe an object shape",
        text: "Both interface and type define the structure of an object. In most cases they're interchangeable — the code below is equivalent.",
        code: `interface User {
  name: string;
  age: number;
}

// same thing with type
type User = {
  name: string;
  age: number;
};`,
      },
      {
        n: "02",
        title: "Difference #1 — declaration merging",
        text: "An interface can be declared multiple times — TypeScript merges the declarations into one. type can't: a duplicate name is an error.",
        code: `interface User {
  name: string;
}
interface User {
  age: number;
}
// TS merges -> { name: string; age: number }

type User = { name: string };
type User = { age: number }; // Error: Duplicate identifier`,
      },
      {
        n: "03",
        title: "Difference #2 — what you can describe",
        text: "interface is mainly for objects. type can do everything: unions, tuples, primitives, functions. If it's not an object — reach for type.",
        code: `// only type: unions and primitives
type Theme = "light" | "dark";
type ID = string | number;

// tuple
type Point = [number, number];

// function
type Handler = (id: number) => void;`,
      },
      {
        n: "04",
        title: "Difference #3 — inheritance",
        text: "interface inherits via extends. type combines via & (intersection — merge the fields). The result is the same.",
        code: `interface Person {
  name: string;
}
interface Employee extends Person {
  salary: number;
}

// same with type
type Person = { name: string };
type Employee = Person & { salary: number };`,
      },
      {
        n: "05",
        title: "What's used in practice",
        text: "Common team rule: interface for objects, React component props and API responses; type for unions, tuples, utility types and functions. Pick a style and stick to it across the whole project.",
        code: `// data models and props -> interface
interface User {
  id: number;
  name: string;
}
interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
}

// union / primitives / combinations -> type
type Theme = "light" | "dark";
type ID = string | number;
type CardProps = User & { active: boolean };`,
      },
    ],

    vercelTitle: "Deploy to Vercel via GitHub — step by step",
    vercelLead:
      "Vercel is a frontend host. The flow is simple: code on GitHub → Vercel builds it and ships to a production domain. Link the repo once and every push deploys automatically — no terminal commands after that.",
    vercelOutro:
      "Recap: code on GitHub, log in to Vercel with GitHub, import the repo, auto Vite settings, SPA rewrite for deep links — and auto-deploy on every push. Set it up once, then just git push.",
    vercelSteps: [
      {
        n: "01",
        title: "Push your code to GitHub",
        text: "Vercel deploys from a Git repository, so the project must live on GitHub first. No repo yet? Create one on github.com and push the main branch. Already have one? Just make sure your latest commits are up there.",
        code: `# once: attach the remote repository
git remote add origin https://github.com/USER/my-app.git

git add .
git commit -m "init"
git push -u origin main`,
      },
      {
        n: "02",
        title: "Log in to Vercel with GitHub",
        text: "Open vercel.com → “Sign Up” / “Log In” → pick “Continue with GitHub”. A GitHub window opens — click “Authorize Vercel”. GitHub hands Vercel an access token (OAuth); no separate password — the accounts are linked.",
        code: `Vercel  →  Continue with GitHub
        →  Authorize Vercel   (GitHub window)
        →  back in Vercel, already logged in

# no password needed — login via GitHub (OAuth)`,
      },
      {
        n: "03",
        title: "Import Project — pick the repository",
        text: "On the dashboard hit “Add New… → Project”. Vercel lists your GitHub repos. Find the one you need (my-app) and click “Import”. Repo not showing? Use “Adjust GitHub App Permissions” and grant access to it.",
        code: `Dashboard → Add New… → Project
  → list of GitHub repositories
  → my-app → Import

# repo not in the list?
# Adjust GitHub App Permissions → grant access`,
      },
      {
        n: "04",
        title: "Build settings — Vercel guesses them",
        text: "For Vite, Vercel detects the preset automatically: Framework = Vite, Build Command = “vite build”, Output Directory = “dist”. You rarely change anything. Add env variables (if any) right here. Then hit “Deploy”.",
        code: `Framework Preset:   Vite        (auto)
Build Command:      vite build  (auto)
Output Directory:   dist        (auto)
Install Command:    npm install (auto)

→ Deploy`,
      },
      {
        n: "05",
        title: "SPA rewrite — so deep links don't 404",
        text: "React Router draws routes on the client. But open /todo directly or refresh, and the server looks for a /todo file — none exists → 404. Fix: vercel.json at the root — every path serves index.html, then the router takes over.",
        code: `// vercel.json (at the project root)
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`,
      },
      {
        n: "06",
        title: "Done — deploys are automatic now",
        text: "After the first deploy Vercel is linked to the repo. Every push to main → auto build → production domain updates. Push to another branch or open a PR → a separate preview URL to check before merge. No more terminal.",
        code: `git push origin main      # → auto-deploy to prod
git push origin feature   # → preview URL to review

# rollback: Vercel → Deployments → any past
# build → “Promote to Production”`,
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
      guideOutro: "Build it yourself with the steps above — the comment hints will help. The live demo is right here so you can see how it should work.",

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

      stepsTitle: "How to build — step by step (fill in the blanks)",
      steps: [
        {
          n: "01",
          title: "Task store in Zustand",
          text: "Add a todos array and three methods to the store. Hints are in the comments — write the logic yourself.",
          code: `// store/useAppStore.js
import { create } from "zustand";

export const useAppStore = create((set) => ({
  theme: "light",
  todos: [],       // tasks: { id, title, done, createdAt }
  filter: "all",   // all | active | done

  addTodo: (title) => set((s) => ({
    // TODO: return a new todos — new task at the front
    // task = { id: crypto.randomUUID(), title, done: false, createdAt: ... }
    // don't forget ...s.todos
  })),

  toggleTodo: (id) => set((s) => ({
    // TODO: s.todos.map(...) — flip done on the task with this id
  })),

  removeTodo: (id) => set((s) => ({
    // TODO: s.todos.filter(...) — drop the task with this id
  })),

  setFilter: (filter) => set({ filter }),
}));`,
        },
        {
          n: "02",
          title: "App routes",
          text: "Inside the nested Layout, declare the three routes. Fill in the element for each.",
          code: `// App.jsx
<Route path="/todo/app" element={<TodoLayout />}>
  {/* TODO: index route  → element={<TodoList />} */}
  {/* TODO: path="create"   → element={<TodoCreate />} */}
  {/* TODO: path="settings" → element={<TodoSettings />} */}
</Route>`,
        },
        {
          n: "03",
          title: "List + filter + counter",
          text: "Subscribe to the store with selectors. Count the done ones and filter the visible ones.",
          code: `const todos = useAppStore((s) => s.todos);
const filter = useAppStore((s) => s.filter);
const toggleTodo = useAppStore((s) => s.toggleTodo);
const removeTodo = useAppStore((s) => s.removeTodo);

// TODO: doneCount — how many tasks have done === true
const doneCount = /* ... */;

// TODO: visible — filter todos by filter (all/active/done)
const visible = /* ... */;

// in JSX: <input type="checkbox" onChange={() => toggleTodo(t.id)} />
//         <button onClick={() => removeTodo(t.id)}>✕</button>`,
        },
        {
          n: "04",
          title: "Form + useNavigate",
          text: "The field is local useState. On submit, save the task and redirect to the list.",
          code: `const addTodo = useAppStore((s) => s.addTodo);
const [title, setTitle] = useState("");
const navigate = useNavigate();

const onSubmit = (e) => {
  e.preventDefault();
  // TODO: if title is empty (trim) — return, do nothing
  // TODO: addTodo(title)
  // TODO: navigate("/todo/app") — redirect to the list
};`,
        },
        {
          n: "05",
          title: "Settings: toggle theme",
          text: "The button calls toggleTheme from the store. Theme is global — it changes across the whole app.",
          code: `const theme = useAppStore((s) => s.theme);
const toggleTheme = useAppStore((s) => s.toggleTheme);

// TODO: button, onClick={toggleTheme}
<button /* ... */>
  Toggle theme ({theme})
</button>`,
        },
        {
          n: "06",
          title: "Bonus: localStorage",
          text: "Wrap create() in persist from zustand — the store saves itself to localStorage.",
          code: `import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({ /* ...your store... */ }),
    { name: "app-store" } // TODO: localStorage key
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

      // Dashboard
      createCardTitle: "Create a new task",
      settingsHint: "Choose the app theme",

      // Settings
      settingsTitle: "Settings",
      currentTheme: "Current theme",
      themeLight: "light",
      themeDark: "dark",
      toggleTheme: "Toggle theme",
      totalTasks: "Total tasks",
    },
};
