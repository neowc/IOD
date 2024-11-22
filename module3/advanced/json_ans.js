// Task: Given the following JavaScript object, convert it into a JSON string using JSON.stringify():
const student = {
    name: "Emily",
    age: 22,
    subjects: ["Math", "Science", "English"],
    isGraduated: false,
};
// Question: After converting, what is the type of the resulting studentJSON?
// console.log(JSON.stringify(student, null, 4));

// 2. Task: Convert the following JSON string back into a JavaScript object using JSON.parse():
const carJSON = '{"make": "Tesla", "model": "Model X", "year": 2022}';
// Bonus: Access and print the car's make and model from the resulting object.
// console.log(JSON.parse(carJSON));

// 3. Task: The following objects reference each other, which causes issues with JSON.stringify(). Write code to prevent the circular reference from throwing an error:
const room = { number: 101 };
const meeting = { title: "Project Sync", participants: ["Alice", "Bob"] };
room.meeting = meeting;
meeting.place = room;
console.log(
    JSON.stringify(
        meeting,
        function (key, value) {
            if (key !== "" && value === meeting) {
                return undefined;
            }
            return value;
        },
        4
    )
);

// 4. Task: Use JSON.stringify() and JSON.parse() to create a deep copy of the following nested object:
const originalBox = {
    size: "large",
    dimensions: {
        width: 100,
        height: 50,
    },
    contents: ["books", "clothes", "toys"],
};
// Bonus: Modify the deepCopyBox and verify that the changes do not affect the original object.
const deepCopy = JSON.parse(JSON.stringify(originalBox));
deepCopy.dimensions.width = 50;

console.log(originalBox, deepCopy);