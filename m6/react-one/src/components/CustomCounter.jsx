// Step 3: Create a new React component named "CustomHookExample" to use the custom hook.
import { useCCounter } from "./hooks/useCCounter";

function CustomHookExample() {
    const { count, increment, decrement, reset } = useCCounter(0);

    return (
        <div style={{ padding: "20px" }}>
        <h1>Custom Hook Exercise</h1>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
        </div>
    );
}

export default CustomHookExample;
