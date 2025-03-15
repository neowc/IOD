// run this code once to create a test user
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createTestUser() {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash('password123', 10);

        // Create user (or update if email already exists)
        const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {}, // Don't update if exists
        create: {
            email: 'test@example.com',
            name: 'Test User',
            password: hashedPassword,
        },
        });

        console.log('Test user created successfully:');
        console.log({
        id: user.id,
        name: user.name,
        email: user.email
        });
    } catch (error) {
        console.error('Error creating test user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createTestUser();

