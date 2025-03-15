import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { auth } from "@/lib/auth";


// Helper function to verify todo ownership
async function verifyTodoOwnership(todoId, userId) {
    const todo = await prisma.todo.findUnique({
        where: { id: Number(todoId) },
        select: { userId: true, sharedWith: { where: { userId } } },
    });

    if (!todo) {
        return false;
    }

    // Check if user owns the todo or it's shared with them
    return todo.userId === userId || todo.sharedWith.length > 0;
}

export async function GET(request, { params }) {
    try {
        // const session = await getServerSession(authOptions);
        const session = await auth();

        if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
        }

        const { id } = params;
        const hasAccess = await verifyTodoOwnership(id, session.user.id);

        if (!hasAccess) {
        return NextResponse.json(
            { error: "Access denied" },
            { status: 403 }
        );
        }

        const todo = await prisma.todo.findUnique({
        where: { id: Number(id) },
        include: { category: true },
        });

        if (!todo) {
        return NextResponse.json(
            { error: "Todo not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(todo);
    } catch (error) {
        console.error("Error getting todo:", error);
        return NextResponse.json(
        { error: "Failed to get todo" },
        { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        // const session = await getServerSession(authOptions);
        const session = await auth();

        if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
        }

        const { id } = params;
        const hasAccess = await verifyTodoOwnership(id, session.user.id);

        if (!hasAccess) {
        return NextResponse.json(
            { error: "Access denied" },
            { status: 403 }
        );
        }

        const updates = await request.json();

        // Format date if present
        if (updates.dueDate) {
        updates.dueDate = new Date(updates.dueDate);
        }

        const todo = await prisma.todo.update({
        where: { id: Number(id) },
        data: updates,
        include: { category: true },
        });

        return NextResponse.json(todo);
    } catch (error) {
        console.error("Error updating todo:", error);
        return NextResponse.json(
        { error: "Failed to update todo" },
        { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        // const session = await getServerSession(authOptions);
        const session = await auth();

        if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
        }

        const { id } = params;

        // Check if the todo belongs to the user
        const todo = await prisma.todo.findUnique({
        where: { id: Number(id) },
        select: { userId: true },
        });

        if (!todo) {
        return NextResponse.json(
            { error: "Todo not found" },
            { status: 404 }
        );
        }

        // Only allow deletion by the owner (not shared users)
        if (todo.userId !== session.user.id) {
        return NextResponse.json(
            { error: "Only the owner can delete this todo" },
            { status: 403 }
        );
        }

        await prisma.todo.delete({
        where: { id: Number(id) },
        });

        return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        return NextResponse.json(
        { error: "Failed to delete todo" },
        { status: 500 }
        );
    }
}