'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EnhancedTodoList from '@/components/EnhancedTodoList';
import ShareTodoModal from '@/components/sharing/ShareTodoModal';

export default function Home() {
    const { status } = useSession();
    const router = useRouter();
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const handleShareTodo = (todo) => {
        setSelectedTodo(todo);
        setShareModalOpen(true);
    };

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
    <main className="w-full max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-blue-600 drop-shadow-lg">
        📝 My ToDo Task Manager
        </h1>
        <EnhancedTodoList onShareTodo={handleShareTodo} />

        {selectedTodo && (
        <ShareTodoModal
            todo={selectedTodo}
            isOpen={shareModalOpen}
            onClose={() => setShareModalOpen(false)}
        />
        )}
    </main>
    </div>
    );
}