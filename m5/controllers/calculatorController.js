const addNumbers = (req, res) => {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let sum = number1 + number2;
    if(Number.isNaN(sum)){
        return res.status(400).json({
            error: 'The inputs are not correct numbers.',
        });
    }
    console.log(sum);
    res.status(200);
    res.json({ result: sum });
    //res.send(`The sum is ${sum}`);
};

module.exports = {
    addNumbers,
};
