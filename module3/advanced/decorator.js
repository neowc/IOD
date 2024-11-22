// Exercise 1: Basic Function Decorator - Logging User Actions
// Goal: Learn how to create a simple decorator that logs function calls and their arguments.
// Instructions:
// Write a function decorator logAction that logs the name of the function being called and its arguments.
function logAction(target, key, descriptor) {
    const originalFunction = descriptor.value;
    descriptor.value = function(...args) {
        console.log(`Calling ${key} with arguments:`, args);
        return originalFunction.apply(this, args);
    };
    return descriptor;
}

class UserActions {
    @logAction
    login(username, password) {
        console.log(`${username} logged in.`);
    }

    @logAction
    purchase(item, quantity) {
        console.log(`Purchased ${quantity} of ${item}.`);
    }
}

// Apply this decorator to multiple functions that simulate user actions, like login and purchase.
const userActions = new UserActions();
userActions.login("Alice", "password123");
userActions.purchase("Apple", 5);
// Expected Output:
// Calling login with arguments: [ 'Alice', 'password123' ]
// Alice logged in.
// Calling purchase with arguments: [ 'Apple', 5 ]
// Purchased 5 of Apple.
// Exercise 2:
// Advanced Function Decorator - Timing Function Calls
// Goal: Learn how to create a more advanced decorator that logs the time it takes for a function to execute.
// Instructions:
// Write a function decorator timeFunction that logs the time it takes for a function to execute.
function timeFunction(target, key, descriptor) {
    const originalFunction = descriptor.value;
    descriptor.value = function(...args) {
        const start = Date.now();
        const result = originalFunction.apply(this, args);
        const end = Date.now();
        console.log(`Function ${key} took ${end - start}ms to execute.`); 
    }
    return descriptor;
}