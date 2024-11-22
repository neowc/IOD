// The Fibonacci sequence of numbers is a famous pattern where the next number in the sequence is the sum of the previous 2.
// e.g. 1, 1, 2, 3, 5, 8, 13, 21, 34, etc.
//a) Write a function printFibonacci() using setInterval that outputs a number in the Fibonacci sequence every second
function printFibonacci() {
    let a = 0;
    let b = 1;
    const interval = setInterval(() => {
        console.log(a);
        const temp = a;
        a = b;
        b = temp + b;
    }, 1000);
    setTimeout(() => {
        clearInterval(interval);
    }, 10000);
}
//printFibonacci();

//b) Write the above function using setTimeout() instead of setInterval()
//b) Write a new version printFibonacciTimeouts() that uses nested setTimeout calls to do the same thing
function printFibonacci2() {
    let a = 0;
    let b = 1;
    const timeout = setTimeout(function run() {
        console.log(a);
        const temp = a;
        a = b;
        b = temp + b;
        setTimeout(run, 1000);
    }, 1000);
    setTimeout(() => {
        clearTimeout(timeout);
    }, 10000);
}
//printFibonacci2();
//c) Extend one of the above functions to accept a limit argument, which tells it how many numbers to print before stopping
function printFibonacci3(limit=8) {
    let a = 0;
    let b = 1;
    let count = 0;
    const interval = setInterval(() => {
        console.log(a);
        const temp = a;
        [a , b] = [b , temp + b];
        count++;
        if (count >= limit) {
            clearInterval(interval);
        }
    }, 1000);
}
printFibonacci3(10);