import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from '../TodoList';
import { useSession } from 'next-auth/react';

// Mock fetch API
global.fetch = jest.fn();

// Sample todos data for testing
const mockTodos = [
  {
    id: 1,
    activity: 'Complete project',
    completed: false,
    dueDate: '2023-12-31T00:00:00.000Z',
    priority: 'HIGH',
    categoryId: 1,
    category: { id: 1, name: 'Work', color: '#ff0000' }
  },
  {
    id: 2,
    activity: 'Go shopping',
    completed: true,
    dueDate: null,
    priority: 'MEDIUM',
    categoryId: 2,
    category: { id: 2, name: 'Personal', color: '#00ff00' }
  }
];

describe('TodoList Component', () => {
  beforeEach(() => {
    // Reset mocks
    fetch.mockClear();
    
    // Mock successful fetch for getTodos
    fetch.mockImplementation((url) => {
      if (url === '/api/todos') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTodos)
        });
      }
      
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      });
    });
  });

  test('renders loading state initially', async () => {
    render(<TodoList />);
    
    // No todos should be visible initially
    expect(screen.queryByText('Complete project')).not.toBeInTheDocument();
  });

  test('renders todos after loading', async () => {
    render(<TodoList />);
    
    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Complete project')).toBeInTheDocument();
      expect(screen.getByText('Go shopping')).toBeInTheDocument();
    });
  });

  test('adds a new todo', async () => {
    // Mock successful POST request
    fetch.mockImplementation((url, options) => {
      if (url === '/api/todos' && options.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            id: 3,
            activity: 'New todo',
            completed: false,
            dueDate: null,
            priority: 'MEDIUM',
            categoryId: null,
            category: null
          })
        });
      }
      
      if (url === '/api/todos') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTodos)
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

  test('toggles todo completion status', async () => {
    // Mock successful PUT request for toggling
    fetch.mockImplementation((url, options) => {
      if (url === '/api/todos/1' && options.method === 'PUT') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            ...mockTodos[0],
            completed: true
          })
        });
      }
      
      if (url === '/api/todos') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTodos)
        });
      }
      
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      });
    });

    render(<TodoList />);
    
    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Complete project')).toBeInTheDocument();
    });
    
    // Find the checkbox for the first todo
    const checkboxes = screen.getAllByRole('checkbox');
    const firstTodoCheckbox = checkboxes[0]; // Assuming first todo is unchecked
    
    // Toggle the checkbox
    fireEvent.click(firstTodoCheckbox);
    
    // Verify the PUT request was made
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/todos/1', expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ completed: true })
      }));
    });
  });

  test('deletes a todo', async () => {
    // Mock successful DELETE request
    fetch.mockImplementation((url, options) => {
      if (url === '/api/todos/1' && options.method === 'DELETE') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'Todo deleted successfully' })
        });
      }
      
      if (url === '/api/todos') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTodos)
        });
      }
      
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      });
    });

    render(<TodoList />);
    
    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Complete project')).toBeInTheDocument();
    });
    
    // Find the delete buttons
    const deleteButtons = screen.getAllByText('Delete');
    const firstTodoDeleteButton = deleteButtons[0];
    
    // Click the delete button
    fireEvent.click(firstTodoDeleteButton);
    
    // Verify the DELETE request was made
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/todos/1', expect.objectContaining({
        method: 'DELETE'
      }));
    });
  });

  test('handles API errors gracefully', async () => {
    // Mock failed fetch
    console.error = jest.fn(); // Suppress console errors
    fetch.mockImplementationOnce(() => 
      Promise.reject(new Error('Network error'))
    );

    render(<TodoList />);
    
    // Verify error handling (should not crash)
    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
    
    // Should show empty state message when fetch fails
    expect(screen.getByText(/Your task list is empty/i)).toBeInTheDocument();
  });
});