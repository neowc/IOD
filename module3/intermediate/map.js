// Iterating through Iterables

// Task: Write a program to loop through the following iterable objects using a for..of loop:
// Array: const animalsArr = ['tiger', 'lion', 'elephant', 'giraffe']
// Set: const animalSet = new Set(['cat', 'dog', 'rabbit', 'turtle'])
// Map: const animalMap = new Map([['bird', 'parrot'], ['fish', 'goldfish'], ['insect', 'bee']])

const animalsArr = ['tiger', 'lion', 'elephant', 'giraffe']
const animalSet = new Set(['cat', 'dog', 'rabbit', 'turtle'])
const animalMap = new Map([['bird', 'parrot'], ['fish', 'goldfish'], ['insect', 'bee']])

// Loop through the array
for (const animal of animalsArr) {
    console.log(animal)
}
// Loop through the set
for (const animal of animalSet) {
    console.log(animal)
}
// Loop through the map
for (const animal of animalMap) {
    console.log(animal)
}
// The for..of loop works for all iterables, including arrays, sets, and maps.
// It iterates over the values of the iterable object, ignoring the keys (if any).
// Note: For objects, the for..of loop iterates over the keys by default. To iterate over the values, you need to use a different syntax:
for (const value of Object.values(animalMap)) {
    console.log(value)
}

// Iterating over an Object using for..in
const person = {
    name: 'John',
    age: 30,
    city: 'New York'
}
for (const key in person) {
    console.log(`${key}: ${person[key]}`)
}

// Output:
// name: John
// age: 30
// city: New York

// Iterating over an Object using Object.keys() and for..of
const keys = Object.keys(person)
for (const key of keys) {
    console.log(`${key}: ${person[key]}`)
}
// Questions:
// What happens when you try to use for..of with a regular object?
// When you try to use for..of with a regular object, you will get a TypeError because a regular object is not iterable.
try {
    for (const value of person) {
        console.log(value);
    }
} catch (error) {
    console.log(error); // TypeError: person is not iterable
}
// How would you make an object iterable?
// To make an object iterable, you can define a custom iterator using the Symbol.iterator property.
Object.prototype[Symbol.iterator] = function* () {
    for (const key of Object.keys(this)) {
        yield this[key];
    }
};

const iterablePerson = {
    ...person,
    [Symbol.iterator]: function* () {
        for (const key in this) {
            yield this[key];
        }
    }
}