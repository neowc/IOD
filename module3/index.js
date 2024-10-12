// console.log(typeof undefined); // undefined
// console.log(typeof 0); // number
// console.log(typeof 10n); // bigint
// console.log(typeof true); // boolean
// console.log(typeof 'text'); // string
// console.log(typeof Symbol('id')) // symbol
// console.log(typeof Math); // object
// console.log(typeof null); // object
// console.log(typeof console.log); // function

let strNum = 123;
// number to string
// console.log(strNum);
// console.log(typeof (strNum));

// strNum = 123 + "";
// console.log(typeof (strNum));

// strNum = String(strNum);
// console.log(typeof (strNum));

// strNum = strNum.toString();   //preferred way semantically
// console.log(typeof (strNum));

//  string to number
let str = "123";
console.log(typeof (str));
console.log(parseInt(str));

let text = "something cannot be converted to Int";
console.log(typeof (text));
console.log(parseInt(text));
console.log(typeof parseInt(text));