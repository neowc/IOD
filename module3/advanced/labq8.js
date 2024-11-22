function orderItems(itemName) {
    return `Order placed for: ${itemName}`;
}
// create a decorated version of the original function
const validatedOrderItem = validateStringArg(orderItems);

//a) Create a decorator function validateStringArg(fn) which will validate an argument passed to fn to ensure that it is a string, throwing an error if not.
function validateStringArg(fn) {
    return function (arg) {
        if (typeof arg !== "string") {
            throw new Error("Argument must be a string");
        }
        return fn(arg);
    };
}

//b) Extend orderItems to use the ... rest operator, allowing multiple item name arguments, and include them all in the returned string
function orderItems2(...itemNames) {
    return `Order placed for: ${itemNames.join(", ")}`;
}
const validatedOrderItem2 = validateStringArgs(orderItems2);

//c) Extend the decorator function to validate as strings all arguments passed to fn
function validateStringArgs(fn) {
    return function (...args) {
        for (const arg of args) {
            if (typeof arg !== "string") {
                throw new Error(`All arguments ${arg} must be strings`);
            }
        }
        return fn(...args);
    };
}
//d) When testing the decorated function, use try-catch blocks to handle errors thrown for non-string arguments
const validatedOrderItem3 = validateStringArgs(orderItems2);
try {
    console.log(validatedOrderItem("Apple Watch")); // should run the function
    //console.log(validatedOrderItem(123)); // should throw an error

    console.log(validatedOrderItem2("Apple Watch", "iPhone", "Beer"));

    console.log(validatedOrderItem3("Apple Watch", "iPhone", "Beer", "Car"));
    console.log(validatedOrderItem3("Apple Watch", 123, "Beer"));
} catch (error) {
    //console.log(error);  //got error
    console.error(error.message);
}