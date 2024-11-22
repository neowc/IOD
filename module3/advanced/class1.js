/* Exercise 1: Basic Class Creation
#############################################
*/
// Objective: Create a simple Person class with properties and methods.
// Create a class named Person.
// The class should have properties name and age, which should be passed in via the constructor.
// Add a method greet that logs "Hello, my name is [name] and I am [age] years old.".
// Create an instance of Person with the name "Alice" and age 30. Call the greet method.

// Inside the class, define a constructor that takes two parameters: name and age. Inside the constructor, assign the passed parameters to instance variables with the same names.
// Bonus: Add a birthday method that increments the age by 1 and logs a message saying "Happy Birthday! You are now [age] years old.".
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }

    birthday() {
        this.age++;
        console.log(`Happy Birthday! You are now ${this.age} years old.`);
    }
}

const alice = new Person("Alice", 30);
alice.greet();
alice.birthday();

/* Exercise 2: Extending Classes
#############################################
*/
// Objective: Create a subclass and override a method.
// Create a class Animal with a property name and a method makeSound() that logs "Some generic sound"
// Create a subclass Dog that extends Animal and overrides makeSound() to log "Woof!".
// Create a subclass Dog that extends Animal:
// Override makeSound() in Dog to log "Woof!".
// Bonus: Add a new method fetch() to Dog that logs "Buddy is fetching the ball!"
class Animal {
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        console.log("Some generic sound");
    }
}


class Dog extends Animal {
    makeSound() {
        console.log("Woof!");
    }

    fetch() {
        console.log(`${this.name} is fetching the ball!`);
    }
}

// Create an instance of Dog named "Buddy" and call makeSound() on it.
const buddy = new Dog("Buddy");
buddy.makeSound();
buddy.fetch();

/* Exercise 3: Static Methods and Properties
#############################################
*/
// Objective: Practice using static methods and properties.
// Create a class Calculator with a static method add(a, b) that returns the sum of a and b.
// Create a non-static method subtract(a, b) that returns the difference between a and b.
// Create an instance of Calculator and call both methods.
class Calculator {
    static operations = 0;
    static add(a, b) {
        this.operations++;
        //Calculator.operations++;
        return a + b;
    }

    static subtract(a, b) {
        this.operations++;
        //Calculator.operations++;
        return a - b;
    }
    static multiply(a, b) {
        this.operations++;
        //Calculator.operations++;
        return a * b;
    }
    static getCount() {
        console.log(this.operations);
    }
}
//Add another static method multiply(a, b) that returns the product of a and b.
//Call the static methods without creating an instance and log the results.
console.log(Calculator.add(2, 3));
console.log(Calculator.multiply(2, 3));

const calc = new Calculator();
// console.log(calc.subtract(5, 3));
// console.log(calc.multiply(2, 3));
//Bonus: Add a static property operations that keeps track of the number of times add and multiply are called. Update this counter in each method.
Calculator.getCount();