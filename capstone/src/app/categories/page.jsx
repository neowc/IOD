'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CategoryManagement from '@/components/categories/CategoryManagement';

export default function CategoriesPage() {
    const { status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        );
    }

    if (status === 'unauthenticated') {
        router.push('/auth/signin');
        return null;
    }

    return (
    <div className="flex justify-center min-h-screen bg-gray-50">
        <main className="w-full max-w-5xl px-4 py-12">
            <h1 className="text-4xl font-bold mb-12 text-center text-blue-600 drop-shadow-lg">
            📂 Manage Categories
            </h1>
            <CategoryManagement />
        </main>
    </div>
    );
}