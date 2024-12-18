// const app=express();
// const port=3000;
//Path: http://localhost:3100/calc/

//Expand this application to use a Calculator Class library that takes care of the calculations and integrate it in the code
//The Calculator class should have the following methods:
//add(a,b) - returns a+b
//subtract(a,b) - returns a-b
//multiply(a,b) - returns a*b
//divide(a,b) - returns a/b
//The Calculator class should also have a method that returns a random UUID
//The Calculator class should be in a separate file and should be imported into the main file
//The Calculator class should be used in the routes to perform the calculations
//The Calculator class should be used to generate a random UUID and return it in the response
//The Calculator class should be used to perform the calculations and return the result in the response

const Logger = require("./Logger");
const crypto = require("crypto");
//const randomUuid = require('crypto').randomUuid;
class Calculator {
    constructor() {
        // Part 1:
        this.id = crypto.randomBytes(20).toString("hex");
        // Part 3:
        this.logger = new Logger(Calculator.name, this.id);
    }
    add(num1, num2) {
        const num1Num = parseInt(num1, 10);
        const num2Num = parseInt(num2, 10);
        const value = num1Num + num2Num;
        this.logger.log(value, "/add");
        return value;
    }
    subtract(num1, num2) {
        const num1Num = parseInt(num1, 10);
        const num2Num = parseInt(num2, 10);
        const value = num1Num - num2Num;
        this.logger.log(value, "/subtract");
        return value;
    }
    multiply(num1, num2) {
        const num1Num = parseInt(num1, 10);
        const num2Num = parseInt(num2, 10);
        const value = num1Num * num2Num;
        this.logger.log(value, "/multiply");
        return value;
    }
    divide(num1, num2) {
        const num1Num = parseInt(num1, 10);
        const num2Num = parseInt(num2, 10);
        const value = num1Num / num2Num;
        this.logger.log(value, "/divide");
        return value;
    }
}

module.exports = Calculator;

// class Calculator{
//     constructor(){
//         this.id = randomUuid;
//         this.logger = new Logger(Calculator.name, this.id);
//         console.log('Calculator instance created');
//     }
//     add(a,b){
//         return a+b;
//     }
//     subtract(a,b){
//         return a-b;
//     }
//     multiply(a,b){
//         return a*b;
//     }
//     divide(a,b){
//         return a/b;
//     }
//     getUuid(){
//         //const randomUuid = require('random-uuid-v4');
//         return this.id;
//     }
// }