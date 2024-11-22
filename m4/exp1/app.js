const express = require("express");

// const testRoutes = require("./routes/myTestRoutes");
// const calculatorRoutes = require("./routes/calculatorRoutes");
// const userRoutes = require("./routes/userRoutes");
// const friendsRoutes = require("./routes/friendRoutes");
const testRoutes = require("./routes/testRoutes");
const calcRoutes = require("./routes/calcRoutes");
const calculatorRoutes = require("./routes/calculatorRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/", express.static("public"));

// app.use("/myOwnTest", testRoutes);
// app.use("/calculator", calculatorRoutes);
// app.use("/users", userRoutes);
// app.use("/friends", friendsRoutes);

app.use("/test", testRoutes);
app.use("/calc", calcRoutes); //my own
app.use("/calculator", calculatorRoutes); //answers
app.use("/users", userRoutes);

module.exports = app;