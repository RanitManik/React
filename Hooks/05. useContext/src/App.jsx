import FunctionalContextComponent from "./FunctionalContextComponent";
import { ThemeProvider } from "./ThemeContext";

/**
 * The App component serves as the root of the application.
 * It wraps the FunctionalContextComponent with the ThemeProvider,
 * making the theme context available to all nested components.
 */
export default function App() {
    return (
        <ThemeProvider>
            <FunctionalContextComponent />
        </ThemeProvider>
    );
}
