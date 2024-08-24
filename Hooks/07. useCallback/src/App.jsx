import { useCallback, useState } from "react";
import List from "./List.jsx";

export default function App() {
    const [number, setNumber] = useState(1);
    const [dark, setDark] = useState(false);

    /*
     * `useCallback` is used to memoize the `getItems` function, which takes an `incrementor` as an argument.
     * The `useCallback` hook ensures that the function is re-created only when the `number` state changes.
     * This prevents unnecessary re-renders of the `List` component when the `dark` theme state changes.
     */

    const getItems = useCallback(
        (incrementor) => {
            return [
                number + incrementor,
                number + 1 + incrementor,
                number + 2 + incrementor,
            ];
        },
        [number], // Dependency array includes `number` to update the function when `number` changes
    );

    const theme = {
        backgroundColor: dark ? "#333" : "#FFF",
        color: dark ? "#FFF" : "#333",
    };

    return (
        <div className="app-container" style={theme}>
            <input
                autoFocus
                className="number-input"
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
            />
            <button
                className="theme-toggle"
                onClick={() => setDark((prevDark) => !prevDark)}
            >
                Toggle theme
            </button>
            <List getItems={getItems} />
        </div>
    );
}
