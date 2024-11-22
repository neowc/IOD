function delayMsg(msg) {
    console.log(`This message will be printed after a delay: ${msg}`);
}
setTimeout(delayMsg, 100, "#1: Delayed by 100ms");
setTimeout(delayMsg, 20, "#2: Delayed by 20ms");
setTimeout(delayMsg, 0, "#3: Delayed by 0ms");
delayMsg("#4: Not delayed at all");

//What order will the four tests below print in? Why?
// #4: Not delayed at all
// #3: Delayed by 0ms
// #2: Delayed by 20ms
// #1: Delayed by 100ms
// setTimeout(function () {
//   console.log("#1: Delayed by 100ms");
// }, 100);
// setTimeout(function () {
//   console.log("#2: Delayed by 20ms");
// }, 20);
// setTimeout(function () {
//   console.log("#3: Delayed by 0ms");
// }, 0);
// console.log("#4: Not delayed at all");

//Rewrite delayMsg as an arrow function
const delayMsg2 = (msg) => console.log(`This message will be printed after a delay: ${msg}`);

//Add a fifth test which uses a large delay time (greater than 10 seconds)
let fifth = setTimeout(delayMsg2, 5000, "#5: Delayed by 5000ms");  //fifth receives Object and id of the timer
let sixth = setTimeout(delayMsg2, 10000, "#6: Delayed by 10000ms");

//Use clearTimeout to prevent the fifth test from printing at all.
const timerId = setTimeout(delayMsg2, 5000, "#7: Delayed by 7000ms");
clearTimeout(timerId);
console.log("Start");

//output
// This message will be printed after a delay: #4: Not delayed at all
// Start
// This message will be printed after a delay: #3: Delayed by 0ms
// This message will be printed after a delay: #2: Delayed by 20ms
// This message will be printed after a delay: #1: Delayed by 100ms
// This message will be printed after a delay: #5: Delayed by 5000ms
// This message will be printed after a delay: #6: Delayed by 10000ms

// Check what is the order of output if we call
// function startCounting() {
//   for (var i = 0; i < 10; i++) {
//     setTimeout(function () {
//       console.log(i);
//     }, 100 * i);
//   }
// }
