const Calculator = require('../library/Calculator');

const calculator = new Calculator();

const addNumbers = (req, res) => {
    const { num1, num2 } = req.query;
    let result = calculator.add(num1, num2);
    if(Number.isNaN(result)){ //error handling
        return res.status(400).json({
            error: 'The inputs are not correct numbers.',
        });
    }
    console.log(result);
    res.status(200);
    res.json(`${result}`);
};

const subtractNumbers = (req, res) => {
    const { num1, num2 } = req.query;
    let result = calculator.subtract(num1, num2);
    if(Number.isNaN(result)){ //error handling
        return res.status(400).json({
            error: 'The inputs are not correct numbers.',
        });
    }
    console.log(result);
    res.status(200);
    res.json(`${result}`);
};

const multiplyNumbers = (req, res) => {
    const { num1, num2 } = req.query;
    let result = calculator.multiply(num1, num2);
    if(Number.isNaN(result)){ //error handling
        return res.status(400).json({
            error: 'The inputs are not correct numbers.',
        });
    }
    console.log(result);
    res.status(200);
    res.json(`${result}`);
};

const divideNumbers = (req, res) => {
    const { num1, num2 } = req.query;
    let result = calculator.divide(num1, num2);
    if(result === Infinity){ //error handling
        return res.status(400).json(`${result}`);
        // return res.status(400).json({
        //     error: 'Cannot divide by zero. its not allowed',
        // });
    }

    if(Number.isNaN(result)){ //error handling
        return res.status(400).json({
            error: 'The inputs are not correct numbers.',
        });
    }
    console.log(result);
    res.status(200);
    res.json(`${result.toFixed(2)}`);
};

module.exports = {
    addNumbers,
    subtractNumbers,
    multiplyNumbers,
    divideNumbers,
};
