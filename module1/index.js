const myJSON = require("./index.json");
console.log(myJSON);
console.log(myJSON.age);
console.log(myJSON.country, myJSON.name);

const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const result = sentiment.analyze("Cats are stupid.");
console.log(result); // Score: -2, Comparative: -0.666

// objects in javascript contain keys (or properties) with corresponding values
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
// we can access properties with dot notation
console.log(user.first_name); // Sammy
console.log(user.age); // 25
// or with array style square bracket syntax
console.log(user["last_name"]); // Shark
user.followers = 988; // we can also assign new values to object properties
user.location = "Pacific Ocean"; // or create new properties
console.log(user.followers);
console.log(user.location);
console.log(user);