// 'use strict';
// const url = process.env.MONGODB_URI;
// const Mongoose = require('mongoose');

// // if the connection fails, try 127.0.0.1 instead of localhost below
// const uri = process.env.DB_URI ||"mongodb://localhost/myFirstDB";

// // Connect to MongoDB
// Mongoose.connect(uri).then(() => console.log('MongoDB Connected')).catch(error => console.log('MongoDB Error:'+error.message));

// // Get the default connection
// const db = Mongoose.connection;

// // Bind connection to error event (to get notification of connection errors)
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// exports.Mongoose = Mongoose;

const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
console.log(uri);

mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err.message));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
exports.mongoose = mongoose;