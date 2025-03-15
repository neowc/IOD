'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function NotificationCenter() {
    const { data: session, status } = useSession();
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
        fetchNotifications();
        }
    }, [status]);

    const fetchNotifications = async () => {
        try {
        setIsLoading(true);
        const response = await fetch('/api/notifications');

        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        setNotifications(data);
        setError('');
        } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to load notifications');
        } finally {
        setIsLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
        const response = await fetch(`/api/notifications/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ read: true }),
        });

        if (!response.ok) {
            throw new Error('Failed to update notification');
        }

        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
        } catch (error) {
        console.error('Error marking notification as read:', error);
        }
    };

    const deleteNotification = async (id) => {
        try {
        const response = await fetch(`/api/notifications/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete notification');
        }

        setNotifications(notifications.filter(n => n.id !== id));
        } catch (error) {
        console.error('Error deleting notification:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
        const unreadNotifications = notifications.filter(n => !n.read);

        // Use Promise.all to handle multiple requests
        await Promise.all(
            unreadNotifications.map(notification =>
            fetch(`/api/notifications/${notification.id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ read: true }),
            })
            )
        );

        setNotifications(notifications.map(n => ({ ...n, read: true })));
        } catch (error) {
        console.error('Error marking all notifications as read:', error);
        }
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        // Mark notifications as read when opening panel
        if (!showNotifications) {
        const unreadNotifications = notifications.filter(n => !n.read);
        if (unreadNotifications.length > 0) {
            markAllAsRead();
        }
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now - date;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 60) {
        return `${diffInMinutes} min${diffInMinutes !== 1 ? 's' : ''} ago`;
        } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        } else if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
        } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
        }
    };

    if (status !== 'authenticated') {
        return null;
    }

    return (
        <div className="relative">
        {/* Notification Bell */}
        <button
            onClick={toggleNotifications}
            className="relative p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
            aria-label="Notifications"
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
            />
            </svg>

            {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {unreadCount}
            </span>
            )}
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50">
            <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex justify-between items-center">
                <h3 className="text-lg font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                <button
                    onClick={markAllAsRead}
                    className="text-xs font-medium hover:underline focus:outline-none"
                >
                    Mark all as read
                </button>
                )}
            </div>

            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {isLoading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                ) : notifications.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                    <p>No notifications</p>
                </div>
                ) : (
                notifications.map((notification) => (
                    <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 flex justify-between ${
                        !notification.read ? 'bg-blue-50' : ''
                    }`}
                    >
                    <div className="flex-1">
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                        {formatDate(notification.createdAt)}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                        {!notification.read && (
                        <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Mark as read"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                            </svg>
                        </button>
                        )}
                        <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        </button>
                    </div>
                    </div>
                ))
                )}
            </div>

            <div className="px-4 py-2 bg-gray-50 text-center border-t border-gray-100">
                <button
                onClick={() => setShowNotifications(false)}
                className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                Close
                </button>
            </div>
            </div>
        )}
        </div>
    );
}