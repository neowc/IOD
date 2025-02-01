// Lab Exercise 1
import PropTypes from 'prop-types';

export function Greeting({name, children} ) {

  return (
    <div className="Greeting">
      <h3>Weicheong&apos;s Greeting - Lab Exercise 1</h3>
      {name !== undefined ? <h3> Hello {name}</h3> : <h3>Hello, World!</h3>}
      <span>Message:</span> {children}
    </div>
  );
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node
};

