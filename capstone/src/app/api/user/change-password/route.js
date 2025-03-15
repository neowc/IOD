import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { auth } from "@/lib/auth";
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        // const session = await getServerSession(authOptions);
        const session = await auth();

        if (!session) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
        }

        const { currentPassword, newPassword } = await request.json();

        // Validate input
        if (!currentPassword || !newPassword) {
        return NextResponse.json(
            { error: 'Current password and new password are required' },
            { status: 400 }
        );
        }

        if (newPassword.length < 8) {
        return NextResponse.json(
            { error: 'New password must be at least 8 characters long' },
            { status: 400 }
        );
        }

        // Get user with password
        const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        });

        if (!user) {
        return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
        );
        }

        // If user was created with OAuth, they don't have a password
        if (!user.password) {
        return NextResponse.json(
            { error: 'Cannot change password for accounts created with social login' },
            { status: 400 }
        );
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
        return NextResponse.json(
            { error: 'Current password is incorrect' },
            { status: 401 }
        );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            password: hashedPassword,
        },
        });

        return NextResponse.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        return NextResponse.json(
        { error: 'Failed to change password' },
        { status: 500 }
        );
    }
}