import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { auth } from "@/lib/auth";

// Update user profile
export async function PUT(request) {
    try {
        // const session = await getServerSession(authOptions);
        const session = await auth();

        if (!session) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
        }

        const { name } = await request.json();

        // Update user in database
        const updatedUser = await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            name,
        },
        });

        // Remove password from response
        const { password, ...userWithoutPassword } = updatedUser;

        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
        );
    }
    }

    // Get user profile
    export async function GET() {
    try {
        // const session = await getServerSession(authOptions);
        const session = await auth();

        if (!session) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
        }

        const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            emailVerified: true,
        },
        });

        if (!user) {
        return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
        );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json(
        { error: 'Failed to fetch profile' },
        { status: 500 }
        );
    }
}