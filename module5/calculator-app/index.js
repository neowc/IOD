// Installatio using below cmd
// npm install
// npm install --save express
// npm install --save-dev nodemon

// import the app
const app = require('./app');
const port = 3100

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

