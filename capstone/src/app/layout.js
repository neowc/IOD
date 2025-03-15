import './globals.css';
import AuthProvider from '@/providers/AuthProvider';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
    title: 'Todo App',
    description: 'Next.js Todo Application with MySQL',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
            <AuthProvider>
            <Navbar />
            {children}
            </AuthProvider>
        </body>
        </html>
    );
}