import { useState } from 'react';
import PropTypes from 'prop-types';

const TodoForm = ({ onSubmit }) => {
    const [activity, setActivity] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activity.trim()) {
            onSubmit(activity, dueDate || null);
            setActivity('');
            setDueDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Add a new activity: </label>
            <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="Add a new todo..."
                className="p-2 border rounded"
            />
            <div className="flex gap-2">
                <label className="text-lg font-semibold">Due Date: </label>
                <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="flex-1 p-2 border rounded"
                />
                <button type="submit" className="bg-blue-300 text-white px-3 py-1 text-sm rounded-sm hover:bg-blue-300">Submit</button>
            </div>
            </div>
        </form>
    );
};
TodoForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default TodoForm;