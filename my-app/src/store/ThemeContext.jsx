import { createContext } from "react";

// ШАГ 4. Контекст темы.
// createContext создаёт "канал", по которому любой компонент дерева
// может получить данные без передачи пропсов через все уровни (prop drilling).
// Само значение ({ theme, setTheme }) кладёт Provider в App.jsx.
export const ThemeContext = createContext();
