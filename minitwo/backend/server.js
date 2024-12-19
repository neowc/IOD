const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', todoRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});