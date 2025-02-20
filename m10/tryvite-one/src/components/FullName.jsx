import PropTypes from 'prop-types';

function NamePart(props) {
    return (
        // reusable component to display part of a name from the value prop
        <span className="NamePart">{props.value}</span>
    );
    }

export default function FullName(props) {
    return (
        // composes the NamePart component to display a full name
        <div className="FullName componentBox">
        Full name: <NamePart value={props.first} />{" "}
        <NamePart value={props.middle} /> {" "}
        <NamePart value={props.last} />
        </div>
    );
}

FullName.propTypes = {
    first: PropTypes.string.isRequired,
    middle: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
};

NamePart.propTypes = {
    value: PropTypes.string.isRequired
};

