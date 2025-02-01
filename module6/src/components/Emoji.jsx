// Lab Exercise 3

import { useState } from "react";
import PropTypes from "prop-types";

function DisplayEmoji({ isHappy }) {
    return (
        <span role="img" aria-label={isHappy ? "happy" : "angry"}>
            {isHappy ? "😊" : "😡"}
        </span>
        );
}

DisplayEmoji.propTypes = {
    isHappy: PropTypes.bool.isRequired,
};


function UpdateEmoji({ handleEmojiUpdate }) {
    return <button onClick={handleEmojiUpdate}>Toggle mood</button>;
}

UpdateEmoji.propTypes = {
    handleEmojiUpdate: PropTypes.func.isRequired,
};

export default function Emoji() {
    const [isHappy, setIsHappy] = useState(true);

    function handleEmojiUpdate() {
        setIsHappy(!isHappy);
    }

    return (
        <div className="Emoji">
            <h2>Emoji - Lab Exercise 3</h2>
            <DisplayEmoji isHappy={isHappy} />

            <UpdateEmoji handleEmojiUpdate={handleEmojiUpdate} />
        </div>
    );
}
