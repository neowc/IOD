const express = require('express');
const router = express.Router();

// const app=express();
// const port=3000;

//Path: http://localhost:8180/test/
router.get('/',(req,res)=>{
    console.log(req.query);
    res.send('This is Test Home!');
    res.status(200);
});

//Path: http://localhost:8180/test/123
router.get('/123',(req,res)=>{
    res.send('This is one Test route!');
});
//Path: http://localhost:8180/test/page
router.get('/page',(req, res)=>{
    res.send('This is Test Page!');
});
// app.use('/', router);
// app.listen(port, ()=>{
//     console.log(`Server is running on port ${port}`);
// });

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
// app.get('/about', (req, res) => {
//     res.send('About Page');
// });
module.exports=router;