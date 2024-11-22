// Create a function that takes a string as a parameter and returns the string with the first character of each word changed into a capital letter, as in the example below. Test it with different strings
function ucFirstLetters(str) {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[i]) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1); 
    }
  }
  return words.join(" ");
}

console.log(ucFirstLetters("los angeles") ) //Los Angeles
console.log(ucFirstLetters("new york") ) //New York
