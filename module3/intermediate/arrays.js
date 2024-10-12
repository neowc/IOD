

function array_mani() {
// Arrays
// Array Manipulation:
// Create an array colors containing the values: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'].
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

// Slice the array to get the first 3 colors
const firstThreeColors = colors.slice(0, 3);
console.log(firstThreeColors); // Output: ['red', 'orange', 'yellow']

// Use splice to remove the last 2 colors and replace them with 'cyan' and 'magenta'
const removedColors = colors.splice(-2, 2, 'cyan', 'magenta');
const removedColors2 = colors.splice(colors.length-2, 2, 'cyan', 'magenta');
console.log(removedColors); // Output: ['green', 'blue']
console.log(colors); // Output: ['red', 'orange', 'yellow', 'cyan', 'magenta']

// Use concat to merge the colors array with another array ['black', 'white']
const additionalColors = ['black', 'white'];
const mergedColors = colors.concat(additionalColors);
console.log(mergedColors);
console.log(colors);

// Sort the combined array alphabetically
const sortedColors = mergedColors.sort();
console.log(sortedColors);

// Reverse the sorted array
const reversedColors = sortedColors.reverse();
console.log(reversedColors); // Output: ['yellow', 'white', 'red', 'orange', 'magenta', 'cyan', 'black']
}

// Array Methods:
// Create an array numbers with values [1, 2, 3, 4, 5].
// Write code to:
// Add the number 6 to the end using push().
// Remove the first number using shift().
// Use map() to create a new array where each number is multiplied by 2.
// Use reduce() to find the sum of all numbers in the numbers array.
// Find the index of the number 4 in the array.
// Filter the array to only include numbers greater than 2.
function array_methods() {
    const numbers = [1, 2, 3, 4, 5];
    numbers.push(6); // [1, 2, 3, 4, 5, 6]
    console.log(numbers);

    console.log(numbers.shift()); // [2, 3, 4, 5, 6]
    console.log(numbers);

    const doubledNumbers = numbers.map(num => num * 2); // [4, 6, 8, 10, 12]
    console.log(doubledNumbers);

    const sum = numbers.reduce((acc, num) => acc + num, 0); // 20
    console.log(sum);
    const index = numbers.indexOf(4); // 3
    console.log(index);
    const greaterThanTwo = numbers.filter(num => num > 2); // [3, 4, 5, 6]
    console.log(greaterThanTwo);
}

function array_methods_answers(){
    // Create an array numbers with values [1, 2, 3, 4, 5].
    const nums = [1, 2, 3, 4, 5];

    // Add the number 6 to the end using push().
    nums.push(6);
    console.log(nums);

    // Remove the first number using shift().
    nums.shift();
    console.log(nums);

    // Use map() to create a new array where each number is multiplied by 2.
    console.log(nums.map((item) => item * 2));

    // Use reduce() to find the sum of all numbers in the numbers array.
    console.log(nums.reduce((acc, item) => acc + item, 0));

    // Find the index of the number 4 in the array.
    console.log(nums.find((num) => num === 4));

    // Filter the array to only include numbers greater than 2.
    console.log(nums.filter((item) => item > 2));
}

//array_mani();
array_methods();
array_methods_answers();