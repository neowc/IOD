// Exercise 3: Props and Conditional Rendering
// Create a component called Greeting in its own file.
// If a name prop is passed, display "Hello, [name]!".
// If no name is provided, default to "Hello, World!".
// Add a child message to the Greeting component, such as "Welcome to the class!".
// Use Greeting in App.jsx and pass different props to test its behavior.

import PropTypes from 'prop-types';

export function Greeting({name} ) {
  //const cond = timer !== undefined ? "exists" : "timer is not passed";

  return (
    <div className="Greeting">
      <h3>My Greeting</h3>
      <p> Greeting Welcome to the class</p>
      {/* <h1> {name}</h1> */}
      {name !== undefined ? <h3> Hello, {name}</h3> : <h3>Hello, World!</h3>}
    </div>
  );
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

