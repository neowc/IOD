// Lab Exercise 2
const cats = [
        { id:1, url:"https://placebear.com/200/200", name: 'Cheetah', latinName: 'Acinonyx jubatus' },
        { id:2, url:"https://placebear.com/200/250", name: 'Cougar', latinName: 'Puma concolor' },
        { id:3, url:"https://placebear.com/200/300", name: 'Jaguar', latinName: 'Panthera onca' },
        { id:4, url:"https://placebear.com/250/200", name: 'Leopard', latinName: 'Panthera pardus' },
        { id:5, url:"https://placebear.com/250/350", name: 'Lion', latinName: 'Panthera leo' },
        { id:6, url:"https://placebear.com/250/300", name: 'Snow leopard', latinName: 'Panthera uncia' },
        { id:7, url:"https://placebear.com/300/350", name: 'Tiger', latinName: 'Panthera tigris' },
    ];

import SingleCat from "./SingleCat";

function BigCats() {
    return (
        <div className="big-cats">
            <h2>Big Cats - Lab Exercise 2</h2>
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

export default BigCats;
