// import TodoList class from library
const TodoList = require('../library/TodoList');
// create new instance of TodoList
const todoList = new TodoList();

// define CRUD controller functions
const getAllTodos = (req, res) => {
    res.json(todoList.getTodos());
};

const createTodo = (req, res) => {
    const { activity, dueDate } = req.body;
    if (!activity) {
        return res.status(400).json({ error: 'Name an activity is required' });
    }
    const todo = todoList.addTodo(activity, dueDate);
    res.status(201).json(todo);
};

const updateTodo = (req, res) => {
    const { id } = req.params;
    const todo = todoList.updateTodo(Number(id), req.body);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
};

const  deleteTodo = (req, res) => {
    const { id } = req.params;
    const todo = todoList.deleteTodo(Number(id));
    if (todo) {
        res.json({ message: 'Todo deleted successfully' });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
};

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};