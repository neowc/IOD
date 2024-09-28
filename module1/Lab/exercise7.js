
import {expect, jest, test} from '@jest/globals';

// Create 4 functions for the 4 main mathematical operations (-,+,/,*) that receive 2 parameters and return the result of the operation.
function add(a, b) {
    // this function adds two numbers
    return a + b;
}

function subtract(a, b) {
    // this function subtracts number b from number a
    return a - b;
}

function multiply(a, b) {
    // this function multiplies two numbers
    return a * b;
}

function divide(a, b) {
    // this function divides number a from number b
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
}

// Test adding two positive integers
let testA = ("should return the sum when adding two positive integers", () => {
    const result = add(3, 5);
    expect(result).toBe(8);
});

// Test subtracting  very large numbers
let testB = ('should return the correct result when subtracting two very large numbers', () => {
    const result = subtract(1000000000, 999999999);
    expect(result).toBe(1);
});

// Test multiply positive and negative floating-point numbers
let testC = ('should multiply positive and negative floating-point numbers correctly', () => {
    // Test multiplication of positive floating-point numbers
    expect(multiply(2.5, 3.5)).toBeCloseTo(8.75);

    // Test multiplication of negative floating-point numbers
    expect(multiply(-2.5, 3.5)).toBeCloseTo(-8.75);
});

    // adding a positive and a negative integer
test('should add a positive and a negative integer correctly', () => {
        // Define the positive and negative integers
        const a = 5;
        const b = -3;

        // Call the add function with the positive and negative integers
        const result = add(a, b);

        // Check if the result is correct
        expect(result).toBe(2);
});

console.log(testA);
console.log(testB);
console.log(testC);
