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
    const {num1,num2} = req.query;
    let sum = parseInt(num1)+parseInt(num2);
    res.send(`The sum is ${sum}`);
    //res.send('This is add endpoint');
});
router.get('/subtract',(req,res)=>{
    console.log(req.query);
    const {num1,num2} = req.query;
    let subt = parseInt(num1) - parseInt(num2);
    res.send(`The subtraction is ${subt}`);
});
router.get('/divide',(req,res)=>{
    console.log(req.query);
    const {num1,num2} = req.query;
    let div = parseInt(num1) / parseInt(num2);
    res.send(`The division is ${div}`);
});
router.get('/multiply',(req,res)=>{
    console.log(req.query);
    const {num1,num2} = req.query;
    let mult = parseInt(num1) * parseInt(num2);
    res.send(`The multiplication is ${mult}`);
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