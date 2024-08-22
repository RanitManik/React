# `useMemo` Hook

## Table of Contents

- [`useMemo` Hook](#usememo-hook)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Basic Usage](#basic-usage)
  - [Example Usage](#example-usage)
  - [Explanation](#explanation)
  - [When to Use `useMemo`](#when-to-use-usememo)
  - [Gotchas](#gotchas)
  - [Conclusion](#conclusion)
  - [Additional Resources](#additional-resources)

## Introduction

The `useMemo` Hook in React is a performance optimization tool that allows you to memoize the result of a computation. This means that React will "remember" the computed result of a function and only recompute it when one of its dependencies changes. This can be especially useful for expensive calculations that would otherwise slow down your application if executed on every render.

## Basic Usage

The `useMemo` Hook takes two arguments:

1. A function that returns the computed value you want to memoize.
2. An array of dependencies, which tells React when to recompute the memoized value.

**Syntax:**

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Here, `computeExpensiveValue(a, b)` will only be recomputed when either `a` or `b` changes. If neither changes, the cached result is returned.

## Example Usage

Here’s a practical example to understand `useMemo`:

```javascript
import { useState, useMemo } from "react";

export default function App() {
    const [number, setNumber] = useState(0);
    const [dark, setDark] = useState(false);

    // Memoizing the result of the slowFunction to avoid recalculating on every render
    const doubleNumber = useMemo(() => slowFunction(number), [number]);

    // Memoizing the theme styles to ensure that they only update when 'dark' changes
    const themeStyles = useMemo(
        () => ({
            backgroundColor: dark ? "black" : "white",
            color: dark ? "white" : "black",
        }),
        [dark],
    );

    return (
        <>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
            />
            <button onClick={() => setDark((prevDark) => !prevDark)}>
                Change Theme
            </button>
            <div style={themeStyles}>{doubleNumber}</div>
        </>
    );
}

function slowFunction(num) {
    console.log("Calling Slow Function");
    for (let i = 0; i <= 1000000000; i++) {} // Simulate a heavy computation
    return num * 2;
}
```

## Explanation

1. **Memoizing the Result of `slowFunction`**:
    - `slowFunction` is a computationally expensive function that takes time to execute.
    - Without `useMemo`, this function would be called on every render, causing a performance hit.
    - By wrapping the function call in `useMemo`, the result is only recalculated when the `number` changes.

2. **Memoizing the `themeStyles` Object**:
    - React's rendering mechanism may cause unnecessary re-renders if a new object is created on every render, even if its values are the same.
    - By using `useMemo`, we ensure that the `themeStyles` object is only recreated when the `dark` state changes. This prevents unnecessary re-renders of components relying on `themeStyles`.

## When to Use `useMemo`

- **Performance Optimization**: Use `useMemo` when you have an expensive calculation that doesn’t need to be recalculated on every render.
- **Avoiding Unnecessary Re-renders**: When passing objects to child components, use `useMemo` to prevent them from re-rendering unnecessarily due to object reference changes.

## Gotchas

- **Premature Optimization**: Do not overuse `useMemo`. It should only be used when there is a clear performance bottleneck. Overusing `useMemo` can add unnecessary complexity without significant benefits.
- **Dependency Array**: Ensure the dependency array is correctly specified. Missing dependencies or adding unnecessary ones can lead to bugs or reduced performance.

## Conclusion

The `useMemo` Hook is a powerful tool in React for optimizing performance by memoizing the results of expensive calculations or preventing unnecessary re-renders due to reference changes in objects or arrays. However, it should be used judiciously and only when a real performance issue is identified.

## Additional Resources

- [React Official Documentation: `useMemo`](https://react.dev/reference/react/useMemo)
- [Web Dev Simplified Blog: `useMemo`](https://blog.webdevsimplified.com/2020-05/memoization-in-react/)