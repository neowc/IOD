// Create 4 functions for the 4 main mathematical operations (-,+,/,*) that receive 2 parameters and return the result of the operation.
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
}

let v1 = 10;
let v2 = 5;
let result = 0;

result=add(v1, v2);console.log(result);
result=subtract(v1, v2);console.log(result);
result=multiply(v1, v2);console.log(result);
result=divide(v1, v2);console.log(result);

