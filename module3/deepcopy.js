const car = {
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    owner: {
        name: "Jake",
        age: 27,
    },
};

// Make a shallow copy of another car here
let shallowCopy = {...car};
// Update the value of the shallow copy make to "BMW"
shallowCopy.make = "BMW";
// Update the value of the second level owner's age of the clone one to 71
shallowCopy.owner.age = 71;
const clone = {...car, make: "BMW", owner: {...car.owner, age: 71}};
// compare car first level with clone
console.log(car.make === clone.make, false); // should return false
// compare car second level with clone
console.log(car.owner.age === clone.owner.age, true); // should return true
// Make a deep copy this time using the same car object
const deeCopy = JSON.parse(JSON.stringify(car)); //*** */
// Update the value of the second level owner's age of the deep clone one to 91
deeCopy.owner.age = 91;
// compare car second level with deep clone
console.log(car.owner.age === clone.owner.age, false); // should return false
// Bonus: delete the owner property of the original object "car"
delete car.owner;

function answers() {
    // Make a shallow copy of another car here
    let clone = { ...car };
    // Update the value of the shallow copy make to "BMW"
    clone.make = "BMW";
    // Update the value of the second level owner's age of the clone one to 31
    clone.owner.age = 31;
    // compare car first level with clone
    console.log(car.make === clone.make, false); // should return false
    // compare car second level with clone
    console.log(car.owner.age === clone.owner.age, true); // should return true
    // Make a deep copy this time using the same car object
    clone = JSON.parse(JSON.stringify(car));
    // Update the value of the second level owner's age of the deep clone one to 77
    clone.owner.age = 77;
    // compare car second level with deep clone
    console.log(car.owner.age === clone.owner.age, false); // should return false
    // Bonus: delete the owner property of the original object "car"
    delete car.owner;
    console.log(car);
}
