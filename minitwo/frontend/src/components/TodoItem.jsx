import PropTypes from 'prop-types';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
    console.log(isOverdue);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <li className={`flex items-center justify-between p-3 bg-white border rounded shadow-sm
            ${isOverdue ? 'bg-red-50' : ''}`}>
            <div className="flex items-center gap-3 flex-1">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="w-4 h-4"
            />
            <div className="flex flex-col">
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.activity}
                </span>
                <br></br>
                {todo.dueDate && (
                <span className={`text-sm ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                    Due: {formatDate(todo.dueDate)}
                </span>
                )}
                <button onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-700 ml-4">Delete</button>
            </div>
            </div>
        </li>
        );
};

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        activity: PropTypes.string.isRequired,
        dueDate: PropTypes.string,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}
export default TodoItem;