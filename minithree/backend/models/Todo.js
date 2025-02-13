
class Todo {
    constructor(id, activity, dueDate = null, completed = false) {
        this.id = id;
        this.activity = activity;
        this.dueDate = dueDate;
        this.completed = completed;
        this.createdAt = new Date();
    }
}

module.exports = Todo;