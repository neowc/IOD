const {outputObject, outputJSON} = require('./index');
const myJSON = require("./index.json");

const user = {
    first_name: "Sammy",
    last_name: "Shark",
    age: 25,
    followers: 987,
    address: {
        street: "123 Ocean Avenue",
        city: "Atlantic Beach",
        state: "FL",
        zip: "12345",
    },
};

test('check object', () => {
    expect(outputObject(user)).toBe(true);
});

test('check JSON array', () => {
    expect(outputJSON(myJSON)).toBe(true);
});
