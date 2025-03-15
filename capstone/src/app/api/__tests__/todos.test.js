import { NextResponse } from 'next/server';
import { GET, POST } from '../../api/todos/route';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { auth } from "@/lib/auth";

// Mock dependencies
jest.mock('@/lib/prisma', () => ({
  prisma: {
    todo: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({ data, options })),
  },
}));

describe('Todos API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/todos', () => {
    it('returns 401 if not authenticated', async () => {
      // Mock unauthenticated session
      getServerSession.mockResolvedValueOnce(null);

      await GET();

      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    });

    it('returns todos for authenticated user', async () => {
      // Mock authenticated session
      getServerSession.mockResolvedValueOnce({
        user: { id: 'user-123' },
      });

      // Mock prisma response
      const mockTodos = [
        { id: 1, activity: 'Test Todo', userId: 'user-123' },
      ];
      prisma.todo.findMany.mockResolvedValueOnce(mockTodos);

      await GET();

      // Verify prisma was called with correct parameters
      expect(prisma.todo.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      });

      // Verify correct response
      expect(NextResponse.json).toHaveBeenCalledWith(mockTodos);
    });

    it('handles errors gracefully', async () => {
      // Mock authenticated session
      getServerSession.mockResolvedValueOnce({
        user: { id: 'user-123' },
      });

      // Mock prisma error
      prisma.todo.findMany.mockRejectedValueOnce(new Error('Database error'));

      await GET();

      // Verify error response
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Failed to fetch todos' },
        { status: 500 }
      );
    });
  });

  describe('POST /api/todos', () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        activity: 'New Todo',
        dueDate: '2023-12-31T00:00:00.000Z',
        priority: 'HIGH',
        categoryId: '1',
      }),
    };

    it('returns 401 if not authenticated', async () => {
      // Mock unauthenticated session
      getServerSession.mockResolvedValueOnce(null);

      await POST(mockRequest);

      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    });

    it('creates a new todo for authenticated user', async () => {
      // Mock authenticated session
      getServerSession.mockResolvedValueOnce({
        user: { id: 'user-123' },
      });

      // Mock prisma response
      const mockCreatedTodo = {
        id: 1,
        activity: 'New Todo',
        dueDate: new Date('2023-12-31T00:00:00.000Z'),
        priority: 'HIGH',
        categoryId: 1,
        userId: 'user-123',
      };
      prisma.todo.create.mockResolvedValueOnce(mockCreatedTodo);

      await POST(mockRequest);

      // Verify prisma was called with correct parameters
      expect(prisma.todo.create).toHaveBeenCalledWith({
        data: {
          activity: 'New Todo',
          dueDate: expect.any(Date),
          priority: 'HIGH',
          categoryId: 1,
          user: {
            connect: {
              id: 'user-123',
            },
          },
        },
        include: {
          category: true,
        },
      });

      // Verify correct response
      expect(NextResponse.json).toHaveBeenCalledWith(mockCreatedTodo, { status: 201 });
    });

    it('handles errors gracefully', async () => {
      // Mock authenticated session
      getServerSession.mockResolvedValueOnce({
        user: { id: 'user-123' },
      });

      // Mock prisma error
      prisma.todo.create.mockRejectedValueOnce(new Error('Database error'));

      await POST(mockRequest);

      // Verify error response
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Failed to create todo' },
        { status: 500 }
      );
    });
  });
});