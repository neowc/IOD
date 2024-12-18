
//npm init
//npm install
//npm install --save express
//npm install --save-dev nodemon
//npm install --save swagger-ui-express
//npm create vite@latest
const express = require('express');

const testRoutes = require("./routes/testRoutes");
const calcRoutes = require("./routes/calcRoutes");
// const calculatorRoutes = require("./routes/calculatorRoutes");
const calculatorRoutes = require("./routes/calculatorRoute");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 3100;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());
app.use("/", express.static('public'));
// app.use("/static", express.static('public'));

//swaggerUi - http://localhost:3100/api-docs/#/
app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument));

app.use("/test", testRoutes);
app.use("/calc", calcRoutes); //my own
app.use("/calculator", calculatorRoutes); //answers
app.use("/users", userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


