import { useReducer } from "react";

// Define action types as constants
const ACTIONS = {
    INCREMENT: "increment",
    DECREMENT: "decrement",
};

// Reducer function to manage state transitions based on actions
function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return { count: state.count + 1 };
        case ACTIONS.DECREMENT:
            return { count: state.count - 1 };
        default:
            return state;
    }
}

export default function App() {
    // useReducer for state management
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    // Handlers for increment and decrement actions
    function increment() {
        dispatch({ type: ACTIONS.INCREMENT });
    }

    function decrement() {
        dispatch({ type: ACTIONS.DECREMENT });
    }

    return (
        <div className="counter-container">
            <button className="button increment" onClick={increment}>
                +
            </button>
            <span className="count">{state.count}</span>
            <button className="button decrement" onClick={decrement}>
                -
            </button>
        </div>
    );
}
