'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpForm() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Password validation
        if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
        }

        if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        setLoading(false);
        return;
        }

        try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        // Redirect to sign in page after successful registration
        router.push('/auth/signin?registered=true');
        } catch (error) {
        setError(error.message);
        setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

        {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field - 75% width */}
            <div className="flex justify-center">
            <div className="w-3/4">
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            </div>

            {/* Email field - 75% width */}
            <div className="flex justify-center">
            <div className="w-3/4">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            </div>

            {/* Password field - 75% width */}
            <div className="flex justify-center">
            <div className="w-3/4">
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
            </div>
            </div>

            {/* Confirm Password field - 75% width */}
            <div className="flex justify-center">
            <div className="w-3/4">
                <label className="block text-gray-700 mb-1">Confirm Password</label>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            </div>

            {/* Button - 75% width */}
            <div className="flex justify-center">
            <button
                type="submit"
                disabled={loading}
                className="w-3/4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
                {loading ? 'Creating account...' : 'Sign Up'}
            </button>
            </div>
        </form>

        <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-blue-600 hover:underline">
                Sign in
            </Link>
            </p>
        </div>
        </div>
    );
}