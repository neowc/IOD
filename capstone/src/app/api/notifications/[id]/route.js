import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { auth } from "@/lib/auth";

// Mark notification as read
export async function PUT(request, { params }) {
    try {
        // const session = await getServerSession(authOptions);
        const session = await auth();

        if (!session) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
        }

        const { id } = params;
        const { read } = await request.json();

        // Check if the notification exists and belongs to the user
        const notification = await prisma.notification.findUnique({
        where: {
            id: Number(id),
        },
        });

        if (!notification) {
        return NextResponse.json(
            { error: 'Notification not found' },
            { status: 404 }
        );
        }

        if (notification.userId !== session.user.id) {
        return NextResponse.json(
            { error: 'Access denied' },
            { status: 403 }
        );
        }

        // Update the notification
        const updatedNotification = await prisma.notification.update({
        where: {
            id: Number(id),
        },
        data: {
            read,
        },
        });

        return NextResponse.json(updatedNotification);
    } catch (error) {
        console.error('Error updating notification:', error);
        return NextResponse.json(
        { error: 'Failed to update notification' },
        { status: 500 }
        );
    }
    }

    // Delete notification
    export async function DELETE(request, { params }) {
    try {
        // const session = await getServerSession(authOptions);
        const session = await auth();

        if (!session) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
        }

        const { id } = params;

        // Check if the notification exists and belongs to the user
        const notification = await prisma.notification.findUnique({
        where: {
            id: Number(id),
        },
        });

        if (!notification) {
        return NextResponse.json(
            { error: 'Notification not found' },
            { status: 404 }
        );
        }

        if (notification.userId !== session.user.id) {
        return NextResponse.json(
            { error: 'Access denied' },
            { status: 403 }
        );
        }

        // Delete the notification
        await prisma.notification.delete({
        where: {
            id: Number(id),
        },
        });

        return NextResponse.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        return NextResponse.json(
        { error: 'Failed to delete notification' },
        { status: 500 }
        );
    }
}