// Exercise 1: “Superhero Team-Up” - Using call to Control Context
// Goal: Understand how call works to invoke a function with a specific this value and arguments.

const superhero1 = {
    name: "Superman",
    power: "fly"
};

const superhero2 = {
    name: "Flash",
    power: "run at light speed"
};

function usePower() {
    console.log(`${this.name} is using their ability to ${this.power}!`);
}

// Instructions:
// Create a superhero object with a name and a power property.
// Write a function usePower that logs a message about using the superhero's power.
// Use call to invoke the usePower function in the context of different superheroes.
usePower.call(superhero1);
usePower.call(superhero2);
