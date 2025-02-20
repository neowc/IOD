    const cats = [
        { id:1, url:"https://placebear.com/250/250", name: 'Cheetah', latinName: 'Acinonyx jubatus' },
        { id:2, url:"https://placebear.com/250/250", name: 'Cougar', latinName: 'Puma concolor' },
        { id:3, url:"https://placebear.com/250/250", name: 'Jaguar', latinName: 'Panthera onca' },
        { id:4, url:"https://placebear.com/250/250", name: 'Leopard', latinName: 'Panthera pardus' },
        { id:5, url:"https://placebear.com/250/250", name: 'Lion', latinName: 'Panthera leo' },
        { id:6, url:"https://placebear.com/250/250", name: 'Snow leopard', latinName: 'Panthera uncia' },
        { id:7, url:"https://placebear.com/250/250", name: 'Tiger', latinName: 'Panthera tigris' },
    ];

import PropTypes from 'prop-types';

function SingleCat({name, latinName, url}) {
    return (
        <div className="SingleCat componentBox">
            <img className="cat-image" src={url} alt={name} />
            <h3>{name} (<em>{latinName}</em>)</h3>
        </div>
    );
}
function BigCats() {
    return (
        <div className="big-cats">
            <h2>Big Cats</h2>
            <div className="cats-list">
                {cats.map((cat) => (
                    <SingleCat
                    key={cat.id}
                    {...cat}
                    />
                ))}
            </div>
        </div>
    );
};

SingleCat.propTypes = {
    name: PropTypes.string.isRequired,
    latinName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default BigCats;
