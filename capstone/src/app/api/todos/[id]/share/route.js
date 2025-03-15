import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { auth } from "@/lib/auth";


// Share a todo with another user
export async function POST(request, { params }) {
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
        const { email, permission } = await request.json();

        if (!email) {
        return NextResponse.json(
            { error: 'Email is required' },
            { status: 400 }
        );
        }

        // Validate permission
        const validPermissions = ['VIEW', 'EDIT', 'ADMIN'];
        if (!validPermissions.includes(permission)) {
        return NextResponse.json(
            { error: 'Invalid permission' },
            { status: 400 }
        );
        }

        // Check if todo exists and belongs to the user
        const todo = await prisma.todo.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            user: true,
        },
        });

        if (!todo) {
        return NextResponse.json(
            { error: 'Todo not found' },
            { status: 404 }
        );
        }

        if (todo.userId !== session.user.id) {
        return NextResponse.json(
            { error: 'You can only share your own todos' },
            { status: 403 }
        );
        }

        // Find the user to share with
        const userToShareWith = await prisma.user.findUnique({
        where: {
            email,
        },
        });

        if (!userToShareWith) {
        return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
        );
        }

        if (userToShareWith.id === session.user.id) {
        return NextResponse.json(
            { error: 'You cannot share a todo with yourself' },
            { status: 400 }
        );
        }

        // Check if todo is already shared with the user
        const existingShare = await prisma.sharedTodo.findUnique({
        where: {
            todoId_userId: {
            todoId: Number(id),
            userId: userToShareWith.id,
            },
        },
        });

        if (existingShare) {
        // Update permission if already shared
        const updatedShare = await prisma.sharedTodo.update({
            where: {
            todoId_userId: {
                todoId: Number(id),
                userId: userToShareWith.id,
            },
            },
            data: {
            permission,
            },
        });

        // Create notification for permission update
        await prisma.notification.create({
            data: {
            message: `${session.user.name || session.user.email} updated your permission to "${permission}" for task: ${todo.activity}`,
            userId: userToShareWith.id,
            todoId: Number(id),
            },
        });

        return NextResponse.json(updatedShare);
        }

        // Share the todo
        const sharedTodo = await prisma.sharedTodo.create({
        data: {
            todoId: Number(id),
            userId: userToShareWith.id,
            permission,
        },
        });

        // Create notification for the shared user
        await prisma.notification.create({
        data: {
            message: `${session.user.name || session.user.email} shared a task with you: ${todo.activity}`,
            userId: userToShareWith.id,
            todoId: Number(id),
        },
        });

        return NextResponse.json(sharedTodo, { status: 201 });
    } catch (error) {
        console.error('Error sharing todo:', error);
        return NextResponse.json(
        { error: 'Failed to share todo' },
        { status: 500 }
        );
    }
    }

    // Get users who have access to a todo
    export async function GET(request, { params }) {
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

        // Check if todo exists and user has access to it
        const todo = await prisma.todo.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            user: {
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
            },
            },
            sharedWith: {
            include: {
                user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
                },
            },
            },
        },
        });

        if (!todo) {
        return NextResponse.json(
            { error: 'Todo not found' },
            { status: 404 }
        );
        }

        // Check if user is owner or the todo is shared with them
        const isOwner = todo.userId === session.user.id;
        const isSharedWithUser = todo.sharedWith.some(share => share.userId === session.user.id);

        if (!isOwner && !isSharedWithUser) {
        return NextResponse.json(
            { error: 'Access denied' },
            { status: 403 }
        );
        }

        // Return owner and shared users
        const owner = {
        ...todo.user,
        permission: 'OWNER',
        };

        const sharedUsers = todo.sharedWith.map(share => ({
        ...share.user,
        permission: share.permission,
        }));

        return NextResponse.json({
        owner,
        sharedUsers,
        });
    } catch (error) {
        console.error('Error getting shared users:', error);
        return NextResponse.json(
        { error: 'Failed to get shared users' },
        { status: 500 }
        );
    }
    }

    // Remove a user's access to a todo
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
        const { userId } = await request.json();

        if (!userId) {
        return NextResponse.json(
            { error: 'User ID is required' },
            { status: 400 }
        );
        }

        // Check if todo exists and belongs to the user
        const todo = await prisma.todo.findUnique({
        where: {
            id: Number(id),
        },
        });

        if (!todo) {
        return NextResponse.json(
            { error: 'Todo not found' },
            { status: 404 }
        );
        }

        if (todo.userId !== session.user.id) {
        return NextResponse.json(
            { error: 'Only the todo owner can remove shared access' },
            { status: 403 }
        );
        }

        // Remove shared access
        await prisma.sharedTodo.delete({
        where: {
            todoId_userId: {
            todoId: Number(id),
            userId,
            },
        },
        });

        // Get user details for notification
        const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            name: true,
            email: true,
        },
        });

        // Create notification for the removed user
        await prisma.notification.create({
        data: {
            message: `${session.user.name || session.user.email} removed your access to the task: ${todo.activity}`,
            userId,
            todoId: Number(id),
        },
        });

        return NextResponse.json({ message: 'Access removed successfully' });
    } catch (error) {
        console.error('Error removing shared access:', error);
        return NextResponse.json(
        { error: 'Failed to remove shared access' },
        { status: 500 }
        );
    }
}