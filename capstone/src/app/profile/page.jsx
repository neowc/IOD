'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (status === 'unauthenticated') {
        router.push('/auth/signin');
        } else if (status === 'authenticated' && session.user) {
        setName(session.user.name || '');
        }
    }, [status, session, router]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
        const response = await fetch('/api/user/profile', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update profile');
        }

        // Update session with new name
        await update({ name });

        setMessage({ type: 'success', text: 'Profile updated successfully' });
        } catch (error) {
        console.error('Error updating profile:', error);
        setMessage({ type: 'error', text: error.message });
        } finally {
        setIsLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        // Validate passwords
        if (newPassword !== confirmPassword) {
        setMessage({ type: 'error', text: 'New passwords do not match' });
        setIsLoading(false);
        return;
        }

        if (newPassword.length < 8) {
        setMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
        setIsLoading(false);
        return;
        }

        try {
        const response = await fetch('/api/user/change-password', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to change password');
        }

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage({ type: 'success', text: 'Password changed successfully' });
        } catch (error) {
        console.error('Error changing password:', error);
        setMessage({ type: 'error', text: error.message });
        } finally {
        setIsLoading(false);
        }
    };

    if (status === 'loading') {
        return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        );
    }

    if (status !== 'authenticated') {
        return null; // Redirect handled in useEffect
    }

    return (
    <div className="flex justify-center min-h-screen bg-gray-50">
        <main className="w-full max-w-4xl px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>

        {message.text && (
            <div
            className={`mb-6 p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
            >
            {message.text}
            </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

            <form onSubmit={handleUpdateProfile}>
                <div className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    value={session.user.email}
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                    <p className="mt-1 text-sm text-gray-500">Your email address cannot be changed</p>
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                    {isLoading ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>
                </div>
            </form>
            </div>
        </div>

        {/* Only show password change form for email/password accounts */}
        {session.user.email && !session.user.provider && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold mb-6">Change Password</h2>

                <form onSubmit={handleChangePassword}>
                <div className="space-y-6">
                    <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    </div>

                    <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">Password must be at least 8 characters long</p>
                    </div>

                    <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    </div>

                    <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isLoading ? 'Changing...' : 'Change Password'}
                    </button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        )}

        </main>
    </div>
    );
}