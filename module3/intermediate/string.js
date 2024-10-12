function Manipulation() {// String Manipulation:
// Create a string variable called sentence with the value: "The quick brown fox jumps over the lazy dog".
let sentence = "The quick brown fox jumps over the lazy dog";
// Write code to:
// Print the length of the string.
console.log(sentence.length);
// Convert the entire string to uppercase.
console.log(sentence.toUpperCase());
// Extract the word "fox" using the substring method.
console.log(sentence.substring(16, 19));
console.log(sentence.slice(16, 19));
// Replace the word "lazy" with "energetic".
console.log(sentence.replace("lazy", "energetic"));
// Check if the sentence ends with "dog".
console.log(sentence.endsWith("dog"));
// Split the string into an array of words and print the array.
console.log(sentence.split(" "));
// Trim any extra spaces at the beginning or end (if any were present).
console.log(sentence.trim());
console.log(sentence.toUpperCase().split(" "));
//console.log(sentence.split(" ").toUpperCase());
}

function slicing() {
const sliceArray = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
const sliced = sliceArray.slice(0, 3) // start at the beginning, get items up to index 3
const endSliced = sliceArray.slice(-3) // start at the end, get last 3 items
console.log(sliced) // [ 'red', 'orange', 'yellow' ]
console.log(endSliced) // [ 'blue', 'indigo', 'violet' ]
console.log(sliceArray) // ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
}

function splicing() {
    const spliceArray = ["I", "study", "JavaScript", "right", "now"]
    const removed = spliceArray.splice(0, 3, "Let's", "dance")
    console.log(removed) // [ 'I', 'study', 'JavaScript' ] - 3 elements starting at index 0 are removed
    console.log(spliceArray) // [ "Let's", 'dance', 'right', 'now' ] - 2 new elements are inserted
}

Manipulation();
//slicing();
//splicing();