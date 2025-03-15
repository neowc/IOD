# Testing Guide

This document provides comprehensive guidance on testing the Todo Application, including setup, running tests, and best practices for writing new tests.

## Overview

The Todo Application uses Jest as the primary testing framework, along with React Testing Library for testing React components and Mock Service Worker (MSW) for API mocking.

The testing strategy follows a pyramid approach:
1. **Unit Tests**: Testing individual components and functions
2. **Integration Tests**: Testing interactions between components
3. **API Tests**: Testing API endpoints
4. **End-to-End Tests**: Testing complete user flows

## Testing Setup

The testing environment is configured in the following files:

- `jest.config.js`: Jest configuration
- `jest.setup.js`: Testing setup and global mocks
- `.env.test`: Environment variables for testing

## Running Tests

### Running All Tests

```bash
npm test
# or
yarn test
```

### Running Tests with Coverage

```bash
npm test:coverage
# or
yarn test:coverage
```

### Running Tests in Watch Mode

```bash
npm test:watch
# or
yarn test:watch
```

### Running a Specific Test File

```bash
npm test -- path/to/test-file.test.js
# or
yarn test path/to/test-file.test.js
```

## Writing Tests

### Directory Structure

Tests should be placed in the following locations:

- Component tests: `src/components/__tests__/`
- API tests: `src/app/api/__tests__/`
- Utility tests: `src/lib/__tests__/`

### Naming Conventions

- **Test files**: Named as `ComponentName.test.jsx` or `functionName.test.js`
- **Test suites**: Descriptive of the component or function being tested
- **Test cases**: Follow the "it should..." or "should..." pattern

### Test Examples

#### Component Test Example

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../TodoItem';

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 1,
    activity: 'Test Todo',
    completed: false,
    dueDate: '2023-12-31T00:00:00.000Z',
  };

  const mockToggle = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    
    const formattedDate = new Date(mockTodo.dueDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('calls onToggle when checkbox is clicked', () => {
    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(mockTodo.id);
  });
});
```

#### API Test Example

```javascript
import { NextResponse } from 'next/server';
import { GET, POST } from '../../api/todos/route';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';

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
      getServerSession.mockResolvedValueOnce(null);

      await GET();

      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    });

    it('returns todos for authenticated user', async () => {
      getServerSession.mockResolvedValueOnce({
        user: { id: 'user-123' },
      });

      const mockTodos = [
        { id: 1, activity: 'Test Todo', userId: 'user-123' },
      ];
      prisma.todo.findMany.mockResolvedValueOnce(mockTodos);

      await GET();

      expect(prisma.todo.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      });

      expect(NextResponse.json).toHaveBeenCalledWith(mockTodos);
    });
  });
});
```

#### Integration Test Example

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from '../TodoList';
import { useSession } from 'next-auth/react';

// Mock fetch API
global.fetch = jest.fn();

describe('TodoList Integration', () => {
  beforeEach(() => {
    fetch.mockClear();
    
    // Mock successful fetch for getTodos
    fetch.mockImplementation((url) => {
      if (url === '/api/todos') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            {
              id: 1,
              activity: 'Complete project',
              completed: false,
              dueDate: '2023-12-31T00:00:00.000Z',
            }
          ])
        });
      }
      
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      });
    });
  });

  test('loads and displays todos', async () => {
    render(<TodoList />);
    
    // Verify loading state
    expect(screen.queryByText('Complete project')).not.toBeInTheDocument();
    
    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Complete project')).toBeInTheDocument();
    });
  });

  test('adds a new todo', async () => {
    // Mock successful POST request
    fetch.mockImplementation((url, options) => {
      if (url === '/api/todos' && options.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            id: 2,
            activity: 'New todo',
            completed: false,
          })
        });
      }
      
      if (url === '/api/todos') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            {
              id: 1,
              activity: 'Complete project',
              completed: false,
              dueDate: '2023-12-31T00:00:00.000Z',
            }
          ])
        });
      }
      
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      });
    });

    render(<TodoList />);
    
    // Wait for initial todos to load
    await waitFor(() => {
      expect(screen.getByText('Complete project')).toBeInTheDocument();
    });
    
    // Find the input field and add button
    const inputField = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add Task');
    
    // Type in a new todo and submit
    fireEvent.change(inputField, { target: { value: 'New todo' } });
    fireEvent.click(addButton);
    
    // Verify the POST request was made
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/todos', expect.objectContaining({
        method: 'POST',
        body: expect.any(String)
      }));
    });
  });
});
```

## Mocking

### Mocking Next.js Features

