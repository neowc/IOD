import { useState } from "react";

// save in MoodChanger.jsx
function MoodChanger() {
    // two variables :
    // mood stores current mood, default happy
    // setMood is a function for updating mood
    const [mood, setMood] = useState("happy");
    //return <div className="MoodChanger componentBox">Current Mood: {mood}</div>;
    return (
        <div className="MoodChanger componentBox">
            <h3>Current Mood: {mood}</h3>
            <button onClick={() => setMood("happy")}>Happy</button>
            <button onClick={() => setMood("ecstatic")}>Ecstatic</button>
            <button onClick={() => setMood("sad")}>Sad</button>
            <button onClick={() => setMood("mad")}>Mad</button>
            <button onClick={() => setMood("confused")}>Confused</button>
        </div>
        // <div className="MoodChanger componentBox">
        //     Current Mood: {mood}
        // </div>
    );
}
export default MoodChanger;
