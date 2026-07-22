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
    navTs: "TypeScript",
    navZustand: "Zustand",
    navI18n: "i18n",
    navTodo: "Todo",
    navTheme: "Тема (CSS)",
    navThemeTw: "Тема (Tailwind)",
    navMotion: "Motion ✨",
    menu: "Страницы",

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

    tsTitle: "type или interface — по шагам",
    tsLead:
      "Один из самых частых вопросов на собеседовании. И type, и interface описывают форму объекта — в большинстве случаев работают одинаково. Разберём отличия и когда что выбирать.",
    tsOutro:
      "Простое правило: любой тип — type. Структура объекта (User, Product, ButtonProps) — можно и interface, и type. Главное — последовательность в проекте, а не выбор ключевого слова.",
    tsSteps: [
      {
        n: "01",
        title: "Оба описывают форму объекта",
        text: "И interface, и type задают структуру объекта. В большинстве случаев они взаимозаменяемы — код ниже эквивалентен.",
        code: `interface User {
  name: string;
  age: number;
}

// то же самое через type
type User = {
  name: string;
  age: number;
};`,
      },
      {
        n: "02",
        title: "Отличие №1 — declaration merging",
        text: "interface можно объявить несколько раз — TypeScript автоматически объединит объявления в одно. С type так нельзя: повторное имя — ошибка.",
        code: `interface User {
  name: string;
}
interface User {
  age: number;
}
// TS объединит → { name: string; age: number }

type User = { name: string };
type User = { age: number }; // ❌ Error: Duplicate identifier`,
      },
      {
        n: "03",
        title: "Отличие №2 — что можно описывать",
        text: "interface — в основном для объектов. type умеет всё: union, tuple, примитивы, функции. Если нужен не объект — берём type.",
        code: `// только type: объединения и примитивы
type Theme = "light" | "dark";
type ID = string | number;

// tuple
type Point = [number, number];

// функция
type Handler = (id: number) => void;`,
      },
      {
        n: "04",
        title: "Отличие №3 — наследование",
        text: "interface наследуется через extends. type комбинируется через & (пересечение — «объединить поля»). Результат одинаковый.",
        code: `interface Person {
  name: string;
}
interface Employee extends Person {
  salary: number;
}

// то же через type
type Person = { name: string };
type Employee = Person & { salary: number };`,
      },
      {
        n: "05",
        title: "Что используют на практике",
        text: "Частое правило в командах: interface — для объектов, props React-компонентов и ответов API; type — для union, tuple, utility-типов и функций. Выбрали стиль — держитесь его во всём проекте.",
        code: `// модели данных и props → interface
interface User {
  id: number;
  name: string;
}
interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
}

// union / примитивы / комбинации → type
type Theme = "light" | "dark";
type ID = string | number;
type CardProps = User & { active: boolean };`,
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

    todo: {
      badge: "Практическая работа №1",
      // Баннер на главной
      promoTitle: "Todo Manager — React + Zustand",
      promoText:
        "Практическая работа №1: живое демо + пошаговая инструкция, как собрать её самому. Задачи, фильтры, счётчик и переключение темы через глобальный стор.",
      promoCta: "Открыть практическую",

      // Страница задания
      guideTitle: "Todo Manager (React + Zustand)",
      guideLead:
        "Цель — закрепить React Router и Zustand: хранить и менять глобальное состояние без useContext. Ниже — рабочее демо (кликай и смотри) и шаги, как собрать его с нуля.",
      openDemo: "Открыть демо",
      guideOutro: "Собери сам по шагам выше — подсказки в комментариях помогут. Рядом готовое демо: потыкай, чтобы увидеть, как должно работать.",

      reqTitle: "Что нужно сделать",
      requirements: [
        "Zustand-стор: список задач + текущая тема (light / dark).",
        "Страница списка задач (/) — главная.",
        "Страница создания задачи (/create) — форма с одним полем.",
        "Страница настроек (/settings) — кнопка «Сменить тему».",
        "React Router: Routes, Route, Link, NavLink, useNavigate.",
        "Никакого useContext и передачи данных через props.",
        "Бонус: localStorage, фильтры, счётчик, дата создания, анимации.",
      ],

      stepsTitle: "Как собрать — по шагам (заполни пропуски)",
      steps: [
        {
          n: "01",
          title: "Стор задач в Zustand",
          text: "Добавь в стор массив todos и три метода. Подсказки в комментариях — впиши логику сам.",
          code: `// store/useAppStore.js
import { create } from "zustand";

export const useAppStore = create((set) => ({
  theme: "light",
  todos: [],       // массив задач: { id, title, done, createdAt }
  filter: "all",   // all | active | done

  addTodo: (title) => set((s) => ({
    // TODO: вернуть новый todos — новая задача в начало массива
    // задача = { id: crypto.randomUUID(), title, done: false, createdAt: ... }
    // не забудь ...s.todos
  })),

  toggleTodo: (id) => set((s) => ({
    // TODO: s.todos.map(...) — у задачи с этим id инвертировать done
  })),

  removeTodo: (id) => set((s) => ({
    // TODO: s.todos.filter(...) — убрать задачу с этим id
  })),

  setFilter: (filter) => set({ filter }),
}));`,
        },
        {
          n: "02",
          title: "Маршруты приложения",
          text: "Внутри вложенного Layout опиши три маршрута. Впиши element для каждого.",
          code: `// App.jsx
<Route path="/todo/app" element={<TodoLayout />}>
  {/* TODO: index-маршрут → element={<TodoList />} */}
  {/* TODO: path="create"   → element={<TodoCreate />} */}
  {/* TODO: path="settings" → element={<TodoSettings />} */}
</Route>`,
        },
        {
          n: "03",
          title: "Список + фильтр + счётчик",
          text: "Подпишись на стор селекторами. Посчитай выполненные и отфильтруй видимые.",
          code: `const todos = useAppStore((s) => s.todos);
const filter = useAppStore((s) => s.filter);
const toggleTodo = useAppStore((s) => s.toggleTodo);
const removeTodo = useAppStore((s) => s.removeTodo);

// TODO: doneCount — сколько задач с done === true
const doneCount = /* ... */;

// TODO: visible — отфильтровать todos по filter (all/active/done)
const visible = /* ... */;

// в разметке: <input type="checkbox" onChange={() => toggleTodo(t.id)} />
//             <button onClick={() => removeTodo(t.id)}>✕</button>`,
        },
        {
          n: "04",
          title: "Форма + useNavigate",
          text: "Поле — локальный useState. По сабмиту сохрани задачу и уведи на список.",
          code: `const addTodo = useAppStore((s) => s.addTodo);
const [title, setTitle] = useState("");
const navigate = useNavigate();

const onSubmit = (e) => {
  e.preventDefault();
  // TODO: если title пустой (trim) — выйти, ничего не делать
  // TODO: addTodo(title)
  // TODO: navigate("/todo/app") — редирект на список
};`,
        },
        {
          n: "05",
          title: "Настройки: смена темы",
          text: "Кнопка дёргает toggleTheme из стора. Тема глобальная — меняется во всём приложении.",
          code: `const theme = useAppStore((s) => s.theme);
const toggleTheme = useAppStore((s) => s.toggleTheme);

// TODO: кнопка, onClick={toggleTheme}
<button /* ... */>
  Сменить тему ({theme})
</button>`,
        },
        {
          n: "06",
          title: "Бонус: localStorage",
          text: "Оберни create() в persist из zustand — стор сам сохранится в localStorage.",
          code: `import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({ /* ...твой стор... */ }),
    { name: "app-store" } // TODO: ключ в localStorage
  )
);`,
        },
      ],

      // Демо: подменю
      tabList: "Список",
      tabCreate: "Создать",
      tabSettings: "Настройки",

      // Список
      listTitle: "Мои задачи",
      doneLabel: "выполнено",
      filterAll: "Все",
      filterActive: "Активные",
      filterDone: "Выполненные",
      empty: "Пока пусто. Добавь первую задачу.",
      addFirst: "Добавить задачу",
      delete: "Удалить",

      // Создание
      createTitle: "Новая задача",
      titleLabel: "Название задачи",
      titlePlaceholder: "Например: выучить Zustand",
      add: "Добавить",

      // Дашборд
      createCardTitle: "Создать новую задачу",
      settingsHint: "Выберите тему приложения",

      // Настройки
      settingsTitle: "Настройки",
      currentTheme: "Текущая тема",
      themeLight: "светлая",
      themeDark: "тёмная",
      toggleTheme: "Сменить тему",
      totalTasks: "Всего задач",
    },
};
