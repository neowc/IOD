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
const userActions = new UserActions();
userActions.login("Alice", "password123");
userActions.purchase("Apple", 5);
// Expected Output:
// Calling login with arguments: [ 'Alice', 'password123' ]
// Alice logged in.
// Calling purchase with arguments: [ 'Apple', 5 ]
// Purchased 5 of Apple.

// Exercise 2: Advanced Function Decorator - Performance Monitoring
// Goal: Learn how to create a more advanced decorator that measures the execution time of functions.
// Instructions:

// Write a function decorator performanceMonitor that measures the execution time of the decorated function and logs the result.

function performanceMonitor(target, key, descriptor) {
    const originalFunction = descriptor.value;
    descriptor.value = function(...args) {
        const start = performance.now();
        const result = originalFunction.apply(this, args);
        const end = performance.now();
        console.log(`Execution time of ${key}: ${end - start} ms`);
        return result;
    };
    return descriptor;
}

// Apply this decorator to multiple functions that simulate user actions, like login and purchase
class UserActions {
    @performanceMonitor
    login(username, password) {
        // Simulate login process
        console.log(`${username} logged in.`);
    }

    @performanceMonitor
    purchase(item, quantity) {
        // Simulate purchase process
        console.log(`Purchased ${quantity} of ${item}.`);
    }
}
const userActions2 = new UserActions();
userActions.login("Alice", "password123");
userActions.purchase("Apple", 5);
// Expected Output:
// Alice logged in.
