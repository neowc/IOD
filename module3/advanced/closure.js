function outerFunction() {
    let outerVariable = "I'm outside!";

function innerFunction() {
    console.log(outerVariable);
}

return innerFunction;
}

let myClosure = outerFunction();
myClosure(); // What will this output?

function createCounter() {
    let count = 0;

return function() {
    count++;
    console.log("Current count: " + count);
};
}

let counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3


function createGreeting(greeting) {
    return function(name) {
        console.log(greeting + ", " + name + "!");
    };
}

let sayHello = createGreeting("Hello");
let sayGoodbye = createGreeting("Goodbye");

  sayHello("Alice");   // Hello, Alice!
  sayGoodbye("Bob");   // Goodbye, Bob!

function secretMessage() {
    let secret = "This is a secret!";

    return {
        revealSecret: function () {
            console.log(secret);
        },
        changeSecret: function (newSecret) {
            secret = newSecret;
        },
    };
}

let mySecret = secretMessage();
mySecret.revealSecret();
mySecret.changeSecret("New secret!");
mySecret.revealSecret();




function createCountdown(start) {
    return function () {
        if (start > 0) {
            console.log(start);
            start--;
        } else {
            console.log("Time's up!");
        }
    };
}

let countdown = createCountdown(5);
countdown();
countdown();
countdown();
countdown();
countdown();
countdown();

function add(...rest) {
    return rest.reduce(function (acc, val) {
        return acc + val;
    }, 0);
}

console.log(add(1, 2, 4, 5, 6, 7));