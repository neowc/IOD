'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import NotificationCenter from '@/components/notifications/NotificationCenter';

export default function Navbar() {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/auth/signin' });
    };

    const isActive = (path) => {
        return pathname === path;
    };

    // Don't show navbar on auth pages
    if (pathname.startsWith('/auth/')) {
        return null;
    }

    return (
        <nav className="bg-white shadow-md">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center w-1/4">
                <Link href="/" className="text-blue-600 font-bold text-xl flex items-center">
                <span className="mr-2 text-2xl">📝</span>
                TodoApp
                </Link>
            </div>

            {/* Desktop Navigation - Using fixed width and justify-between */}
            {/* Updated font size to text-xl and font weight to font-bold */}
            <div className="hidden sm:flex flex-1 justify-center items-center">
                <div className="flex w-96 justify-between">
                <Link
                    href="/"
                    className={`inline-block px-4 py-2 text-xl font-bold rounded-md transition-colors ${
                    isActive('/')
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                >
                    Tasks
                </Link>

                <Link
                    href="/categories"
                    className={`inline-block px-4 py-2 text-xl font-bold rounded-md transition-colors ${
                    isActive('/categories')
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                >
                    Categories
                </Link>

                <Link
                    href="/dashboard"
                    className={`inline-block px-4 py-2 text-xl font-bold rounded-md transition-colors ${
                    isActive('/dashboard')
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                >
                    Dashboard
                </Link>
                </div>
            </div>

            {/* User Menu */}
            {status === 'authenticated' && (
                <div className="flex items-center w-1/4 justify-end">
                <NotificationCenter />

                <div className="relative ml-4">
                    <button
                    onClick={toggleMenu}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    id="user-menu"
                    aria-expanded={isMenuOpen}
                    >
                    <span className="sr-only">Open user menu</span>
                    {session.user.image ? (
                        <img
                        className="h-8 w-8 rounded-full"
                        src={session.user.image}
                        alt={session.user.name || session.user.email}
                        />
                    ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                            {(session.user.name || session.user.email).charAt(0).toUpperCase()}
                        </span>
                        </div>
                    )}
                    </button>

                    {isMenuOpen && (
                    <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                    >
                        <div className="py-1" role="none">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            <p className="font-medium">{session.user.name || 'User'}</p>
                            <p className="text-gray-500 truncate">{session.user.email}</p>
                        </div>

                        <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={closeMenu}
                        >
                            Your Profile
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                        >
                            Sign out
                        </button>
                        </div>
                    </div>
                    )}
                </div>
                </div>
            )}

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
                {status === 'authenticated' && <NotificationCenter />}

                <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ml-2"
                aria-expanded={isMenuOpen}
                >
                <span className="sr-only">Open main menu</span>
                <svg
                    className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                    className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
            <div className="pt-2 pb-3 space-y-1">
            <Link
                href="/"
                className={`block pl-3 pr-4 py-2 border-l-4 text-xl font-bold ${
                isActive('/')
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-700 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                }`}
                onClick={closeMenu}
            >
                Tasks
            </Link>

            <Link
                href="/categories"
                className={`block pl-3 pr-4 py-2 border-l-4 text-xl font-bold ${
                isActive('/categories')
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-700 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                }`}
                onClick={closeMenu}
            >
                Categories
            </Link>

            <Link
                href="/dashboard"
                className={`block pl-3 pr-4 py-2 border-l-4 text-xl font-bold ${
                isActive('/dashboard')
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-700 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                }`}
                onClick={closeMenu}
            >
                Dashboard
            </Link>
            </div>

            {status === 'authenticated' && (
            <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                    {session.user.image ? (
                    <img
                        className="h-10 w-10 rounded-full"
                        src={session.user.image}
                        alt={session.user.name || session.user.email}
                    />
                    ) : (
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                        {(session.user.name || session.user.email).charAt(0).toUpperCase()}
                        </span>
                    </div>
                    )}
                </div>
                <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{session.user.name || 'User'}</div>
                    <div className="text-sm font-medium text-gray-500">{session.user.email}</div>
                </div>
                </div>
                <div className="mt-3 space-y-1">
                <Link
                    href="/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={closeMenu}
                >
                    Your Profile
                </Link>
                <button
                    onClick={handleSignOut}
                    className="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                    Sign out
                </button>
                </div>
            </div>
            )}
        </div>
        </nav>
    );
}