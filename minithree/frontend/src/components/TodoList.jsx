import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

const TodoList = ({ todos, onToggle, onDelete }) => {
    if (todos.length === 0) {
        return (
        <div className="text-center text-gray-500 mt-4" >
            <h5 color="red">Nothing yet. Add one activity at above! </h5>
        </div>
        );
    }

    return (
        <ul className="space-y-2">
        {todos.map(todo => (
            <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
            />
        ))}
        </ul>
    );
};
TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TodoList;
