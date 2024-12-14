const express = require('express');
const app1 = express();
const port1 = 8180;

//Path: http://localhost:8180/

app1.listen(port1, () => {
    console.log(`Server #1 is running on port ${port1}`);
});

app1.get('/', (req, res) => {
    res.send('Hello World once!');
});




