const express = require('express');
const router = express.Router();

const {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} = require('../controllers/todoController');

router.get('/todos', (req, res) => getAllTodos(req,res) );
router.post('/todos', (req, res) => createTodo(req,res) );
router.put('/todos/:id', (req, res) => updateTodo(req,res) );
router.delete('/todos/:id', (req, res) => deleteTodo(req,res) );

module.exports = router;