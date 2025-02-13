import './globals.css'

export const metadata = {
    title: 'Todo App',
    description: 'Next.js Todo Application with MySQL',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}