//creating an array that has 5 elements
let myArray = [1, 2, 3, 4, 5];

//accessing the third element of the array
console.log(myArray[2]); // Output: 3

//modifying the element at position 1 and 4 of the array
myArray[0] = 99;
myArray[3] = 36; console.log(myArray);

//adding a new element to the beginning of the array
myArray.unshift(834); console.log(myArray);

//adding a new element to the end of the array
myArray.push(100); console.log(myArray);

//Remove the element at the end of the array
console.log(myArray.pop());

//printing the entire array
console.log(myArray); // Output: [1, 2, 10, 4, 6]