In `jest.setup.js`, we mock various Next.js features:

```javascript
// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  usePathname() {
    return '/mock-path';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  useParams() {
    return { id: '1' };
  },
}));
```

### Mocking NextAuth.js

```javascript
// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  __esModule: true,
  signIn: jest.fn(() => Promise.resolve({ ok: true })),
  signOut: jest.fn(() => Promise.resolve(true)),
  useSession: jest.fn(() => ({
    data: {
      user: { id: 'mock-user-id', name: 'Test User', email: 'test@example.com' },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    status: 'authenticated',
  })),
  getServerSession: jest.fn(() => ({
    user: { id: 'mock-user-id', name: 'Test User', email: 'test@example.com' },
  })),
}));
```

### Mocking Fetch API

```javascript
// Mock fetch API
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
  
  fetch.mockImplementation((url, options) => {
    // Mock specific API endpoints
    if (url === '/api/todos') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          // Mock todo data
        ])
      });
    }
    
    // Default response
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({})
    });
  });
});
```

### Using Mock Service Worker (MSW)

For more complex API testing scenarios, use MSW:

```javascript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Setup request handlers
const handlers = [
  rest.get('/api/todos', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          activity: 'Test Todo',
          completed: false,
        }
      ])
    );
  }),
  
  rest.post('/api/todos', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 2,
        activity: 'New Todo',
        completed: false,
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Testing Auth-Protected Components

When testing components that require authentication:

```javascript
import { useSession } from 'next-auth/react';

// Mock authenticated session
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('Auth-Protected Component', () => {
  it('renders when authenticated', () => {
    // Mock authenticated session
    useSession.mockReturnValue({
      data: {
        user: { id: 'user-123', name: 'Test User' },
        expires: '2100-01-01T00:00:00.000Z',
      },
      status: 'authenticated',
    });
    
    render(<ProtectedComponent />);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
  
  it('redirects when not authenticated', () => {
    // Mock unauthenticated session
    useSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });
    
    const mockRouter = { push: jest.fn() };
    
    jest.mock('next/navigation', () => ({
      useRouter: () => mockRouter,
    }));
    
    render(<ProtectedComponent />);
    expect(mockRouter.push).toHaveBeenCalledWith('/auth/signin');
  });
});
```

## Testing Database Operations

For testing database operations, we use an in-memory database or mock the Prisma client:

```javascript
// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    todo: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    // Mock other models as needed
  },
}));

// In your test
import { prisma } from '@/lib/prisma';

describe('Todo API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('creates a todo', async () => {
    // Mock Prisma response
    prisma.todo.create.mockResolvedValue({
      id: 1,
      activity: 'Test Todo',
      completed: false,
      userId: 'user-123',
    });
    
    // Test your function that uses Prisma
    // ...
    
    expect(prisma.todo.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        activity: 'Test Todo',
        userId: 'user-123',
      }),
    });
  });
});
```

## Testing Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it's implemented.
2. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification phases.
3. **Use Descriptive Test Names**: Make test names clear and descriptive of what they're testing.
4. **Isolate Tests**: Each test should be independent and not rely on other tests.
5. **Mock External Dependencies**: Use mocks for API calls, third-party services, etc.
6. **Test Edge Cases**: Include tests for error states, empty states, and boundary conditions.
7. **Keep Tests Fast**: Optimize tests to run quickly for better development experience.
8. **Maintain Coverage**: Aim for high test coverage, especially for critical functionality.

## Code Coverage

The project aims for a minimum of 70% code coverage. Coverage reports are generated when running:

```bash
npm test:coverage
# or
yarn test:coverage
```

The coverage report includes:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

## Continuous Integration

Tests are automatically run in the CI/CD pipeline on:
- Pull requests
- Pushes to the main branch

The pipeline will fail if:
- Tests fail
- Coverage falls below the threshold

## Troubleshooting Common Testing Issues

### Test Environment Issues

If you encounter issues with the test environment:

1. Make sure Jest is configured correctly
2. Check that all required mocks are in place
3. Verify that environment variables are set correctly in `.env.test`

### Component Testing Issues

When testing components:

1. Ensure you're using the correct queries from React Testing Library
2. Check that all required providers (auth, context, etc.) are included
3. Verify that async operations are properly awaited

### API Testing Issues

For API tests:

1. Make sure all dependencies are correctly mocked
2. Check that the request/response format matches your expectations
3. Verify that authentication is properly mocked

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Mock Service Worker](https://mswjs.io/docs/)
- [NextAuth.js Testing](https://next-auth.js.org/guides/testing)
