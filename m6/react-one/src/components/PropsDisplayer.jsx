// Create a new file called PropsDisplayer.jsx in a components folder
function PropsDisplayer(props) {
  // convert object to string
    const stringProps = JSON.stringify(props);

    return (
      <div className="PropsDisplayer componentBox">
          <h2>Check out my props!</h2>
          <h3>{stringProps}</h3>
          <p>Name: {props.name} is {props.age} years old</p>
      </div>
    );
}

import PropTypes from 'prop-types';

// export this component so we can import it elsewhere
PropsDisplayer.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

export default PropsDisplayer;
