
// Installatio using below cmd
// npm install
// npm install --save express
// npm install --save-dev nodemon
// npm install axios express

const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 3100;

app.use(express.json());
app.use("/", express.static('public'));

app.use("/products", productRoutes);

// display Fake E-commerce page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/fake-store-app.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


