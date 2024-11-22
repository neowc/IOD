
const express = require('express');
const testRoutes = require("./routes/testRoutes");

const app2 = express();
const port2 = 8180;

//Path: http://localhost:8180/test/
app2.use("/test", testRoutes);

app2.listen(port2, () => {
    console.log(`Server #2 is running on port ${port2}`);
});

app2.get('/', (req, res) => {
    res.send('Hello World twice again! ');
});




