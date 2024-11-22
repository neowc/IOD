const mj = ['Michael', 'Jordan']
const [mjFirst, mjLast] = mj // destructure (unpack) array on right into separate variables on left

console.log(mj) // Michael Jordan
console.log(mjFirst, mjLast) // Michael Jordan

const [jcFirst, jcLast, , , jcPlace] = ['Julius', 'Caesar', 'Consul', 'of the', 'Roman', 'Republic']
console.log(`${jcFirst} ${jcLast} is a ${jcPlace}`) // Julius Caesar is a Roman

const [a, b, c] = "abc" // strings are iterable, so can break into characters
const [ one, two, three ] = new Set([1, 2, 3]) // Sets are iterable, so can be destructured
const [ [type, quantity] ] = new Map([ ['apple', 4] ]) // Maps are iterable too
// now we have 8 individual variables: a, b, c, one, two, three, type, quantity
console.log(a, b, c, one, two, three, type, quantity) // a b c 1 2 3 apple 4

const monarch = {}; // empty object
[ monarch.title, monarch.name ] = "King Charles".split(' '); // store array pieces in object properties
console.log(monarch); // { title: 'King', name: 'Charles' }

const teeProduct = { id: 1, title: 'Sleeveless Tee', price: 23.95, category: 'Shirts' }
// key and value are just variable names, could be anything
for (let [key, value] of Object.entries(teeProduct)) {
console.log(`${key}: ${value}`) // id: 1, title: Sleeveless Tee, price: 23.95 ...
}

let student = 'James', teacher = 'Andrew';
[student, teacher] = [teacher, student]
console.log(student) // Andrew
console.log(teacher) // James

const [jc1, jc2, ...jcTitles] = ['Julius', 'Caesar', 'Consul', 'of the', 'Roman', 'Republic']
console.log( jcTitles ) // [ 'Consul', 'of the', 'Roman', 'Republic' ]
console.log( jcTitles.length ) // 4

const [x = 'Unknown', y, z = 'Consul'] = ['Julius', 'Caesar']
console.log( x ) // Julius
console.log( z ) // Consul

//exercise
// Use destructuring to extract the first two colors from this array:
// const colors = ['red', 'green', 'blue', 'yellow'];
// Bonus Task: Using the same array, destructure it and capture the rest of the colors into a new array:
const colors = ['red', 'green', 'blue', 'yellow'];
const [color1, color2, ...remainingColors] = colors;
console.log(color1, color2);
console.log(remainingColors);

// Task: Use object destructuring to extract properties from the following object:
const classmate = {
    name: 'John',
    age: 21,
    course: 'Computer Science',
    year: 2023
};
//const { name, age, course = 'Unknown', year } = classmate;
const {  year, ...zzz } = classmate;
// Grab the value name and age from the object
console.log( name, age, );


// Extract only the course and assign a default value of 'Unknown' to a non-existent grade property:
//Bonus: grab all the rest of the values from an object except year
const { course: subject, grade = 'Unknown', ...rest } = classmate;
console.log(subject, grade);
console.log(rest);

let options = { width: 200, height: 100, title: 'My Component' }
let { title, ...xxx } = options
console.log(title) // My Component
console.log(xxx)
