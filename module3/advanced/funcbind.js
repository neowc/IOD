// Exercise 3: “Monster Battle” - Pre-configuring Functions with bind
// Goal: Understand how bind can create a new function with a specific this value and optionally, pre-configure some arguments.
const monster = {
    name: "Godzilla",
};

function attack(city) {
    console.log(`${this.name} is attacking ${city}!`);
}

// Instructions:
// Use the monster object with a name and a method attack.
// Write a function attackMonster that logs a message about attacking a city.
const attackMonster = attack.call(monster, "City");
//const attackMonster = attack.bind(monster, "Tokyo");

// Use bind to create a new function for the monster to attack specific cities.
const attackNewYork = attack.bind(monster, "New York");
const attackTokyo = attack.bind(monster, "Tokyo");

// write your code here
attackNewYork();  // Godzilla is attacking New York!
attackTokyo();    // Godzilla is attacking Tokyo!
