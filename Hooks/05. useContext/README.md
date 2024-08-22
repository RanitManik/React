# `useContext` Hook

## Overview

The `useContext` hook in React provides a way to access context values in functional components. Context is designed to manage global state that is accessible throughout a component tree without passing props manually at every level. The `useContext` hook simplifies consuming context values and helps manage state effectively in React applications.

## Key Concepts

1. **Context Creation**:
   - Use `React.createContext()` to create a context object. This object includes `Provider` and `Consumer` components.

2. **Context Provider**:
   - The `Provider` component makes the context value available to its child components. It wraps the components where the context should be accessible.

3. **Custom Hooks**:
   - Custom hooks can be created to encapsulate context consumption logic, making it easier to use contexts in functional components.

4. **Context Consumer**:
   - The `useContext` hook is used to access the context value in functional components.

## Example

### Setting Up Context

**`ThemeContext.js`**

```javascript
import React, { useContext, useState } from "react";

// Create two separate contexts: one for the theme value and one for the update function
const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

/**
 * Custom hook to access the current theme value.
 */
export function useTheme() {
    return useContext(ThemeContext);
}

/**
 * Custom hook to access the function that toggles the theme.
 */
export function useUpdateTheme() {
    return useContext(ThemeUpdateContext);
}

/**
 * ThemeProvider manages the theme state and provides it to children components.
 */
export function ThemeProvider({ children }) {
    const [darkTheme, setDarkTheme] = useState(true); // Default to dark theme

    /**
     * Toggles the theme between dark and light.
     */
    function toggleTheme() {
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    }

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
}
```

### Consuming Context

**`FunctionalContextComponent.js`**

```javascript
import { useTheme, useUpdateTheme } from "./ThemeContext";

/**
 * FunctionalContextComponent consumes the theme context to apply styles and provide a theme toggle button.
 */
export default function FunctionalContextComponent() {
    // Use custom hooks to access theme value and toggle function
    const darkTheme = useTheme();
    const toggleTheme = useUpdateTheme();

    // Define styles based on the current theme
    const themeStyles = {
        backgroundColor: darkTheme ? "#333" : "#ccc",
        color: darkTheme ? "#ccc" : "#333",
        padding: "2rem",
        margin: "2rem",
        textAlign: "center",
        borderRadius: "10px",
        transition: "all 0.3s ease",
    };

    return (
        <>
            <button onClick={toggleTheme} style={{ marginBottom: "1rem" }}>
                Toggle Theme
            </button>
            <div style={themeStyles}>Functional Component</div>
        </>
    );
}
```

### Providing Context

**`App.js`**

```javascript
import FunctionalContextComponent from "./FunctionalContextComponent";
import { ThemeProvider } from "./ThemeContext";

/**
 * The App component provides the theme context to the FunctionalContextComponent.
 */
export default function App() {
    return (
        <ThemeProvider>
            <FunctionalContextComponent />
        </ThemeProvider>
    );
}
```

## Detailed Explanation

1. **Creating Context**:
   - `React.createContext()` creates a context object with two components: `Provider` and `Consumer`.
   - `ThemeContext` holds the current theme value, and `ThemeUpdateContext` provides a function to update the theme.

2. **Using `useContext` Hook**:
   - `useContext(ThemeContext)` accesses the current value of the theme.
   - `useContext(ThemeUpdateContext)` accesses the function that updates the theme.

3. **Providing Context**:
   - `ThemeProvider` wraps the component tree with `ThemeContext.Provider` and `ThemeUpdateContext.Provider`.
   - This setup makes the context value and update function available to all child components.

4. **Consuming Context**:
   - In `FunctionalContextComponent`, the theme and toggle function are accessed using custom hooks.
   - The component styles are dynamically adjusted based on the current theme.

5. **Styling**:
   - Styles are applied conditionally based on the theme.
   - Transitions and layout adjustments improve the visual experience and responsiveness.

## Additional Notes

- **Custom Hooks**: Custom hooks like `useTheme` and `useUpdateTheme` encapsulate context consumption logic, promoting cleaner and more readable code.
- **Context Limitations**: Context should be used for global state that needs to be accessed by many components. For component-specific state, use local state with `useState`.

By using `useContext`, you can efficiently manage and consume context values in your React applications, ensuring clean and maintainable code.

## Additional Resources

- [React Official Documentation: `useRef`](https://react.dev/reference/react/useContext)
- [Web Dev Simplified Blog: `useRef`](https://blog.webdevsimplified.com/2020-06/use-context/)
