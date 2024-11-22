// Task: Given the following JavaScript object, convert it into a JSON string using JSON.stringify():
// 1. Task: Convert the following JavaScript object into a JSON string using JSON.stringify():
const student = {
    name: 'Emily',
    age: 22,
    subjects: ['Math', 'Science', 'English'],
    isGraduated: false
};
const studentJSON = JSON.stringify(student, null, 4);
console.log(studentJSON);

// Question: After converting, what is the type of the resulting studentJSON?
// Answer: The resulting studentJSON is a string, as expected when using JSON.stringify().


// 2. Task: Convert the following JSON string back into a JavaScript object using JSON.parse():
// Bonus: Access and print the car's make and model from the resulting object.
const carJSON = '{"make": "Tesla", "model": "Model X", "year": 2022}';
const car = JSON.parse(carJSON);
console.log(car);
console.log(typeof car);
console.log(car.make);
console.log(car.model);

// 3. Task: The following objects reference each other, which causes issues with JSON.stringify(). Write code to prevent the circular reference from throwing an error:
const room = { number: 101 };
const meeting = { title: 'Project Sync', participants: ['Alice', 'Bob'] };
room.meeting = meeting;
meeting.place = room;

console.log(JSON.stringify(meeting));

//4. Task: Use JSON.stringify() and JSON.parse() to create a deep copy of the following nested object:
const originalBox = {
    size: 'large',
    dimensions: {
        width: 100,
        height: 50
    },
    contents: ['books', 'clothes', 'toys']
};


const deepCopyBox = JSON.parse(JSON.stringify(originalBox));
console.log(deepCopyBox);
deepCopyBox.dimensions.width = 200;
deepCopyBox.contents.push('electronics');

console.log(deepCopyBox);
console.log(originalBox);

// Bonus: Modify the deepCopyBox and verify that the changes do not affect the original object.
const deepCopyBox = JSON.parse(JSON.stringify(originalBox));
console.log(deepCopyBox);
deepCopyBox.dimensions.width = 200;
deepCopyBox.contents.push('electronics');
console.log(deepCopyBox);
console.log(originalBox);
/*Output:
{ size: 'large', dimensions: { width: 100, height: 50 }, contents: [ 'books', 'clothes', 'toys' ] }
{ size: 'large', dimensions: { width: 200, height: 50 }, contents: [ 'books', 'clothes', 'toys', 'electronics' ] }
{ size: 'large', dimensions: { width: 100, height: 50 }, contents: [ 'books', 'clothes', 'toys' ] }
*/
/*In the solution, we use JSON.stringify() to create a deep copy of the originalBox object. This creates a new object with the same structure but separate memory addresses. We then modify the dimensions.width property of the deepCopyBox and push a new item into the contents array. This change does not affect the originalBox object, ensuring a deep copy is created without any reference issues.
*/


