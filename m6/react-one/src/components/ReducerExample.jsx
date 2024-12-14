
// Step 1: Create a new React component named "UseReducerExample".
import { useReducer } from "react";

// Step 2: Define the initial state and reducer function.
const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return {count: state.count + 1};
        case "decrement":
            return {count: state.count - 1};
        case "reset":
            return initialState;
        default:
            //return state;
            throw new Error("Unknown action type");
    }
}

function UseReducerExample() {
    // Step 3: Initialize useReducer with the reducer function and initial state.
    const [counter, dispatch] = useReducer(reducer, initialState);

    return (
        <div style={{ padding: "20px" }}>
            <h1>useReducer Hook Exercise</h1>
            <p>Count: {counter.count}</p>
            {/* Step 4: Create buttons to dispatch actions. */}
            <button onClick={() => dispatch({ type: "increment" }) }>
                Increment
            </button>
            <button onClick={() => dispatch({ type: "decrement" }) }>
                Decrement
            </button>
            <button onClick={() => dispatch({ type: "reset" }) }>Reset</button>
        </div>
    );
}

export default UseReducerExample;