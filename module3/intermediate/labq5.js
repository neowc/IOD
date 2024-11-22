let twentyCents = 0.20
let tenCents = 0.10
//console.log(`${twentyCents} + ${tenCents} = ${twentyCents + tenCents}`) // 0.2 + 0.1 = 0.30000000000000004

let fixedTwenty = twentyCents.toFixed(2);
let fixedTen = tenCents.toFixed(2);
console.log(fixedTwenty + fixedTen) //why is this not working?
//Explain why the above code returns the wrong answer
//The toFixed() method converts a number to a string, keeping a specified number of decimals.
//In the above code, we are trying to add two numbers that are strings, which is not possible in JavaScript.
//To fix this, we need to convert the strings back to numbers before performing the addition.
//One way to do this is to use the parseFloat() function, which converts a string to a floating-point number.
fixedTwenty = parseFloat(twentyCents.toFixed(2));
fixedTen = parseFloat(tenCents.toFixed(2));
console.log(fixedTwenty + fixedTen);

// Create a function currencyAddition(float1, float2) which safely adds the two decimal numbers float1 and float2 and returns the correct float result
function currencyAddition(float1, float2) {
    console.log(float1 + float2);
    return parseFloat((float1 + float2).toFixed(2));
}
console.log(currencyAddition(twentyCents, tenCents));

// Create a function currencyOperation(float1, float2, operation) which safely performs the given operation (either +, -, / or *) on the two numbers and returns the correct float result
function currencyOperation(float1, float2, operation) {
    switch (operation) {
        case '+':
            return parseFloat((float1 + float2).toFixed(2));
        case '-':
            return parseFloat((float1 - float2).toFixed(2));
        case '/':
            return parseFloat((float1 / float2).toFixed(2));
        case '*':
            return parseFloat((float1 * float2).toFixed(2));
        default:
            return 'Invalid operation';
    }
}
console.log(currencyOperation(twentyCents, tenCents, '+'));

// Extend the above function to include a fourth argument numDecimals which allows the operation to support different amounts of decimal places from 1 to 10.
function currencyOperation(float1, float2, operation, numDecimals) {
    switch (operation) {
        case '+':
            return parseFloat((float1 + float2).toFixed(numDecimals));
        case '-':
            return parseFloat((float1 - float2).toFixed(numDecimals));
        case '/':
            return parseFloat((float1 / float2).toFixed(numDecimals));
        case '*':
            return parseFloat((float1 * float2).toFixed(numDecimals));
        default:
            return 'Invalid operation';
    }
}
console.log(currencyOperation(twentyCents, tenCents, '+', 3));
console.log(0.3 == currencyAddition(0.1, 0.2)) // true
console.log(0.3 == currencyOperation(0.1, 0.2, '+', 3)) // true