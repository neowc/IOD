//Create an Emoji component which initially renders a happy emoji
//When the user clicks on the emoji, it should change to a sad emoji
//The emoji should be rendered using a functional component
//The emoji should be styled using CSS

import { useState } from "react";

function Emoji() {
    const [emoji, setEmoji] = useState("😀");

    function changeEmoji() {
        setEmoji("😢");
    }

    return (
        <div>
        <h1>{emoji}</h1>
        <button onClick={changeEmoji}>Change Emoji</button>
        </div>
    );
}

export default Emoji;