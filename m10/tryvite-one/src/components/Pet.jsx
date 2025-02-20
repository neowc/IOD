
import PropTypes from 'prop-types';

function Pet(props) { // add this to a new file Pet.jsx in the components folder
    let type = 'unknown'; // set default value for type
    if (props.type) type = props.type; // override with prop type if set (could also destructure with default)

    return (
        <div className="Pet componentBox">
            <h2>My Pet</h2> <p>Type: {type}</p>

            {/* if props.name is truthy (not undefined), render it in a <p> tag, otherwise render nothing */}
            {props.name ? <p>Name: {props.name}</p> : null}

            {/* Only render the <p> tag if the expression before the && is truthy */}
            {props.colour && <p>Colour: {props.colour}</p>}
        </div>)
}

Pet.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    colour: PropTypes.string
};

export default Pet; // render this component in App.jsx. Try out different prop values, add support for more