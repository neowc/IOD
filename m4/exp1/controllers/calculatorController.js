const addNumbers = (req, res) => {
    // let number1 = parseInt(req.query.num1);
    // let number2 = parseInt(req.query.num2);

    const { num1, num2 } = req.query;
    let number1 = parseInt(num1, 10);
    let number2 = parseInt(num2, 10);
    let sum = number1 + number2;
    if(Number.isNaN(sum)){ //error handling
        return res.status(400).json({
            error: 'The inputs are not correct numbers.',
        });
    }
    console.log(sum);
    res.status(200);
    res.json(`${sum}`);
    // res.json({ result: sum });
    //res.send(`The sum is ${sum}`);
    //res.send(`${number1 + number2}`);
};

const subtractNumbers = (req, res) => {
    const { num1, num2 } = req.query;
    let number1 = parseInt(num1, 10);
    let number2 = parseInt(num2, 10);
    let subt = number1 - number2;
    if(Number.isNaN(subt)){ //error handling
        return res.status(400).json({
            error: 'The inputs are not correct numbers.',
        });
    }
    console.log(subt);
    res.status(200);
    res.json(`${subt}`);
};

const multiplyNumbers = (req, res) => {
    const { num1, num2 } = req.query;
    let number1 = parseInt(num1, 10);
    let number2 = parseInt(num2, 10);
    let mult = number1 * number2;
    if(Number.isNaN(mult)){ //error handling
        return res.status(400).json({
            error: 'The inputs are not correct numbers.',
        });
    }
    console.log(mult);
    res.status(200);
    res.json(`${mult}`);
};

const divideNumbers = (req, res) => {
    const { num1, num2 } = req.query;
    let number1 = parseInt(num1, 10);
    let number2 = parseInt(num2, 10);

    if(number2 === 0){ //error handling
        return res.status(400).json({
            error: 'Cannot divide by zero. its not allowed',
        });
    }
    let div = number1 / number2;
    if(Number.isNaN(div)){ //error handling
        return res.status(400).json({
            error: 'The inputs are not correct numbers.',
        });
    }
    console.log(div);
    res.status(200);
    res.json(`${div.toFixed(2)}`);
};

module.exports = {
    addNumbers,
    subtractNumbers,
    multiplyNumbers,
    divideNumbers,
};
