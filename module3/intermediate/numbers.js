/**
Declare two variables, num1 and num2, and assign them the values by converting the string "15" and "7.5"to their number format respectively.
Perform the following operations and store the results in appropriately named variables:
Add num1 and num2
Subtract num2 from num1
Multiply num1 by num2
Divide num1 by num2
Check if num1 is an integer and store the result in a variable.
Calculate the remainder when num1 is divided by 4 and store it in a variable.
Write a conditional statement to check if num1 is greater than num2 and print a message based on the result.
 */

let num1, num2;
num1 = parseInt("15");
num2 = parseFloat("7.5");

let sum = num1 + num2;
let difference = num1 - num2;
let product = num1 * num2;
let quotient = num1 / num2;
let isInteger = Number.isInteger(num1);  //Number.isInteger()
let isFloat = Number.isInteger(num2); //Number.isInteger(num2);  //Number.isInteger()
let remainder = num1 % 4;
let comparison = num1 > num2 ? `${num1} is greater than ${num2}` : `${num2} is greater than or equal to ${num1}`;
console.log(`Sum: ${sum}`);
console.log(`Difference: ${difference}`);
console.log(`Product: ${product}`);
console.log(`Quotient: ${quotient}`);
console.log(`Is ${num1} an integer? ${isInteger}`);
console.log(`Is ${num2} an integer? ${isFloat}`);
console.log(`Remainder when ${num1} is divided by 4: ${remainder}`);
console.log(comparison);

// answers
function answers () {
    // Step 1: Declare variables and convert the string of 15 and 7.5
    const num1 = parseInt("15");
    const num2 = parseFloat("7.5");
    console.log(num1, num2);

    // Step 2: Perform operations + - * /
    const sum = num1 + num2;
    const different = num1 - num2;
    const product = num1 * num2;
    const quotient = num1 / num2;

    // Step 3: Check if num1 is an integer
    const isInteger = Number.isInteger(num1);
    console.log(isInteger);

    // Step 4: Calculate remainder
    const remainder = num1 % 4;
    console.log(remainder);

    // Step 5: Conditional check and print message
    if (num1 < num2) {
        console.log(`${num2} is bigger than ${num1}`);
    } else if (num1 > num2) {
        console.log(`${num1} is bigger than ${num2}`);
    }

}