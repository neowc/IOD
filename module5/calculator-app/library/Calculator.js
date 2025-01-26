const Logger = require("./Logger");
const crypto = require("crypto");
//const randomUuid = require('crypto').randomUuid;
class Calculator {
    constructor() {

        this.id = crypto.randomBytes(20).toString("hex");

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