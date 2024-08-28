import { useTheme, useUpdateTheme } from "./ThemeContext";

/**
 * FunctionalContextComponent uses the theme context to apply styles and toggle the theme.
 */
export default function FunctionalContextComponent() {
    // Using custom hooks to consume the theme context
    const darkTheme = useTheme(); // Call the hook to get the current theme value
    const toggleTheme = useUpdateTheme(); // Call the hook to get the function to toggle the theme

    // Define the styles based on the current theme
    const themeStyles = {
        backgroundColor: darkTheme ? "#333" : "#ccc",
        color: darkTheme ? "#ccc" : "#333",
        padding: "2rem",
        margin: "2rem",
        textAlign: "center", // Added for better alignment of the text
        borderRadius: "10px", // Added to give a slight rounded look
        transition: "all 0.3s ease", // Added for smooth transition when toggling the theme
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
