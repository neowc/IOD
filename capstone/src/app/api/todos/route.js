import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { auth } from "@/lib/auth";


// Get all todos for authenticated user
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

        const todos = await prisma.todo.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            category: true,
        },
        });

        return NextResponse.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        return NextResponse.json(
        { error: 'Failed to fetch todos' },
        { status: 500 }
        );
    }
}

// Create a new todo for authenticated user
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

        const { activity, dueDate, priority, categoryId } = await request.json();

        const todo = await prisma.todo.create({
        data: {
            activity,
            dueDate: dueDate ? new Date(dueDate) : null,
            priority: priority || 'MEDIUM',
            categoryId: categoryId ? parseInt(categoryId) : null,
            user: {
            connect: {
                id: session.user.id,
            },
            },
        },
        include: {
            category: true,
        },
        });

        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        console.error('Error creating todo:', error);
        return NextResponse.json(
        { error: 'Failed to create todo' },
        { status: 500 }
        );
    }
}