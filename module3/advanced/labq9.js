//import { resolve } from "path";

//We can delay execution of a function using setTimeout, where we need to provide both the callback function and the delay after which it should execute.
function randomDelay() {
    // your code
    let delay = Math.floor(Math.random() * 20)+1;
    //const delay = Math.floor(Math.random() * 20) + 1;
    //console.log(delay);
    return new Promise( (resolve) => setTimeout( resolve(delay*1000), delay*1000 ) );
}
//randomDelay().then((delay) => console.log(`There appears to have been a delay of ${delay}`));

//a) Create a promise-based alternative randomDelay() that delays execution for a random amount of time (between 1 and 20 seconds) and returns a promise we can use via .then(), as in the starter code below
function randomDelay2() {
    const delay = Math.floor(Math.random() * 2000) + 1;
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });
}
randomDelay2().then(() => console.log('There appears to have been a delay.'));

//b) If the random delay is even number, consider this a successful delay and resolve the promise, and if the random number is odd, consider this a failure and reject it
function randomDelay3() {
    const delay = Math.floor(Math.random() * 2000) + 1;
    return new Promise((resolve, reject) => {
        if (delay % 2 === 0) {
            setTimeout(resolve, delay);
        } else {
            setTimeout(reject, delay);
        }
    });
}

//c) Update the testing code to catch rejected promises and print a different message
// randomDelay3()
//     .then(() => console.log('There appears to have been a delay.'))
//     .catch(() => console.log('There was an error in the delay.'));

//d) Try to update the then and catch messages to include the random delay value
function randomDelay4() {
    const delay = Math.floor(Math.random() * 2000) + 1;
    return new Promise((resolve, reject) => {
        if (delay % 2 === 0) {
            setTimeout(() => resolve(delay), delay);
        } else {
            setTimeout(() => reject(delay), delay);
        }
    });
}

// randomDelay4()
//     .then((delay) => console.log(`There appears to have been a delay of ${delay} milliseconds.`))
//     .catch((delay) => console.log(`There was an error in the delay of ${delay} milliseconds.`));
