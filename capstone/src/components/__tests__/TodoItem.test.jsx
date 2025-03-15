import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../TodoItem';

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 1,
    activity: 'Test Todo',
    completed: false,
    dueDate: '2023-12-31T00:00:00.000Z',
  };

  const mockTodoWithoutDueDate = {
    id: 2,
    activity: 'Test Todo without due date',
    completed: false,
    dueDate: null,
  };

  const mockCompletedTodo = {
    id: 3,
    activity: 'Completed Todo',
    completed: true,
    dueDate: '2023-12-31T00:00:00.000Z',
  };

  const mockOverdueTodo = {
    id: 4,
    activity: 'Overdue Todo',
    completed: false,
    dueDate: '2020-12-31T00:00:00.000Z', // Past date
  };

  const mockToggle = jest.fn();
  const mockDelete = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    // Check if the content is rendered correctly
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    
    // Format date to match the component's formatting
    const formattedDate = new Date(mockTodo.dueDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    
    // Check checkbox state
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('renders todo without due date correctly', () => {
    render(<TodoItem todo={mockTodoWithoutDueDate} onToggle={mockToggle} onDelete={mockDelete} />);
    
    expect(screen.getByText('Test Todo without due date')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument(); // Default value for empty due date
  });

  test('renders completed todo with strikethrough', () => {
    render(<TodoItem todo={mockCompletedTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const todoText = screen.getByText('Completed Todo');
    expect(todoText).toBeInTheDocument();
    expect(todoText).toHaveClass('line-through');
    
    // Check checkbox state
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('renders overdue todo with warning style', () => {
    render(<TodoItem todo={mockOverdueTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const todoText = screen.getByText('Overdue Todo');
    expect(todoText).toBeInTheDocument();
    expect(todoText).toHaveClass('text-red-600');
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