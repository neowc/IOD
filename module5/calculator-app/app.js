
const express = require('express')
const app = express()

// map all routes to the express app
const calculatorRoutes = require("./routes/calculatorRoute");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// display calculator.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/calculator.html');
});

//swaggerUi - http://localhost:3100/api-docs/#/
app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument));

app.use("/calculator", calculatorRoutes);

app.use(express.json());
//app.use("/", express.static('public'));
//app.use("/static", express.static('public'));

// export the app
module.exports = app;