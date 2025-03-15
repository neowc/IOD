'use client';

import { useState, useEffect } from 'react';
import EnhancedTodoForm from './EnhancedTodoForm';
import TodoItem from './TodoItem';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function EnhancedTodoList() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [todos, setTodos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Filtering and sorting state
    const [filters, setFilters] = useState({
        status: 'all', // 'all', 'active', 'completed'
        priority: 'all',
        category: 'all',
        search: '',
    });
    const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate', 'priority', 'activity'
    const [sortDir, setSortDir] = useState('asc'); // 'asc', 'desc'

    useEffect(() => {
        if (status === 'unauthenticated') {
        router.push('/auth/signin');
        } else if (status === 'authenticated') {
        fetchTodos();
        fetchCategories();
        }
    }, [status, router]);

    const fetchTodos = async () => {
        try {
        setIsLoading(true);
        const response = await fetch('/api/todos');

        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }

        const data = await response.json();
        setTodos(data);
        setError('');
        } catch (error) {
        console.error('Error fetching todos:', error);
        setError('Failed to load todos. Please try again later.');
        } finally {
        setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
        const response = await fetch('/api/categories');

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data);
        } catch (error) {
        console.error('Error fetching categories:', error);
        }
    };

    const addTodo = async (activity, dueDate, priority, categoryId) => {
        try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            activity,
            dueDate,
            priority,
            categoryId: categoryId ? Number(categoryId) : null
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create todo');
        }

        const newTodo = await response.json();
        setTodos([newTodo, ...todos]);
        setError('');
        } catch (error) {
        console.error('Error adding todo:', error);
        setError('Failed to add todo. Please try again.');
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

        if (!response.ok) {
            throw new Error('Failed to update todo');
        }

        const updatedTodo = await response.json();
        setTodos(todos.map(t => t.id === id ? updatedTodo : t));
        setError('');
        } catch (error) {
        console.error('Error updating todo:', error);
        setError('Failed to update todo. Please try again.');
        }
    };

    const deleteTodo = async (id) => {
        try {
        const response = await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }

        setTodos(todos.filter(t => t.id !== id));
        setError('');
        } catch (error) {
        console.error('Error deleting todo:', error);
        setError('Failed to delete todo. Please try again.');
        }
    };

    // Filter and sort todos
    const getFilteredAndSortedTodos = () => {
        // First, filter todos
        let filteredTodos = todos.filter(todo => {
        // Filter by status
        if (filters.status === 'active' && todo.completed) return false;
        if (filters.status === 'completed' && !todo.completed) return false;

        // Filter by priority
        if (filters.priority !== 'all' && todo.priority !== filters.priority) return false;

        // Filter by category
        if (filters.category !== 'all') {
            if (filters.category === 'none' && todo.categoryId !== null) return false;
            if (filters.category !== 'none' && Number(filters.category) !== todo.categoryId) return false;
        }

        // Filter by search text
        if (filters.search && !todo.activity.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }

        return true;
        });

        // Then, sort the filtered todos
        return filteredTodos.sort((a, b) => {
        if (sortBy === 'dueDate') {
            // Handle null due dates
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return sortDir === 'asc' ? 1 : -1;
            if (!b.dueDate) return sortDir === 'asc' ? -1 : 1;

            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            return sortDir === 'asc' ? dateA - dateB : dateB - dateA;
        }

        if (sortBy === 'priority') {
            const priorityOrder = { 'LOW': 0, 'MEDIUM': 1, 'HIGH': 2, 'URGENT': 3 };
            const orderA = priorityOrder[a.priority] || 0;
            const orderB = priorityOrder[b.priority] || 0;
            return sortDir === 'asc' ? orderA - orderB : orderB - orderA;
        }

        if (sortBy === 'activity') {
            return sortDir === 'asc'
            ? a.activity.localeCompare(b.activity)
            : b.activity.localeCompare(a.activity);
        }

        // Default sort by creation date
        return sortDir === 'asc'
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt);
        });
    };

    const filteredAndSortedTodos = getFilteredAndSortedTodos();

    const toggleSortDirection = () => {
        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    };

    const getCategoryNameById = (categoryId) => {
        if (!categoryId) return 'None';
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : 'Unknown';
    };

    const getCategoryColorById = (categoryId) => {
        if (!categoryId) return '#CBD5E1'; // Default gray
        const category = categories.find(c => c.id === categoryId);
        return category ? category.color : '#CBD5E1';
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
        case 'LOW': return 'bg-green-100 text-green-800';
        case 'MEDIUM': return 'bg-blue-100 text-blue-800';
        case 'HIGH': return 'bg-orange-100 text-orange-800';
        case 'URGENT': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (status === 'loading') {
        return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        );
    }

    return (
        <div className="todo-container bg-white rounded-xl shadow-2xl p-8">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-xl border-b-4 border-amber-200 mb-8">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <EnhancedTodoForm onSubmit={addTodo} />
        </div>

        {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
            </div>
        )}

        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Tasks</h2>

            {/* Filters */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Filter & Sort</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {/* Status Filter */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
                </div>

                {/* Priority Filter */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                    value={filters.priority}
                    onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                >
                    <option value="all">All Priorities</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                </select>
                </div>

                {/* Category Filter */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                >
                    <option value="all">All Categories</option>
                    <option value="none">Uncategorized</option>
                    {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                    ))}
                </select>
                </div>

                {/* Search */}
                <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    placeholder="Search tasks..."
                    className="w-full p-2 border rounded-lg"
                />
                </div>

                {/* Sort */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <div className="flex space-x-2">
                    <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                    >
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                    <option value="activity">Activity Name</option>
                    <option value="createdAt">Creation Date</option>
                    </select>
                    <button
                    onClick={toggleSortDirection}
                    className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    title={sortDir === 'asc' ? 'Ascending' : 'Descending'}
                    >
                    {sortDir === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
                </div>
            </div>
            </div>

            {/* Todo List */}
            {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            ) : filteredAndSortedTodos.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
                <p className="text-gray-600 text-xl font-medium">📝 No tasks found matching your filters</p>
            </div>
            ) : (
            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200">
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Activity</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Due Date</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Priority</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredAndSortedTodos.map((todo) => (
                    <tr
                        key={todo.id}
                        className={`text-lg transition-all duration-200
                        ${todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-blue-50'}
                        ${todo.completed ? 'bg-emerald-50 hover:bg-emerald-100' : ''}`}
                    >
                        <td className="px-6 py-4">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        </td>
                        <td className="px-6 py-4">
                        <span 
                            className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 
                            todo.dueDate && new Date(todo.dueDate) < new Date() ? 'text-red-600 font-medium' : 'text-gray-800'}`}
                        >
                            {todo.activity}
                        </span>
                        </td>
                        <td className="px-6 py-4">
                        <span 
                            className={`text-lg ${todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed ? 'text-red-600 font-medium' : 'text-gray-600'}`}
                        >
                            {todo.dueDate 
                            ? new Date(todo.dueDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                                })
                            : '-'}
                        </span>
                        </td>
                        <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(todo.priority)}`}>
                            {todo.priority}
                        </span>
                        </td>
                        <td className="px-6 py-4">
                        {todo.categoryId ? (
                            <span 
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ 
                                backgroundColor: `${getCategoryColorById(todo.categoryId)}20`, // Add transparency
                                color: getCategoryColorById(todo.categoryId),
                                border: `1px solid ${getCategoryColorById(todo.categoryId)}`
                            }}
                            >
                            {getCategoryNameById(todo.categoryId)}
                            </span>
                        ) : (
                            <span className="text-gray-500">-</span>
                        )}
                        </td>
                        <td className="px-6 py-4 text-right">
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="text-lg font-medium px-4 py-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
    );
}