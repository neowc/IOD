const express = require('express');
const router = express.Router();

const users = [
    {id: 1, name: 'Anthony Albanese', country: 'AU'},
    {id: 2, name: 'Joe Biden', country: 'US'},
    {id: 3, name: 'Chris Hipkins', country: 'NZ'},
    {id: 4, name: 'Lee Hsien Loong', country: 'SG'}
]

router.get('/',(req,res)=>{
    console.log(req.query);
    res.json(users);
});

router.get('/:id',(req, res)=>{
    console.log(req.params);
    const {id} = req.params;
    // const user = users.find((user)=>user.id==id);
    const user = users.find((user)=>user.id.toString()===id);
    res.json(user);
});

router.post('/',(req, res)=>{
    console.log(req.body);
    const { name, country} = req.body;
    users.push({id: users.length+1, name, country});
    //res.json(users);
    res.json({
        result: 'User added successfully'
    });

    // const user = req.body;
    // users.push(user);
    // res.json(user);
});

module.exports = router;