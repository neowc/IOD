import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { auth } from "@/lib/auth";

// Get all notifications for authenticated user
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

        const notifications = await prisma.notification.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        });

        return NextResponse.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json(
        { error: 'Failed to fetch notifications' },
        { status: 500 }
        );
    }
    }

    // Create a new notification (internal API use only)
    export async function POST(request) {
    try {
        const { userId, message, todoId } = await request.json();

        // Check if API key is provided (you can implement stronger authentication)
        const apiKey = request.headers.get('x-api-key');
        if (apiKey !== process.env.INTERNAL_API_KEY) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
        }

        const notification = await prisma.notification.create({
        data: {
            message,
            todoId,
            userId,
        },
        });

        return NextResponse.json(notification, { status: 201 });
    } catch (error) {
        console.error('Error creating notification:', error);
        return NextResponse.json(
        { error: 'Failed to create notification' },
        { status: 500 }
        );
    }
}