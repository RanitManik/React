import { useState, useReducer } from "react";
import Todo from "./Todo";

// Define action types as constants
export const ACTIONS = {
    ADD_TODO: "add-todo",
    TOGGLE_TODO: "toggle-todo",
    DELETE_TODO: "delete-todo",
};

// Reducer function to manage todos based on actions
function reducer(todos, action) {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            return [...todos, newTodo(action.payload.name)];
        case ACTIONS.TOGGLE_TODO:
            return todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, complete: !todo.complete };
                }
                return todo;
            });
        case ACTIONS.DELETE_TODO:
            return todos.filter((todo) => todo.id !== action.payload.id);
        default:
            return todos;
    }
}

// Helper function to create a new todo item
function newTodo(name) {
    return {
        id: Date.now(),
        name,
        complete: false,
    };
}

export default function App() {
    const [todos, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState("");

    // Handle form submission to add a new todo
    function handleSubmit(e) {
        e.preventDefault();
        if (name.trim()) {
            dispatch({ type: ACTIONS.ADD_TODO, payload: { name } });
            setName("");
        }
    }

    return (
        <div className="todo-container">
            <form onSubmit={handleSubmit} className="todo-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    placeholder="Enter a new todo"
                />
                <button type="submit" className="button add">
                    Add Todo
                </button>
            </form>
            <div className="todo-list">
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} dispatch={dispatch} />
                ))}
            </div>
        </div>
    );
}
