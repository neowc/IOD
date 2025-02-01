import { createContext, useState } from "react";

const themes = {
    light: {
        foreground: "#333333",
        background: "#BAE2FF",
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222",
    },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);

    const isDarkMode = theme === themes.dark;

    const toggleTheme = () => {
        setTheme(isDarkMode ? themes.light : themes.dark);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                isDarkMode,
                toggleTheme,
            }}
        >
        <button onClick={toggleTheme}>Toggle Theme</button>
            {children}
        </ThemeContext.Provider>
    );
};