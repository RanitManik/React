import { useEffect, useState } from "react";

function App() {
    // State to manage the type of resource to be fetched (e.g., posts, users, comments)
    const [resourceType, setResourceType] = useState("posts");

    // State to store the fetched items
    const [items, setItems] = useState([]);

    // State to store the current window width, useful for responsive design
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Function to handle window resize and update the state with the new width
    function handleResize() {
        setWindowWidth(window.innerWidth);
    }

    /*
     * useEffect to fetch data whenever `resourceType` changes.
     * It listens for changes in `resourceType` and fetches the appropriate data from the API.
     * The dependency array `[resourceType]` ensures that this effect only runs when `resourceType` changes.
     */
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            .then((response) => response.json())
            .then((json) => setItems(json))
            .catch((error) => console.error("Error fetching data:", error)); // Added error handling
    }, [resourceType]);

    /*
     * useEffect to handle window resize events.
     * This effect sets up an event listener for window resize events and cleans up by removing the event listener when the component unmounts.
     * The empty dependency array `[]` ensures this effect runs only once after the initial render.
     */
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="app-container">
            <div className="request-container">
                {/* Buttons to switch between different resource types */}
                <button onClick={() => setResourceType("posts")}>Posts</button>
                <button onClick={() => setResourceType("users")}>Users</button>
                <button onClick={() => setResourceType("comments")}>
                    Comments
                </button>
                <h1>{resourceType}</h1>
                <h2>Window Width: {windowWidth}px</h2>
            </div>
            <div className="response-container">
                {/* Displaying the fetched items in a more readable format */}
                {items.map((item) => (
                    <div className="item" key={item.id}>
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
