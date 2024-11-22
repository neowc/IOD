const sydney = {
  name: "Sydney",
  population: 5_121_000,
  state: "NSW",
  founded: "26 January 1788",
  timezone: "Australia/Sydney",
};
// Write a function that takes an object as an argument and uses a for…in loop to access and print to the console each of those object properties and their values. Test it using the sydney object below.
function printObjectProperties(obj) {  //O(n)
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      console.log(`${prop}: ${obj[prop]}`);  // O(1) obj[prop]
    }
  }
}

printObjectProperties(sydney);

// Create a new object for a different city with different properties and call your function again with the new object.
const car = {type:"Fiat", model:"500", color:"white"};
const person = {
    firstName: "John",
    lastName : "Doe",
    age: 50,
    id       : 5566,
    eyeColor: "blue",
    fullName : function() {
        return this.firstName + " " + this.lastName;
    }
};
printObjectProperties(car);
printObjectProperties(person);