# `useRef` Hook

## Overview

The `useRef` Hook in React is a versatile tool that can be used for multiple purposes. It primarily serves two key functions:

1. Storing mutable values that persist across renders without causing a re-render.
2. Directly accessing and manipulating DOM elements.

## Use Cases

### 1. Tracking Mutable Values

Unlike state variables, updating a `useRef` value (`ref.current`) does not trigger a re-render. This makes `useRef` ideal for tracking values that need to persist between renders but don't require the component to re-render when they change.

### 2. Accessing DOM Elements

`useRef` can be used to create a reference to a DOM element in a functional component. This reference can then be used to directly manipulate the DOM element, such as focusing an input field, without relying on the virtual DOM's re-rendering process.

## Syntax

```javascript
const refContainer = useRef(initialValue);
```

- **`initialValue`**: The initial value you want to store in the ref. It can be `null`, an object, or any other value.
- **`refContainer.current`**: This is the mutable value that you can update or access.

## Examples

### Example 1: Tracking Previous State Value

This example demonstrates how `useRef` can be used to track the previous value of a state variable.

```javascript
import { useState, useEffect, useRef } from "react";

function App() {
    const [name, setName] = useState("");
    const prevName = useRef("");

    useEffect(() => {
        prevName.current = name;
    }, [name]);

    return (
        <>
            <input
                value={name}
                type="text"
                placeholder="Type anything to rerender the component"
                onChange={(e) => setName(e.target.value)}
            />
            <h1>
                My name is {name}, and it was {prevName.current} before
            </h1>
        </>
    );
}
```

**Explanation**:

- `prevName` is a `useRef` that tracks the previous value of `name`.
- The `useEffect` Hook updates `prevName.current` to the current `name` value after every render.
- The previous value is then displayed in the component.

### Example 2: Focusing an Input Field

This example demonstrates how `useRef` can be used to control and interact with a DOM element directly.

```javascript
import { useState, useRef } from "react";

function App() {
    const [name, setName] = useState("");
    const inputRef = useRef();

    function focus() {
        inputRef.current.focus();
    }

    return (
        <>
            <input
                ref={inputRef}
                value={name}
                type="text"
                placeholder="Type anything to rerender the component"
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={focus}>Focus</button>
        </>
    );
}
```

**Explanation**:

- `inputRef` is a `useRef` that holds a reference to the input DOM element.
- The `focus` function uses `inputRef.current.focus()` to set focus on the input field when the "Focus" button is clicked.

## Gotchas

1. **Does Not Trigger Re-Renders**: Unlike state, updating a `useRef` value does not trigger a re-render. This makes it useful for storing information that needs to persist across renders without affecting the component’s lifecycle.
2. **Refs Are Not Reactive**: Changing `ref.current` doesn’t cause any updates or re-renders in your component, and the change is not reflected until the next render cycle.
3. **Initial Value Is Persistent**: The initial value provided to `useRef` is persistent across renders. Even after multiple renders, the `useRef` will retain its current value unless explicitly changed.

## Conclusion

The `useRef` Hook is a powerful tool in React for managing mutable values that don't need to trigger re-renders and for directly interacting with DOM elements. Understanding when and how to use `useRef` can greatly enhance the performance and capabilities of your React applications.

## Additional Resources

- [React Official Documentation: `useRef`](https://react.dev/reference/react/useRef)
- [Web Dev Simplified Blog: `useRef`](https://blog.webdevsimplified.com/2020-05/use-ref/)
