import { useState } from "react";
// Step 2: Define the custom hook "useCounter".
export function useCCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);

    // create increment
    const increment = () => {setCount(count + 1)};
    // create decrement
    const decrement = () => {setCount(count - 1)};
    // create reset
    const reset = () => setCount(initialValue);

    // function handleChange(e) {
    //     setCount(e.target.value);
    // }

    // const inputProps = {
    //     value: count,
    //     onChange: handleChange
    // };
    // returns data to be used by a component
    //return [inputProps, reset];
    return { count, increment, decrement, reset };
}

