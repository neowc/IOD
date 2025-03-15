'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [todos, setTodos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
        router.push('/auth/signin');
        } else if (status === 'authenticated') {
        fetchTodos();
        fetchCategories();
        }
    }, [status, router]);

    const fetchTodos = async () => {
        try {
        setIsLoading(true);
        const response = await fetch('/api/todos');

        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }

        const data = await response.json();
        setTodos(data);
        setError('');
        } catch (error) {
        console.error('Error fetching todos:', error);
        setError('Failed to load todos. Please try again later.');
        } finally {
        setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
        const response = await fetch('/api/categories');

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data);
        } catch (error) {
        console.error('Error fetching categories:', error);
        }
    };

    // Calculate dashboard metrics
    const calculateMetrics = () => {
        const totalTasks = todos.length;
        const completedTasks = todos.filter(todo => todo.completed).length;
        const pendingTasks = totalTasks - completedTasks;

        const overdueTasks = todos.filter(todo => 
        !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
        ).length;

        const dueToday = todos.filter(todo => {
        if (!todo.completed && todo.dueDate) {
            const dueDate = new Date(todo.dueDate);
            const today = new Date();
            return dueDate.toDateString() === today.toDateString();
        }
        return false;
        }).length;

        const urgentTasks = todos.filter(todo => 
        !todo.completed && todo.priority === 'URGENT'
        ).length;

        const completionRate = totalTasks > 0 
        ? Math.round((completedTasks / totalTasks) * 100) 
        : 0;

        // Tasks by priority
        const tasksByPriority = {
        LOW: todos.filter(todo => todo.priority === 'LOW').length,
        MEDIUM: todos.filter(todo => todo.priority === 'MEDIUM').length,
        HIGH: todos.filter(todo => todo.priority === 'HIGH').length,
        URGENT: todos.filter(todo => todo.priority === 'URGENT').length,
        };

        // Tasks by category
        const tasksByCategory = categories.reduce((acc, category) => {
        acc[category.id] = {
            name: category.name,
            color: category.color,
            count: todos.filter(todo => todo.categoryId === category.id).length
        };
        return acc;
        }, {});

        // Add uncategorized
        tasksByCategory.uncategorized = {
        name: 'Uncategorized',
        color: '#94A3B8',
        count: todos.filter(todo => !todo.categoryId).length
        };

        // Tasks by completion per month (last 6 months)
        const tasksByMonth = {};
        const today = new Date();

        for (let i = 5; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthKey = date.toLocaleString('default', { month: 'short', year: '2-digit' });

        tasksByMonth[monthKey] = {
            completed: 0,
            created: 0
        };
        }

        todos.forEach(todo => {
        const createdDate = new Date(todo.createdAt);
        const createdMonthKey = createdDate.toLocaleString('default', { month: 'short', year: '2-digit' });

        if (tasksByMonth[createdMonthKey]) {
            tasksByMonth[createdMonthKey].created += 1;

            if (todo.completed) {
            tasksByMonth[createdMonthKey].completed += 1;
            }
        }
        });

        return {
        totalTasks,
        completedTasks,
        pendingTasks,
        overdueTasks,
        dueToday,
        urgentTasks,
        completionRate,
        tasksByPriority,
        tasksByCategory,
        tasksByMonth
        };
    };

    const metrics = calculateMetrics();

    // Helper function to get color for priority
    const getPriorityColor = (priority) => {
        switch (priority) {
        case 'LOW': return 'bg-green-500';
        case 'MEDIUM': return 'bg-blue-500';
        case 'HIGH': return 'bg-orange-500';
        case 'URGENT': return 'bg-red-500';
        default: return 'bg-gray-500';
        }
    };

    if (status === 'loading' || isLoading) {
        return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="p-6 bg-red-100 text-red-700 rounded-lg">
            <p>{error}</p>
            <button 
            onClick={fetchTodos}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
            Try Again
            </button>
        </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-medium opacity-80">Total Tasks</h3>
            <p className="text-4xl font-bold mt-2">{metrics.totalTasks}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm opacity-80">Completion Rate</span>
                <span className="text-lg font-bold">{metrics.completionRate}%</span>
            </div>
            <div className="mt-2 w-full bg-white/20 rounded-full h-2.5">
                <div 
                className="bg-white h-2.5 rounded-full" 
                style={{ width: `${metrics.completionRate}%` }}
                ></div>
            </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-medium opacity-80">Completed</h3>
            <p className="text-4xl font-bold mt-2">{metrics.completedTasks}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm opacity-80">Pending</span>
                <span className="text-lg font-bold">{metrics.pendingTasks}</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm opacity-80">Productive day!</span>
                <span className="text-xl">🎉</span>
            </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-medium opacity-80">Due Today</h3>
            <p className="text-4xl font-bold mt-2">{metrics.dueToday}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm opacity-80">Urgent Tasks</span>
                <span className="text-lg font-bold">{metrics.urgentTasks}</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm opacity-80">Stay focused!</span>
                <span className="text-xl">💪</span>
            </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-medium opacity-80">Overdue</h3>
            <p className="text-4xl font-bold mt-2">{metrics.overdueTasks}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm opacity-80">Needs Attention</span>
                <span className="text-lg font-bold">{metrics.overdueTasks > 0 ? 'Yes' : 'No'}</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm opacity-80">{metrics.overdueTasks > 0 ? 'Catch up soon!' : 'All caught up!'}</span>
                <span className="text-xl">{metrics.overdueTasks > 0 ? '⚠️' : '✅'}</span>
            </div>
            </div>
        </div>

        {/* Charts and Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Tasks by Priority */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Tasks by Priority</h3>
            {Object.keys(metrics.tasksByPriority).length === 0 ? (
                <p className="text-gray-500 text-center py-8">No data available</p>
            ) : (
                <div className="space-y-4">
                {Object.entries(metrics.tasksByPriority).map(([priority, count]) => (
                    <div key={priority} className="space-y-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority)}`}></div>
                        <span>{priority}</span>
                        </div>
                        <span className="font-medium">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                        className={`${getPriorityColor(priority)} h-2 rounded-full`} 
                        style={{ width: `${metrics.totalTasks > 0 ? (count / metrics.totalTasks) * 100 : 0}%` }}
                        ></div>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>

            {/* Tasks by Category */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Tasks by Category</h3>
            {Object.keys(metrics.tasksByCategory).length === 0 ? (
                <p className="text-gray-500 text-center py-8">No data available</p>
            ) : (
                <div className="space-y-4">
                {Object.values(metrics.tasksByCategory)
                    .sort((a, b) => b.count - a.count) // Sort by count
                    .map((category) => (
                    <div key={category.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                            ></div>
                            <span>{category.name}</span>
                        </div>
                        <span className="font-medium">{category.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="h-2 rounded-full" 
                            style={{ 
                            backgroundColor: category.color,
                            width: `${metrics.totalTasks > 0 ? (category.count / metrics.totalTasks) * 100 : 0}%` 
                            }}
                        ></div>
                        </div>
                    </div>
                    ))
                }
                </div>
            )}
            </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Monthly Task Trends</h3>
            {Object.keys(metrics.tasksByMonth).length === 0 ? (
            <p className="text-gray-500 text-center py-8">No data available</p>
            ) : (
            <div className="h-64">
                <div className="flex justify-between h-full">
                {Object.entries(metrics.tasksByMonth).map(([month, data]) => {
                    const totalHeight = data.created > 0 ? 100 : 0;
                    const completedHeight = data.created > 0 
                    ? (data.completed / data.created) * 100
                    : 0;

                    return (
                    <div key={month} className="flex flex-col justify-end items-center flex-1">
                        <div className="w-full flex flex-col justify-end items-center space-y-2">
                        <div className="text-xs font-medium text-gray-500">
                            {data.completed}/{data.created}
                        </div>
                        <div className="relative w-10 bg-gray-200 rounded-t-lg" style={{ height: `${totalHeight}%` }}>
                            <div 
                            className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg" 
                            style={{ height: `${completedHeight}%` }}
                            ></div>
                        </div>
                        <div className="text-xs font-medium">{month}</div>
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
            )}
            <div className="mt-4 flex justify-center space-x-6">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                <span className="text-sm">Total Created</span>
            </div>
            </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            {todos.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No recent activity</p>
            ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full">
                <thead>
                    <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Activity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {todos
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5)
                    .map((todo) => (
                        <tr key={todo.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-4">{todo.activity}</td>
                        <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {todo.completed ? 'Completed' : 'Pending'}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority).replace('bg-', 'bg-').replace('500', '100')} ${getPriorityColor(todo.priority).replace('bg-', 'text-').replace('500', '800')}`}>
                            {todo.priority}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            {todo.dueDate 
                            ? new Date(todo.dueDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                                })
                            : '-'}
                        </td>
                        </tr>
                    ))
                    }
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
    );
}