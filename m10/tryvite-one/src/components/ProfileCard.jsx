import PropTypes from 'prop-types';

export default function ProfileCard( {name, age, bio} ) {
    return (
        <div className="profile-card">
            <h1>{name}</h1>
            <p>Age: {age}</p>
            <p>Bio: {bio}</p>
            {/* <ExampleComponent /> */}
        </div>
    );
}

ProfileCard.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    bio: PropTypes.string.isRequired,
};