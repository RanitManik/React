# React `useState` Hook

The `useState` hook is a fundamental part of React's functional component API, allowing you to manage state within functional components. This document provides a comprehensive guide to using `useState`, including common gotchas, best practices, and examples.

## Overview

The `useState` hook is used to add state variables to functional components. It returns an array containing the current state value and a function to update that state.

```javascript
const [state, setState] = useState(initialState);
```

- **`state`**: The current state value.
- **`setState`**: A function that updates the state.

## Gotchas

### 1. Hooks Can Only Be Used Inside Functional Components

You can only use hooks like `useState` inside functional components. Hooks do not work in class components.

```javascript
// Correct usage inside a functional component
function MyComponent() {
    const [state, setState] = useState(0);
    // ...
}
```

### 2. Hooks Must Be Called in the Same Order

Hooks must be called in the exact same order on every render. This means you cannot call hooks inside conditional statements, loops, or nested functions.

```javascript
// Incorrect usage - hooks inside a conditional
if (someCondition) {
    const [state, setState] = useState(0); // This will cause errors
}

// Correct usage
const [state, setState] = useState(0);
if (someCondition) {
    // Use state here
}
```

## Using `useState`

### Basic Usage

The `useState` hook is initialized with an initial state value. This can be a primitive type (like a number or string) or a more complex object.

```javascript
const [count, setCount] = useState(0);
```

### Updating State

There are two common ways to update the state using `useState`:

1. **Direct Update (Not Recommended)**:
    - Directly updating the state using the current state value.
    - This approach can lead to issues when updates are asynchronous or batched.
  
    ```javascript
    setCount(count + 1); // Not recommended
    ```

2. **Functional Update (Recommended)**:
    - Updating the state based on the previous state value. This ensures that the state update is based on the most current value.
  
    ```javascript
    setCount(prevCount => prevCount + 1); // Recommended
    ```

### Why Functional Update is Better

The functional update method (`prevCount => prevCount + 1`) ensures that the state update is based on the most recent state value. This is especially important in scenarios where multiple state updates may be triggered in quick succession, ensuring that the updates are consistent and accurate.

## Best Practices

- **Keep State Simple**: Only store values that are necessary for rendering. Complex computations should be derived from state, not stored directly.
- **Use Descriptive State Names**: Choose state variable names that clearly describe the data they hold. This improves code readability.
- **Avoid Complex Logic in `setState`**: The `setState` function should be as simple as possible. Complex logic can lead to bugs and make your component harder to understand.

## Examples

### Basic Counter Example

```javascript
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const incrementCount = () => setCount(prevCount => prevCount + 1);
    const decrementCount = () => setCount(prevCount => prevCount - 1);

    return (
        <div>
            <button onClick={decrementCount}>-</button>
            <span>{count}</span>
            <button onClick={incrementCount}>+</button>
        </div>
    );
}

export default Counter;
```

### Managing Multiple Pieces of State

```javascript
import React, { useState } from 'react';

function ThemeComponent() {
    const [state, setState] = useState({ count: 0, theme: 'light' });

    const incrementCount = () => setState(prevState => ({
        ...prevState,
        count: prevState.count + 1,
    }));

    return (
        <div>
            <span>Theme: {state.theme}</span>
            <span>Count: {state.count}</span>
            <button onClick={incrementCount}>Increment</button>
        </div>
    );
}

export default ThemeComponent;
```

## Additional Resources

- [React Official Documentation: `useState`](https://react.dev/reference/react/useState)
- [Web Dev Simplified Blog: `useState`](https://blog.webdevsimplified.com/2020-04/use-state/)
- [Built-in React Hooks](https://react.dev/reference/react/hooks)
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
