import { useRef, useState } from "react";

function UseRefExample() {
    // Step 2: Create a state to track input value changes (optional for comparison purposes).
    // const currencies = ["USD", "AUD", "NZD", "GBP", "EUR", "SGD"];
    // const [price, setPrice] = useState(null);
    // const [currency, setCurrency] = useState('USD');
    const [text, setText] = useState("");

    // Step 3: Create a ref using useRef for the input field.
    // const inputRef = useRef(null);
    const inputRef = useRef();

    // Step 4: Create a function to focus the input field using the ref.
    const focusInput = () => {
        // Check if the ref is available before focusing
        // if (!inputRef.current) return;
        // inputRef.current.focus();
        if (inputRef.current)
            {
                inputRef.current.style.backgroundColor = "yellow";
                inputRef.current.focus();
            }
    };

    // Step 5: Create a function to clear the input field without causing a re-render.
    const clearInput = () => {
        if (inputRef.current)
            {
                inputRef.current.value = "";
                setText("");
            }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>useRef Hook Exercise</h1>
            <input
                type="text"
                placeholder="Type something..."
                ref={inputRef} // Attach the ref to this input element
                onChange={(e) => {
                    setText(e.target.value);
                }}
            />
            <p>State Value: {text}</p>
            <button onClick={focusInput}>Focus Input</button>
            <button onClick={clearInput}>Clear Input</button>
        </div>
    );
}

export default UseRefExample;