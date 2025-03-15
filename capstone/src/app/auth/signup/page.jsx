import SignUpForm from '@/components/auth/SignUpForm';

export const metadata = {
    title: 'Sign Up - Todo App',
    description: 'Create a new Todo App account',
};

    export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">📝 Todo App</h1>
            <p className="text-lg text-gray-600">Create your account and start managing tasks</p>
            </div>
            <SignUpForm />
        </div>
        </div>
    );
}