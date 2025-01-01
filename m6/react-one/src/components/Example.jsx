
import PropTypes from 'prop-types';

export default function ExampleComponent({timer} ) {
  //const check = timer !== undefined ? "exists" : "timer is not passed";

  return (
    <div className="ExampleComponent componentBox">
      <h2>My Example Component</h2>
      <p>My first React component!</p>
      {/* <h1>{timer}</h1> */}
      {timer !== undefined ? <h2>{timer}</h2> : <h2>timer is not passed</h2>}
    </div>
  );
}
ExampleComponent.propTypes = {
  timer: PropTypes.number.isRequired,
};

