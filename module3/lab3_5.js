
function getGreeting(name) {
    return "Hello " + name + "!";
}
//Rewrite the following function using: a) function expression syntax,
let newGreeting = function (name) {
    return "Hello " + name + "!";
}

// using b) arrow function syntax
let arrowGreeting = (name) => {
    return "Hello " + name + "!";
}
let arrow2 = (name) => "Hello " + name + "!";

console.log(getGreeting("John"));
console.log(newGreeting("Tom"));
console.log(arrowGreeting("Jacobs"));
console.log(arrow2("Smith"));


