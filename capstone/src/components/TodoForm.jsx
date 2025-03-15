'use client';

import { useState } from 'react';

export default function TodoForm({ onSubmit }) {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
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
        <div className="md:w-56">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 text-lg border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>
        <div className="md:flex md:items-end">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 text-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>

  );
};

