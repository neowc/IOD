
//npm init
//npm install
//npm install --save express
//npm install --save-dev nodemon
const express = require('express');

const testRoutes = require("./routes/testRoutes");
const calcRoutes = require("./routes/calcRoutes");
const calculatorRoutes = require("./routes/calculatorRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 3100;

app.use(express.json());
app.use("/", express.static('public'));
// app.use("/static", express.static('public'));

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


