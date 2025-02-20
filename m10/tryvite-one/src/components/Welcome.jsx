
// componentBox class styles a component into a box
// Welcome class identifies this component
import PropTypes from 'prop-types';

export default function Welcome(props) {
  // custom Welcome component
    return (
        // <div className="Welcome">
        <div className="componentBox">
            {/* if the 'name' prop exists, render it on the screen */}
            <h3>Welcome {props.name}!</h3>
            {/* if this component has children, render them here */}
            {props.children}
        </div>
    );
}

Welcome.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node
};