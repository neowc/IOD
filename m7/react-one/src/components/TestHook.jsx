import { useContext } from "react";

import { ThemeContext } from "./context/ThemeContext";

export default function TestHook() {
    const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

    return <div>{isDarkMode ? "Dark" : "Light"} Mode</div>;
}