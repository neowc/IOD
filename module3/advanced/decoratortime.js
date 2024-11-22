// Exercise 2: Timing Decorator - Measuring Function Execution Time
// Goal: Learn how to create a decorator that measures the execution time of functions and applies it to different scenarios.
// Instructions:
// Create a decorator measureTime that records the start and end time of a function execution and logs the duration.
// Apply it to a function that performs a heavy task, such as calculating a large Fibonacci number or running a loop.
// 8:37
// example of a Fibonacci function
function calculateFibonacci(n) {
    if (n <= 1) return n;
    return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}