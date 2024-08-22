import { useState, useMemo } from "react";

export default function App() {
    // State to manage the input number
    const [number, setNumber] = useState(0);
    // State to manage the theme (dark mode or light mode)
    const [dark, setDark] = useState(false);

    /*
     * The useMemo hook is used here to memoize the result of the `slowFunction`.
     * This means that the function will only re-execute if `number` changes.
     * Without useMemo, `slowFunction` would run on every render, even if `number` hasn't changed,
     * leading to unnecessary performance issues.
     */
    const doubleNumber = useMemo(() => slowFunction(number), [number]);

    /*
     * The `themeStyles` object is also memoized using useMemo.
     * It ensures that the style object is only recalculated when the `dark` state changes.
     * This avoids unnecessary re-renders caused by passing a new object reference
     * on each render, which would otherwise happen if `themeStyles` were defined directly in the JSX.
     */
    const themeStyles = useMemo(
        () => ({
            backgroundColor: dark ? "black" : "white",
            color: dark ? "white" : "black",
        }),
        [dark],
    );

    /*
     * (Optional) Uncomment the following useEffect if you want to observe when the theme changes.
     * This useEffect would log "Theme Changed" to the console every time the `themeStyles` object is recalculated.
     * However, in this case, it would log on every theme change since `themeStyles` is memoized.
     */
    // useEffect(() => {
    //     console.log("Theme Changed");
    // }, [themeStyles]);

    return (
        <>
            {/* Input field to change the number, triggering `setNumber` on change */}
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
            />

            {/* Button to toggle the theme between dark and light mode */}
            <button onClick={() => setDark((prevDark) => !prevDark)}>
                Change Theme
            </button>

            {/* Div displaying the doubled number with the applied theme styles */}
            <div
                className={dark ? "dark-theme" : "light-theme"}
                style={themeStyles}
            >
                {doubleNumber}
            </div>
        </>
    );
}

/*
 * The `slowFunction` simulates a time-consuming calculation by looping a billion times.
 * It multiplies the input number by 2. The useMemo hook ensures this function
 * only runs when necessary, i.e., when `number` changes.
 */
function slowFunction(num) {
    console.log("Calling Slow Function");
    for (let i = 0; i <= 1000000000; i++) {}
    return num * 2;
}
