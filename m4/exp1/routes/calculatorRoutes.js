const express = require('express');
const router = express.Router();

// const app=express();
// const port=3000;

//Path: http://localhost:3100/calc/
router.get('/',(req,res)=>{
    console.log(req.query);
    res.send('This is Calculator Home!');
    res.status(200);
});
router.get('/add',(req,res)=>{
    console.log(req.query);
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let sum = number1 + number2;

    //res.send(`The sum is ${sum}`);  //Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    res.status(200);
    //res.json({result:sum});
    res.json(`${sum}`);
});
router.get('/subtract',(req,res)=>{
    console.log(req.query);
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let subt = number1 - number2;
    res.status(200);
    // res.json({result:subt});
    res.json(`${subt}`);
});
router.get('/divide',(req,res)=>{
    console.log(req.query);
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let div = number1 / number2;
    res.status(200);
    // res.json({result:div});
    res.json(`${div}`);
});
router.get('/multiply',(req,res)=>{
    console.log(req.query);
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let mult = number1 * number2;

    if(Number.isNaN(mult)){
        return res.status(400).json({
            error: 'The inputs are not correct numbers',
        });
    }
    res.status(200);
    // res.json({result:mult});
    res.json(`${mult}`);
});

// app.use('/', router);
// app.listen(port, ()=>{
//     console.log(`Server is running on port ${port}`);
// });

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
// app.get('/about', (req, res) => {
//     res.send('About Page');
// });
module.exports = router;