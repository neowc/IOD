// Exercise 4: “Cooking with Chefs” - Using call, apply, and bind in a Kitchen Simulation
// Goal: Combine all three (call, apply, bind) in a real-world context of running a kitchen with multiple chefs.
const chef1 = {
    name: "Gordon Ramsay",
};
function cookDish(dish, ingredients) {
    console.log(`${this.name} is preparing ${dish} with ${ingredients.join(", ")}!`);
    }

const chef2 = {
    name: "Jamie Oliver"
};
// Instructions:
// Create a chef object with a name and a method cookDish.
// Write a function prepareDish that takes multiple ingredients and logs the dish being prepared
function prepareDish(ingredients) {
    console.log(`Preparing dish with ${ingredients.join(", ")}!`);
}
// function makePizza(ingredients) {
//     cookDish.call(chef1, "Pizza", ingredients);
// }
// function makeSpaghetti(ingredients) {
//     cookDish.apply(chef2, ["Spaghetti", ingredients]);
// }
// function makeSalad(ingredients) {
//     const preparedSalad = cookDish.bind(chef1, "Salad", ingredients);
//     preparedSalad();
// }
// Use call and apply to make different chefs prepare different dishes with various ingredients.
const chef1pizza = makePizza.apply(chef1, ["cheese", "tomatoes"]);
//const makePizza = cookDish.bind(chef1, ["cheese", "tomatoes"]);

// Use bind to create a new function that always makes one chef prepare a specific dish.
  // Using `call` to invoke `cookDish` with individual arguments
cookDish.call(chef1, "Pasta", ["Pizza", "cheese", "tomatoes"]);
  // Using `apply` to invoke `cookDish` with an array of arguments
cookDish.apply(chef2, ["Salad", ["lettuce", "tomatoes", "cucumbers"]]);
  // Using `bind` to create a new function for always making Pizza
const makePizza = cookDish.bind(chef1, "Pizza");
const makeSpaghetti = cookDish.bind(chef2, "Spaghetti");
const makeSalad = cookDish.bind(chef1, "Salad");
makePizza(["cheese", "tomatoes"]);  // Gordon Ramsay is preparing Pizza with cheese, tomatoes!
makePizza(["pineapples", "olives"]);

makeSpaghetti(["spaghetti", "tomato sauce"]);
makeSalad(["lettuce", "tomatoes", "cucumbers"]);