function printMe() { console.log('printing debounced message') }
printMe = debounce(printMe); //create this debounce function for a)
//fire off 3 calls to printMe within 300ms - only the LAST one should print, after 1000ms of no calls
setTimeout( printMe, 100);
setTimeout( printMe, 200);
setTimeout( printMe, 300);
// Using the following code to test and start with:
// a) Create a debounce(func) decorator, which is a wrapper that takes a function func and suspends calls to func until there's 1000 milliseconds of inactivity. After this 1 second pause, the most recent call to func should be executed and any others ignored.
function debounce(func) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), 1000);
    };
}

//b) Extend the debounce decorator function to take a second argument ms, which defines the length of the period of inactivity instead of hardcoding to 1000ms
function debounce2(func, ms) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
}
//c) Extend debounce to allow the original debounced function printMe to take an argument msg which is included in the console.log statement.
function printMe2(msg) {
    console.log(`printing NEW debounced message: ${msg}`);
}
const p2 = debounce2(printMe2, 3000);
p2('Hello');
p2('There');
p2('Good Morning');