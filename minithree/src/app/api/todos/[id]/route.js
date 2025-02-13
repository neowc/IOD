import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { completed } = await request.json();

        const todo = await prisma.todo.update({
            where: { id: Number(id) },
            data: { completed },
        });

        return NextResponse.json(todo);

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update todo" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        await prisma.todo.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: "Todo deleted successfully" });

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete todo" },
            { status: 500 }
        );
    }
}
