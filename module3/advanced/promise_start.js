//Task 1: Create 6 JS functions which print the pizza processing statements and call those functions in sequence.
//Use a mix of function declarations, expressions and arrow functions
function prepareDough() {
    setTimeout(() => {
        console.log("Preparing the dough...");
        addSauce();
    }, 200);
};
const addSauce = function() {

    setTimeout(() => {
        console.log("Adding sauce...");
        addToppings();
    }, 200);
};
const addToppings = () => {
    setTimeout(() => {
        console.log("Adding toppings...");
        bakePizza();
    }, 200);
};
function bakePizza() {
    setTimeout(() => {
        console.log("Baking the pizza...");
        slicePizza();
    }, 200);
}
const slicePizza = function() {
    setTimeout(() => {
        console.log("Slicing the pizza...");
        servePizza(); //end of the process
    }, 200);
};
const servePizza = () => {
    console.log("Serving the pizza...");
};

function start() {
    setTimeout(() => {
        console.log("Start makingthe pizza...");
        prepareDough();
    }, 200);

};

start();

