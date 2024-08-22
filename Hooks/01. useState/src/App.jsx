import { useState } from "react";

/* Function to compute the initial state value */
function countInitial() {
    console.log("Initial count set to 4");
    return 4;
}

function App() {
    /*
     * Passing `countInitial` as a reference to `useState` ensures that the function is only executed once during the initial render,
     * setting the initial state. This approach prevents unnecessary re-execution on each render, optimizing performance.
     * If `countInitial()` (with parentheses) were used instead, the function would execute immediately during each render,
     * which is usually not desirable.
     */
    const [count, setCount] = useState(countInitial);

    // Using an object to manage multiple pieces of state together
    const [state, setState] = useState({ countNumber: 0, theme: "R" });

    // Function to increment the countNumber while preserving other state properties
    function changeState() {
        setState((prevState) => ({
            ...prevState,
            countNumber: prevState.countNumber + 1,
        }));
    }

    /*
     * NOT RECOMMENDED:
     * Directly updating the state based on the current `count` value can cause issues, especially when state updates are batched or asynchronous,
     * leading to potential inconsistencies or stale values.
     *
     * const incrementCount = () => {
     *     setCount(count + 1);
     * };
     * const decrementCount = () => {
     *     setCount(count - 1);
     * };
     */

    /*
     * RECOMMENDED:
     * These functions update the state using the previous state value (`prevCount`), ensuring that updates are accurate
     * and consistent, even when multiple updates are triggered rapidly or asynchronously.
     */
    const incrementCount = () => {
        setCount((prevCount) => prevCount + 1);
    };
    const decrementCount = () => {
        setCount((prevCount) => prevCount - 1);
    };

    return (
        <div className="container">
            <div>
                <button onClick={decrementCount}>-</button>
                <span>{count}</span>
                <button onClick={incrementCount}>+</button>
            </div>
            <div>
                <span>Theme: {state.theme}</span>
                <span> Count: {state.countNumber}</span>
                <button onClick={changeState}>Increment Count</button>
            </div>
        </div>
    );
}

export default App;
