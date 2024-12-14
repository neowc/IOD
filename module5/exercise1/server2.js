const express = require('express');
const app2 = express();
const port2 = 3102;

app2.listen(port2, () => {
    console.log(`Server #2 is running on port ${port2}`);
});

app2.get('/', (req, res) => {
    res.send('Hello World from Server #2!');
});




