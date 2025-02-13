import TodoList from '@/components/TodoList'

export default function Home() {
    return (
        <main className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl font-bold mb-12 text-center text-blue drop-shadow-lg">
                📝 My ToDo Task Manager
            </h1>
            <TodoList />
            </div>
        </main>
    )
}