////////////
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const dbConnect = require("./dbConnect");

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my MySQL application." });
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});