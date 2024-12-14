//import React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

export function ExampleComponent() {
  return (
    <div className="ExampleComponent componentBox">
      <h1>My Example Component</h1>
      <p>My first React component!</p>
    </div>
  );
}
export function DisplayText({ text }) {
  console.group(text);
  return (
    <div>
      <h1>{text}</h1>
      <p>My text component</p>
    </div>
  );
}
DisplayText.propTypes = {
  text: PropTypes.string.isRequired,
};

export function Component2() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Component 1</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br />
      <Link to="/component1">Go to Component 1</Link>
    </div>
  );
}
export default function Component1() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Component 1</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br />
      <Link to="/component2">Go to Component 2</Link>
    </div>
  );
}
