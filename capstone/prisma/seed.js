// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');
  
  // Clear existing data (optional - comment this out if you want to keep existing data)
  console.log('Clearing existing data...');
  await prisma.notification.deleteMany({});
  await prisma.sharedTodo.deleteMany({});
  await prisma.todo.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.verificationToken.deleteMany({});

  // Create a demo user with password
  console.log('Creating demo user...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const demoUser = await prisma.user.create({
    data: {
      id: crypto.randomUUID(), // Generate a UUID for the user
      name: 'Demo User',
      email: 'demo@example.com',
      password: hashedPassword,
    },
  });
  
  console.log(`Created demo user: ${demoUser.email} (ID: ${demoUser.id})`);
  
  // Create a second user for shared todos
  const secondUser = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: 'Colleague',
      email: 'colleague@example.com',
      password: hashedPassword,
    },
  });
  
  console.log(`Created second user: ${secondUser.email} (ID: ${secondUser.id})`);

  // Create categories
  console.log('Creating categories...');
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Personal',
        color: '#3B82F6', // Blue
        userId: demoUser.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Work',
        color: '#EF4444', // Red
        userId: demoUser.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Study',
        color: '#10B981', // Green
        userId: demoUser.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Health',
        color: '#8B5CF6', // Purple
        userId: demoUser.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Shopping',
        color: '#F59E0B', // Amber
        userId: demoUser.id,
      },
    }),
  ]);
  
  console.log(`Created ${categories.length} categories`);

  // Get date references for todos
  const today = new Date();
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  // Create todos with varying priorities, categories, and completion statuses
  console.log('Creating todo items...');
  const todos = await Promise.all([
    // Personal todos
    prisma.todo.create({
      data: {
        activity: 'Buy groceries',
        dueDate: tomorrow,
        completed: false,
        priority: 'MEDIUM',
        userId: demoUser.id,
        categoryId: categories[0].id,
      },
    }),
    prisma.todo.create({
      data: {
        activity: 'Pay rent',
        dueDate: yesterday,
        completed: true,
        priority: 'HIGH',
        userId: demoUser.id,
        categoryId: categories[0].id,
      },
    }),
    prisma.todo.create({
      data: {
        activity: 'Call Mom',
        dueDate: today,
        completed: false,
        priority: 'LOW',
        userId: demoUser.id,
        categoryId: categories[0].id,
      },
    }),
    
    // Work todos
    prisma.todo.create({
      data: {
        activity: 'Finish quarterly report',
        dueDate: tomorrow,
        completed: false,
        priority: 'URGENT',
        userId: demoUser.id,
        categoryId: categories[1].id,
      },
    }),
    prisma.todo.create({
      data: {
        activity: 'Schedule team meeting',
        dueDate: today,
        completed: true,
        priority: 'MEDIUM',
        userId: demoUser.id,
        categoryId: categories[1].id,
      },
    }),
    prisma.todo.create({
      data: {
        activity: 'Review project proposal',
        dueDate: nextWeek,
        completed: false,
        priority: 'HIGH',
        userId: demoUser.id,
        categoryId: categories[1].id,
      },
    }),
    
    // Study todos
    prisma.todo.create({
      data: {
        activity: 'Complete React course',
        dueDate: nextWeek,
        completed: false,
        priority: 'MEDIUM',
        userId: demoUser.id,
        categoryId: categories[2].id,
      },
    }),
    prisma.todo.create({
      data: {
        activity: 'Study for JavaScript certification',
        dueDate: yesterday,
        completed: false,
        priority: 'HIGH',
        userId: demoUser.id,
        categoryId: categories[2].id,
      },
    }),
    
    // Health todos
    prisma.todo.create({
      data: {
        activity: 'Morning jog',
        dueDate: today,
        completed: true,
        priority: 'LOW',
        userId: demoUser.id,
        categoryId: categories[3].id,
      },
    }),
    prisma.todo.create({
      data: {
        activity: 'Doctor appointment',
        dueDate: nextWeek,
        completed: false,
        priority: 'HIGH',
        userId: demoUser.id,
        categoryId: categories[3].id,
      },
    }),
    
    // Shopping todos
    prisma.todo.create({
      data: {
        activity: 'Buy birthday gift',
        dueDate: tomorrow,
        completed: false,
        priority: 'MEDIUM',
        userId: demoUser.id,
        categoryId: categories[4].id,
      },
    }),
    prisma.todo.create({
      data: {
        activity: 'Order new headphones',
        dueDate: null, // No specific date
        completed: false,
        priority: 'LOW',
        userId: demoUser.id,
        categoryId: categories[4].id,
      },
    }),
  ]);

  console.log(`Created ${todos.length} todo items`);
  
  // Create shared todos
  console.log('Creating shared todos...');
  const sharedTodos = await Promise.all([
    prisma.sharedTodo.create({
      data: {
        todoId: todos[3].id, // Share the work task: Finish quarterly report
        userId: secondUser.id,
        permission: 'EDIT',
      },
    }),
    prisma.sharedTodo.create({
      data: {
        todoId: todos[5].id, // Share the work task: Review project proposal
        userId: secondUser.id,
        permission: 'VIEW',
      },
    }),
  ]);
  
  console.log(`Created ${sharedTodos.length} shared todos`);

  // Create notifications
  console.log('Creating notifications...');
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        message: 'Task "Finish quarterly report" is due tomorrow!',
        read: false,
        userId: demoUser.id,
        todoId: todos[3].id,
      },
    }),
    prisma.notification.create({
      data: {
        message: 'Colleague has viewed "Review project proposal"',
        read: true,
        userId: demoUser.id,
        todoId: todos[5].id,
      },
    }),
    prisma.notification.create({
      data: {
        message: 'Your task "Study for JavaScript certification" is overdue',
        read: false,
        userId: demoUser.id,
        todoId: todos[7].id,
      },
    }),
    prisma.notification.create({
      data: {
        message: 'Welcome to the Todo App! Create your first task.',
        read: true,
        userId: demoUser.id,
      },
    }),
  ]);
  
  console.log(`Created ${notifications.length} notifications`);
  
  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });