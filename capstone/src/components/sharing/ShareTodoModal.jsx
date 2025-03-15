'use client';

import { useState, useEffect } from 'react';

export default function ShareTodoModal({ todo, isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [permission, setPermission] = useState('VIEW');
    const [sharedUsers, setSharedUsers] = useState([]);
    const [owner, setOwner] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (isOpen && todo) {
        fetchSharedUsers();
        }
    }, [isOpen, todo]);

    const fetchSharedUsers = async () => {
        if (!todo) return;

        try {
        setIsLoading(true);
        const response = await fetch(`/api/todos/${todo.id}/share`);

        if (!response.ok) {
            throw new Error('Failed to fetch shared users');
        }

        const data = await response.json();
        setSharedUsers(data.sharedUsers || []);
        setOwner(data.owner || null);
        setError('');
        } catch (error) {
        console.error('Error fetching shared users:', error);
        setError('Failed to load shared users');
        } finally {
        setIsLoading(false);
        }
    };

    const handleShare = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
        setError('Email is required');
        return;
        }

        try {
        setIsLoading(true);
        setError('');
        setSuccess('');

        const response = await fetch(`/api/todos/${todo.id}/share`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, permission }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to share todo');
        }

        setEmail('');
        setSuccess('Todo shared successfully');
        fetchSharedUsers(); // Refresh the shared users list
        } catch (error) {
        console.error('Error sharing todo:', error);
        setError(error.message);
        } finally {
        setIsLoading(false);
        }
    };

    const removeAccess = async (userId) => {
        try {
        setIsLoading(true);
        setError('');
        setSuccess('');

        const response = await fetch(`/api/todos/${todo.id}/share`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to remove access');
        }

        setSuccess('Access removed successfully');
        setSharedUsers(sharedUsers.filter(user => user.id !== userId));
        } catch (error) {
        console.error('Error removing access:', error);
        setError(error.message);
        } finally {
        setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h2 className="text-xl font-semibold">Share Task</h2>
            <p className="text-sm opacity-80 truncate">
                {todo?.activity}
            </p>
            </div>

            <div className="p-6">
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                {success}
                </div>
            )}

            <form onSubmit={handleShare} className="mb-6">
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>

                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Permission
                </label>
                <select
                    value={permission}
                    onChange={(e) => setPermission(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="VIEW">View only</option>
                    <option value="EDIT">Can edit</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                    View: Can see the task<br />
                    Edit: Can update task details and mark as complete<br />
                    Admin: Can also share with others
                </p>
                </div>

                <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {isLoading ? 'Sharing...' : 'Share'}
                </button>
                </div>
            </form>

            <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium mb-3">People with access</h3>

                {isLoading && sharedUsers.length === 0 && !owner ? (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                ) : (
                <ul className="space-y-3">
                    {owner && (
                    <li className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {owner.image ? (
                            <img
                                src={owner.image}
                                alt={owner.name || owner.email}
                                className="w-8 h-8 rounded-full"
                            />
                            ) : (
                            <span className="text-blue-600 font-medium">
                                {(owner.name || owner.email).charAt(0).toUpperCase()}
                            </span>
                            )}
                        </div>
                        <div>
                            <p className="font-medium">{owner.name || owner.email}</p>
                            <p className="text-xs text-gray-500">
                            {owner.permission === 'OWNER' ? 'Owner' : owner.permission}
                            </p>
                        </div>
                        </div>
                    </li>
                    )}

                    {sharedUsers.map((user) => (
                    <li key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name || user.email}
                                className="w-8 h-8 rounded-full"
                            />
                            ) : (
                            <span className="text-blue-600 font-medium">
                                {(user.name || user.email).charAt(0).toUpperCase()}
                            </span>
                            )}
                        </div>
                        <div>
                            <p className="font-medium">{user.name || user.email}</p>
                            <p className="text-xs text-gray-500">{user.permission}</p>
                        </div>
                        </div>
                        <button
                        onClick={() => removeAccess(user.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Remove access"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                            />
                        </svg>
                        </button>
                    </li>
                    ))}

                    {sharedUsers.length === 0 && owner && (
                    <li className="text-center py-2 text-gray-500">
                        <p>No shared users yet</p>
                    </li>
                    )}
                </ul>
                )}
            </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end">
            <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
                Close
            </button>
            </div>
        </div>
        </div>
    );
}