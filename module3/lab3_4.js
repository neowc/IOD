let a = 2, b = 3;
let result = `${a} + ${b} is `;
let result2 = `${a} + ${b} is `;

if (a + b < 10) {
    result += "less than 10";
} else {
    result += "greater than 10";
}

//Rewrite above if using the ternary/conditional operator '?'
result2 += ( (a + b < 10) ? "less than 10" : "greater than 10");
console.log(result2);

