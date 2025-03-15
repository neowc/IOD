'use client';

import { useState, useEffect } from 'react';

export default function EnhancedTodoForm({ onSubmit }) {
    const [activity, setActivity] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('MEDIUM');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
        setIsLoading(true);
        const response = await fetch('/api/categories');

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data);
        } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
        } finally {
        setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activity.trim()) {
        onSubmit(activity, dueDate || null, priority, categoryId || null);
        setActivity('');
        setDueDate('');
        setPriority('MEDIUM');
        setCategoryId('');
        setError('');
        } else {
        setError('Activity is required');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
                Activity
            </label>
            <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full p-3 text-lg border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            </div>

            <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
                Due Date
            </label>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-3 text-lg border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
                Priority
            </label>
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-3 text-lg border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
            </select>
            </div>

            <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
                Category
            </label>
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-3 text-lg border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
                <option value="">-- None --</option>
                {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
                ))}
            </select>
            {isLoading && (
                <p className="text-sm text-gray-500">Loading categories...</p>
            )}
            </div>
        </div>

        <div className="flex justify-end">
            <button
            type="submit"
            className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
            >
            Add Task
            </button>
        </div>
        </form>
    );
}