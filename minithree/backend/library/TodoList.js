
const Todo = require('../models/Todo');

class TodoList {
    constructor() {
        this.todos = [];
        this.currentId = 1;
    }

    addTodo(activity, dueDate) {
        const todo = new Todo(this.currentId++, activity, dueDate);
        this.todos.push(todo);
        return todo;
    }

    getTodos() {
        return this.todos;
    }

    updateTodo(id, updates) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            Object.assign(todo, updates);
            return todo;
        }
        return null;
    }

    deleteTodo(id) {
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
            return this.todos.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = TodoList;