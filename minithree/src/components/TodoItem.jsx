'use client';

export default function TodoItem({ todo, onToggle, onDelete }) {
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <tr className={`text-lg transition-all duration-200
      ${isOverdue ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-blue-50'}
      ${todo.completed ? 'bg-emerald-50 hover:bg-emerald-100' : ''}`}>
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </td>
      <td className="px-6 py-4">
        <span className={`text-lg ${todo.completed ? 'line-through text-gray-500' :
          isOverdue ? 'text-red-600 font-medium' : 'text-gray-800'}`}>
          {todo.activity}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`text-lg ${isOverdue ? 'text-red-600 font-medium' :
          'text-gray-600'}`}>
          {formatDate(todo.dueDate)}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onDelete(todo.id)}
          className="text-lg font-medium px-4 py-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all"
        >
          Delete
        </button>
      </td>
    </tr>

  );
}