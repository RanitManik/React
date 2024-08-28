import { ACTIONS } from "./App";

export default function Todo({ todo, dispatch }) {
    return (
        <div className="todo-item">
            <span
                className={`todo-name ${todo.complete ? "complete" : ""}`}
            >
                {todo.name}
            </span>
            <div className="actions">
                <button
                    className="button toggle"
                    onClick={() =>
                        dispatch({
                            type: ACTIONS.TOGGLE_TODO,
                            payload: { id: todo.id },
                        })
                    }
                >
                    Toggle
                </button>
                <button
                    className="button delete"
                    onClick={() =>
                        dispatch({
                            type: ACTIONS.DELETE_TODO,
                            payload: { id: todo.id },
                        })
                    }
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
