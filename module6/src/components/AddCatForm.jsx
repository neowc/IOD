import PropTypes from 'prop-types';
import { useState } from "react";

function AddCatForm() {
    const cats = [
        { id:1, name: 'Cheetah', latinName: 'Acinonyx jubatus' },
        { id:2, name: 'Cougar', latinName: 'Puma concolor' },
        { id:3, name: 'Jaguar', latinName: 'Panthera onca'  },
        { id:4, name: 'Leopard', latinName: 'Panthera pardus' },
    ];

    const [currentCats, setCurrentCats] = useState(cats);

    const handleAddCat = (newCat) => {
        newCat.id = currentCats.length + 1;
        setCurrentCats([...currentCats, newCat]);
    }

    return (
        <div className="CatsList componentBox">
            <h2>Cats List - Lab Exercise 5</h2>
        <ul>
            {/* iterate over each cat, print the name in a list */}
            {currentCats.map((cat) => (
                    <Cats
                    key={cat.id}
                    {...cat}
                    />
                ))}
        </ul>
        <AddCat onAddCat={handleAddCat}/>
        </div>
    );
}

function Cats({name, latinName}) {
    return (
        <div className="Cats componentBox">
            {name}{" | "}{latinName}
        </div>
    );
};


export function AddCat({onAddCat}) {
    const [name, setName] = useState('')
    const [latinName, setLatinName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCat({name, latinName})

    }
    return (
        <div className="AddCat componentBox">
            <form onSubmit={handleSubmit}>
                <label>Cat&apos;s Name:<input name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>Cat Latin name:<input name="latinName" value={latinName} onChange={(e) => setLatinName(e.target.value)} />
                </label>
                <button>Add Cat</button>
            </form>
        </div>
    )
}

Cats.propTypes = {
    name: PropTypes.string.isRequired,
    latinName: PropTypes.string.isRequired,
};

AddCat.propTypes = {
    onAddCat: PropTypes.func.isRequired,
};

export default AddCatForm;
