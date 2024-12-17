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

module.exports = {
    addNumbers,
};
