
import PropTypes from 'prop-types';

export default function ExampleComponent({timer} ) {
  //const cond = timer !== undefined ? "exists" : "timer is not passed";

  return (
    <div className="ExampleComponent componentBox">
      <h1>My Example Component</h1>
      <p>My first React component!</p>
      <h1> {timer}</h1>
      {timer !== undefined ? <h1> {timer}</h1> : <h1>timer is not passed</h1>}
    </div>
  );
}
ExampleComponent.propTypes = {
  timer: PropTypes.number.isRequired,
};

