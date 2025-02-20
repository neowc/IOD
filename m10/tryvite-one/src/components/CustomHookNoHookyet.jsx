import { useState } from "react";

export default function SubscribeForm() {
    const [status, setStatus] = useState("");

    // similar state variables mapped to form inputs
    const [firstName, setFirstName] = useState("Mary");
    const [email, setEmail] = useState("mary@poppins.com");

    // similar handler functions
    const handleNameChange = (e) => setFirstName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    function handleSubscribe() {
        setFirstName("");
        setEmail("");
        setStatus("Thanks for subscribing!");
    }

    return (
        <div className="SubscribeForm componentBox">
        <label>
            First name: {/* form inputs with similar props */}
            <input value={firstName} onChange={handleNameChange} />
        </label>
        <label>
            Email: {/* form inputs with similar props */}
            <input value={email} onChange={handleEmailChange} />
        </label>
        <button onClick={handleSubscribe}>Subscribe</button>
        <div>{status}</div>
        </div>
    );
}
