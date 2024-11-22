function multiply(a, b) {
    console.log(a * b);
}

Function.prototype.delay = function(ms) {
    let fn = this;
    return function (a, b) {
        setTimeout(fn, ms, a, b);
    };
}
//multiply.delay(5000)(3, 4);

Function.prototype.delayB = function(ms) {
    let fn = this;
    return function (a, b) {
        setTimeout( () => fn.apply(this, arguments), ms);
    };
}
function multiply2(a, b, x, y) {
    console.log(a * b * x * y);
}

multiply.delayB(4000)(7, 7);
multiply2.delayB(4000)(2, 3, 5, 6);



if (0) {
function Multiply(a, b) {
  console.log(a * b);
}
//Use the Function prototype to add a new delay(ms) function to all functions, which can be used to delay the call to that function by ms milliseconds
Multiply.prototype.delay = function(ms) {
    let fn = this;
    return function (a, b) {
        setTimeout(() => {
        fn(a, b);
        }, ms);
        // clearTimeout(timeout);
        // setTimeout( fn(a, b), ms);
    };
};
//let multiplyDelayed = multiply.prototype.delay(500);
//multiplyDelayed(5, 5); //prints 25 after 500ms
//multiply.delay(500)(3, 7); // prints 25 after 500 milliseconds

//a) Use the example multiply function below to test it with, as above, and assume that all delayed functions will take two parameters
let m1 = new Multiply(6, 7);
//console.log(m1.delay(800));
//Multiply.delay(300000);
m1 = m1.delay(300000000);

//multiply2.delay(500)(3, 4); // prints 12 after 500 milliseconds
}


//b) Use apply to improve your solution so that delayed functions can take any number of parameters
//c) Modify multiply to take 4 parameters and multiply all of them, and test that your delay prototype function still works.
