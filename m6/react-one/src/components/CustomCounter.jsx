// Step 3: Create a new React component named "CustomHookExample" to use the custom hook.
import { useState } from "react";
import { useCCounter } from "./hooks/useCCounter";

// export default function SubscribeForm() {
//     const [status, setStatus] = useState("");

//     // use our custom hook instead of useState directly
//     const [nameInputProps, resetName] = useFormInput("Yourname");
//     const [emailInputProps, resetEmail] = useFormInput("user@example.com");

//     function handleSubscribe() {
//         resetName();
//         resetEmail();
//         setStatus("Thanks for subscribing!");
//     }

//     return (
//         <div className="SubscribeForm componentBox">
//         <label>
//             First name: <input {...nameInputProps} />
//         </label>
//         <label>
//             Email: <input {...emailInputProps} />
//         </label>
//         <button onClick={handleSubscribe}>Subscribe</button>
//         <div>{status}</div>
//         </div>
//     );
// }

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
