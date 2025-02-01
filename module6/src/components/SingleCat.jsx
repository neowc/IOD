// Lab Exercise 2
import PropTypes from 'prop-types';

function SingleCat({name, latinName, url}) {
    return (
        <div className="SingleCat componentBox">
            <img className="cat-image" src={url} alt={name} />
            <h3>{name} (<em>{latinName}</em>)</h3>
        </div>
    );
}

SingleCat.propTypes = {
    name: PropTypes.string.isRequired,
    latinName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default SingleCat;
