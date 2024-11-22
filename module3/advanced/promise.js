//Task 1: Create 6 JS functions which print the pizza processing statements and call those functions in sequence.
//Use a mix of function declarations, expressions and arrow functions
// const prepareDough = new Promise (function () {
//     setTimeout(() => {
//         console.log("Preparing the dough...");
//        // addSauce();
//     }, 200);
// });
// const addSauce = new Promise (function() {
//     setTimeout(() => {
//         console.log("Adding sauce...");
//         //addToppings();
//     }, 200);
// });
// const addToppings = new Promise ( () => {
//     setTimeout(() => {
//         console.log("Adding toppings...");
//         //bakePizza();
//     }, 200);
// });
// const bakePizza = new Promise (function() {
//     setTimeout(() => {
//         console.log("Baking the pizza...");
//         //slicePizza();
//     }, 200);
// });
// const slicePizza = new Promise ( function() {
//     setTimeout(() => {
//         console.log("Slicing the pizza...");
//         //servePizza(); //end of the process
//     }, 200);
// });
// const servePizza = new Promise ( () => {
//     console.log("Serving the pizza...");
// });
// const start = new Promise ( function() {
//     setTimeout(() => {
//         console.log("Start makingthe pizza...");
//         //prepareDough();
//     }, 200);
// });

// start.then(prepareDough).then(addSauce).then( addToppings).then(bakePizza).then(slicePizza).then(servePizza);

// answers
const end = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve("Pizza is ready");
        }, 400)
    );

const cookPizza = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve("Cooked the pizza");
        }, 2000)
    );

const addToppings = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve("Added the pizza toppings");
        }, 400)
    );

const addSauceCheese = () => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve("Added the sauce and cheese");
        }, 1000)
    );
};

const madeBase = function () {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve("Made the base");
        }, 500)
    );
};

function start() {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve("Started preparing pizza ...");
        }, 200)
    );
}

(async function () {
    let res = await start();
    console.log(res);
    res = await madeBase();
    console.log(res);
    res = await addSauceCheese();
    console.log(res);
    res = await addToppings();
    console.log(res);
    res = await cookPizza();
    console.log(res);
    res = await end();
    console.log(res);
})();