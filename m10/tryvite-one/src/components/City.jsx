import PropTypes from 'prop-types';

// destructures props object into 3 variables, two with defaults
function City({ name, state = "NSW", country = "Australia", children} ) {
    return (
        <div className="City componentBox">
            <strong>{name}</strong> is in {state}, {country}
            {/* destructuring the props.children property as well */}
            {children}
        </div>
    );
}

City.propTypes = {
    name: PropTypes.string.isRequired,
    state: PropTypes.string,
    country: PropTypes.string,
    children: PropTypes.node
};

export default City;
