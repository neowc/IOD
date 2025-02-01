
// Lab Exercise 4
import { useState } from "react";
import SingleCat from "./SingleCat";

const cats = [
    { id:1, url:"https://placebear.com/200/200", name: 'Cheetah', latinName: 'Acinonyx jubatus' },
    { id:2, url:"https://placebear.com/200/250", name: 'Cougar', latinName: 'Puma concolor' },
    { id:3, url:"https://placebear.com/200/300", name: 'Jaguar', latinName: 'Panthera onca' },
    { id:4, url:"https://placebear.com/250/200", name: 'Leopard', latinName: 'Panthera pardus' },
    { id:5, url:"https://placebear.com/250/350", name: 'Lion', latinName: 'Panthera leo' },
    { id:6, url:"https://placebear.com/250/300", name: 'Snow leopard', latinName: 'Panthera uncia' },
    { id:7, url:"https://placebear.com/300/350", name: 'Tiger', latinName: 'Panthera tigris' },
];

function BigCatsImmutable() {
    const [catList, setCurrentCats] = useState(cats);
    const catListing = catList.map(cat => (
        <SingleCat key={cat.id} name={cat.name}
        latinName={cat.latinName} url={cat.url}/>
        ))
    const handleSort = () => {
        // first clone the original, so we don’t mutate it
        let newCatList = [...catList];
        newCatList.sort((a, b) => a.name.localeCompare(b.name));
        setCurrentCats(newCatList); // 3. set updated clone in state
    }
    const handleReverse = () => {
        // first clone the original, so we don’t mutate it
        let newCatList = [...catList];
        newCatList.reverse(); // 2. modify the clone
        setCurrentCats(newCatList); // 3. set updated clone in state
    }
    const handleFilter = () => {
        // first clone the original, so we don’t mutate it
        let newCatList = [...catList];
        // 1. filter the clone
        newCatList = newCatList.filter(cat => cat.latinName.includes('Panthera')); // 2. modify the clone
        setCurrentCats(newCatList); // 3. set updated clone in state
    }
    const handleReset = () => {
        // first clone the original, so we don’t mutate it
        let newCatList = [...cats];// 2. modify the clone
        setCurrentCats(newCatList); // 3. set updated clone in state
    }

    return (
        <div className="big-cats">
            <h2>Big Cats - Lab Exercise 4</h2>
            <ul>
            { catListing }
            </ul>
            <div className="MoodChanger componentBox">
                <button onClick={handleSort}>sorted</button>
                <button onClick={handleReverse}>reverse</button>
                <button onClick={handleFilter}>filter</button>
                <button onClick={handleReset}>reset</button>
            </div>
        </div>
    );
};

export default BigCatsImmutable;
