import React, { useContext, useState } from "react";

// Creating two separate contexts: one for the theme value and one for the update function
const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

/**
 * Custom hook to consume the ThemeContext.
 * Provides access to the current theme value (darkTheme).
 */
export function useTheme() {
    return useContext(ThemeContext);
}

/**
 * Custom hook to consume the ThemeUpdateContext.
 * Provides access to the function that toggles the theme.
 */
export function useUpdateTheme() {
    return useContext(ThemeUpdateContext);
}

/**
 * ThemeProvider wraps the application or part of the application where the theme context is needed.
 * It manages the theme state and provides functions to toggle the theme.
 */
export function ThemeProvider({ children }) {
    const [darkTheme, setDarkTheme] = useState(true); // State to manage the theme, initialized to dark theme

    /**
     * Toggles the theme between dark and light.
     */
    function toggleTheme() {
        setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    }

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
}
