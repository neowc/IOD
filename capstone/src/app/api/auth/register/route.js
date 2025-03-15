import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        // Validate input
        if (!name || !email || !password) {
        return NextResponse.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
        where: { email }
        });

        if (existingUser) {
        return NextResponse.json(
            { message: 'User with this email already exists' },
            { status: 409 }
        );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        });

        // Create default categories for the new user
        const defaultCategories = [
            { name: 'Work', color: '#EF4444' },        // Red
            { name: 'Personal', color: '#3B82F6' },    // Blue
            { name: 'Health', color: '#10B981' },      // Green
            { name: 'Shopping', color: '#F59E0B' },    // Amber
            { name: 'Education', color: '#8B5CF6' }    // Purple
        ];

        await Promise.all(
            defaultCategories.map(category => 
                prisma.category.create({
                    data: {
                    ...category,
                    userId: user.id,
                    },
                })
                )
            );

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(
        {
            message: 'User registered successfully',
            user: userWithoutPassword
        },
        { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 500 }
        );
    }
}