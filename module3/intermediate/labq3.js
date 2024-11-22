const animals = ['Tiger', 'Giraffe']
console.log(animals)
//Add 2 new values to the end
animals.push('Elephant', 'Lion')
//Add 2 new values to the beginning
animals.unshift('Dog', 'Cat')
//Sort the values alphabetically
animals.sort();
console.log(animals);
//Write a function replaceMiddleAnimal(newValue) that replaces the value in the middle of the animals array with newValue
function replaceMiddleAnimal(newValue) {
    const middleIndex = Math.floor(animals.length / 2);
    animals[middleIndex] = newValue;
}
replaceMiddleAnimal('Snake');
console.log(animals);
//Write a function findMatchingAnimals(beginsWith) that returns a new array containing all the animals that begin with the beginsWith string. Try to make it work regardless of upper/lower case
function findMatchingAnimals(beginsWith) {
    const matchingAnimals = [];
    for (let animal of animals) {
        if (animal.toLowerCase().startsWith(beginsWith.toLowerCase())) {
            matchingAnimals.push(animal);
        }
    }
    return matchingAnimals;
}
console.log(findMatchingAnimals('g'));