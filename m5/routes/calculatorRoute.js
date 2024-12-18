const express = require('express');
const router = express.Router();

const {
    addNumbers,
    subtractNumbers,
    multiplyNumbers,
    divideNumbers,
} = require('../controllers/calculatorController');

router.get('/add', (req, res) => addNumbers(req,res) );
router.get('/subtract', (req, res) => subtractNumbers(req,res) );
router.get('/multiply', (req, res) => multiplyNumbers(req,res) );
router.get('/divide', (req, res) => divideNumbers(req,res) );

//Path: http://localhost:3100/calc/
router.get('/',(req,res)=>{
    console.log(req.query);
    res.send('This is Calculator Home!');
    res.status(200);
});

module.exports = router;
