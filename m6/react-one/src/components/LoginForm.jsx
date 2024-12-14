
import { useState } from "react";

// function LoginForm() {
// // new state value for showing submission messages to user
// const [submitResult, setSubmitResult] = useState("");

// const handleSubmit = (e) => {
//   e.preventDefault(); // prevent page reloading on form submit

//   // add some password validation
//     if (userPassword.length < 5) {
//         setSubmitResult("Password must be at least 5 characters long");
//     } else if (userPassword === userEmail) {
//         setSubmitResult("Password must not match email address");
//     } else {
//         setSubmitResult("Successful login.");
//     }
//     }

//     return (
//     <div className="LoginForm componentBox">
//         <form onSubmit={handleSubmit}>
//         {/* same form code as previously, BUT now includes
//     <form> and <button> */}
//         <button>Log In</button>
//         <p>{submitResult}</p>
//         </form>
//     </div>
// );
// }
// export default LoginForm;

export default function LoginForm() {
    // input state values always need to be strings - empty initially
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [submitResult, setSubmitResult] = useState("");
    const [attempts, setAttempt] = useState(0);
    const [hideForm, setHideForm] = useState(false);

    const handleSubmit = (e) => {
        const newAttempt = attempts + 1;
        if (newAttempt > 3) {
            setHideForm(true);
        }
        setAttempt(newAttempt);
        e.preventDefault(); // prevent page reloading on form submit
        // add some password validation
        if (userPassword.length < 5) {
            setSubmitResult('Password must be at least 5 characters long');
            } else if (userPassword === userEmail) {
            setSubmitResult('Password must not match email address');
            } else {
            setSubmitResult('Successful login.');
        }
        // another validation condition
        if (userEmail.length < 10) {
            setSubmitResult('Email must be at least 10 characters long');
        }
    }


    return (
        <div className="LoginForm componentBox">
            {!hideForm && (
            <form onSubmit={handleSubmit}>
            <div className="formRow">
                <label>
                    Email Address:
                    {/* Controlled form element needs both value and onChange. onChange handler uses event param e to access target value. Whenever user types, new value is stored in state. */}
                    <input
                        type="email"
                        value={userEmail}
                        name="userEmail"
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </label>
            </div>
            <div className="formRow">
                <label>
                    Password:
                    <input type="password" value={userPassword} name="password" onChange={(e) => setUserPassword(e.target.value)}
                    />
                </label>
            </div>
                <button>Log In</button>
                <p>{submitResult}</p>
            </form>
            )}
        </div>
    );
}