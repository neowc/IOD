
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const todos = await prisma.todo.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        })
        return NextResponse.json(todos)
    } catch (error) {
        return NextResponse.json(
        { error: 'Failed to fetch todos' },
        { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        const { activity, dueDate } = await request.json()
        const todo = await prisma.todo.create({
        data: {
            activity,
            dueDate: dueDate ? new Date(dueDate) : null,
        },
        })
        return NextResponse.json(todo, { status: 201 })
    } catch (error) {
        return NextResponse.json(
        { error: 'Failed to create todo' },
        { status: 500 }
        )
    }
}