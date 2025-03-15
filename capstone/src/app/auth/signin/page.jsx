import SignInForm from '@/components/auth/SignInForm';

export const metadata = {
    title: 'Sign In - Todo App',
    description: 'Sign in to your Todo App account',
};

    export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">📝 Todo App</h1>
            <p className="text-lg text-gray-600">Welcome back! Sign in to continue.</p>
            </div>
            <SignInForm />
        </div>
        </div>
    );
}