import { useState, useEffect, useRef } from "react";

export default function App() {
    // State to manage the input value
    const [name, setName] = useState("");

    // useRef to keep track of the previous value of the input
    const prevName = useRef("");

    // useRef to create a reference to the input element, allowing us to programmatically focus on it
    const inputRef = useRef();

    // useEffect runs after every render and updates the prevName ref to the current name value
    useEffect(() => {
        prevName.current = name;
    }, [name]); // This effect depends on 'name', so it runs every time 'name' changes

    // Function to focus on the input element when the button is clicked
    function focus() {
        inputRef.current.focus();
        // Avoid directly manipulating the DOM element via the ref, such as setting the value, to prevent potential issues with React's state management.
    }

    return (
        <>
            {/* The input field is linked to the inputRef, allowing us to programmatically control it */}
            <input
                ref={inputRef}
                value={name}
                type="text"
                placeholder="Type anything to rerender the component"
                onChange={(e) => setName(e.target.value)} // Updates the state with the input value
            />
            {/* Button to focus the input field */}
            <button onClick={focus}>Focus</button>

            {/* Display the current name and the previous name */}
            <h1>
                My name is <span>{name}</span> and it was{" "}
                <span>{prevName.current}</span> before
            </h1>

            {/* 
            Example of using a render count with useRef (commented out for now)
            The following section demonstrates how to track how many times the component has rendered:
            
            const renderCount = useRef(1);

            useEffect(() => {
                renderCount.current = renderCount.current + 1;
            });

            <h1>
                components rendered <span>{renderCount.current}</span> times
            </h1> 
            */}
        </>
    );
}
