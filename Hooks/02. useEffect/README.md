# `useEffect` Hook

## Overview

The `useEffect` Hook is a powerful tool in React that allows you to perform side effects in your function components. Side effects can include tasks such as data fetching, subscriptions, or manually changing the DOM. The `useEffect` Hook replaces lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in class components.

## Key Concepts

### 1. **Basic Usage**

```javascript
import { useEffect } from "react";

useEffect(() => {
    // Code to run on component mount
    console.log("Component mounted");

    return () => {
        // Code to run on component unmount
        console.log("Component unmounted");
    };
}, []); // The empty array ensures this effect only runs once on mount and unmount
```

- **Effect Function**: The first argument to `useEffect` is a function that contains the side-effect logic. This function is executed after every completed render by default.
- **Cleanup Function**: The function returned from the effect function is the cleanup function. It is invoked before the component unmounts or before the effect is re-executed on subsequent renders.
- **Dependency Array**: The second argument is an array of dependencies. If this array is empty (`[]`), the effect only runs once when the component mounts and cleans up when the component unmounts.

### 2. **Fetching Data with `useEffect`**

```javascript
import { useEffect, useState } from "react";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setData(data));
    }, []); // Empty dependency array to run the effect only on mount

    return (
        <div>
            {data.map(post => (
                <div key={post.id}>{post.title}</div>
            ))}
        </div>
    );
}
```

- **Data Fetching**: The effect runs once on component mount to fetch data from an API. The empty dependency array ensures the fetch operation is only triggered once.
- **Updating State**: The data is stored in the component’s state using `useState`, and rendered in the component.

### 3. **Listening to Window Resize Events**

```javascript
import { useEffect, useState } from "react";

function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // No dependencies ensure that the resize listener is set up only once

    return (
        <div>
            <h1>Window width: {windowWidth}</h1>
        </div>
    );
}
```

- **Event Listeners**: The `useEffect` Hook is used to add and remove event listeners, ensuring that resources are cleaned up properly when the component unmounts.

### 4. **Dependency Management**

```javascript
import { useEffect, useState } from "react";

function App() {
    const [resourceType, setResourceType] = useState('posts');
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            .then(response => response.json())
            .then(json => setItems(json));
    }, [resourceType]); // Effect re-runs when `resourceType` changes

    return (
        <div>
            <button onClick={() => setResourceType('posts')}>Posts</button>
            <button onClick={() => setResourceType('users')}>Users</button>
            <button onClick={() => setResourceType('comments')}>Comments</button>
            <h1>{resourceType}</h1>
            <div>{JSON.stringify(items)}</div>
        </div>
    );
}
```

- **Dependencies**: The effect listens for changes in the `resourceType` state variable. The effect re-executes whenever `resourceType` changes, fetching new data based on the current type.

### 5. **Cleaning Up Effects**

```javascript
useEffect(() => {
    const interval = setInterval(() => {
        console.log('This will run every second');
    }, 1000);

    return () => clearInterval(interval); // Cleanup to prevent memory leaks
}, []);
```

- **Memory Leaks**: Always clean up subscriptions, timers, or listeners to avoid memory leaks when components unmount or re-render.

## Gotchas

1. **Order of Hook Calls**: Hooks must be called in the same order on every render. Don’t call hooks conditionally.
2. **Avoiding Stale Closures**: Be cautious of stale closures where the effect refers to outdated variables from a previous render. Consider including these variables in the dependency array.
3. **Avoid Overusing Effects**: Use `useEffect` wisely. Not every side effect needs to be placed in `useEffect`. If the side effect doesn’t involve the DOM or external data, it might not need an effect.

## Conclusion

The `useEffect` Hook is a cornerstone of functional React components, enabling them to handle side effects in a clean, declarative way. Properly understanding how and when to use `useEffect` will make your components more efficient, responsive, and easier to maintain.

## Additional Resources

- [React Official Documentation: `useState`](https://react.dev/reference/react/useEffect)
- [Web Dev Simplified Blog: `useState`](https://blog.webdevsimplified.com/2020-04/use-effect/)