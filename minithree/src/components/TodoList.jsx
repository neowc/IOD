'use client';

import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (activity, dueDate) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activity, dueDate }),
      });
      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="todo-container bg-white rounded-xl shadow-2xl p-8">
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-xl border-b-4 border-amber-200">
        <TodoForm onSubmit={addTodo} />
      </div>
      <div className="mt-6">
        {todos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-600 text-xl font-medium">📝 Your task list is empty. Add something above!</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full bg-white text-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Activity</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Due Date</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    // <div>
    //   <TodoForm onSubmit={addTodo} />
    //   {todos.length === 0 ? (
    //     <div className="text-center text-gray-500 mt-4">
    //       <h5>Nothing yet. Add one activity above!</h5>
    //     </div>
    //   ) : (
    //     <ul className="space-y-2 mt-6">
    //       {todos.map(todo => (
    //         <TodoItem
    //           key={todo.id}
    //           todo={todo}
    //           onToggle={toggleTodo}
    //           onDelete={deleteTodo}
    //         />
    //       ))}
    //     </ul>
    //   )}
    // </div>
  );
}

// TodoList.propTypes = {
//     todos: PropTypes.arrayOf(PropTypes.object).isRequired,
//     onToggle: PropTypes.func.isRequired,
//     onDelete: PropTypes.func.isRequired,
// };

// export default TodoList;
