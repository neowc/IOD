'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryManagement() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', color: '#3B82F6' });
    const [editingCategory, setEditingCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
        setIsLoading(true);
        const response = await fetch('/api/categories');
        
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        setCategories(data);
        setError('');
        } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
        } finally {
        setIsLoading(false);
        }
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        
        if (!newCategory.name.trim()) {
        setError('Category name is required');
        return;
        }

        try {
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to create category');
        }

        const createdCategory = await response.json();
        setCategories([...categories, createdCategory]);
        setNewCategory({ name: '', color: '#3B82F6' });
        setError('');
        } catch (error) {
        console.error('Error creating category:', error);
        setError(error.message);
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        
        if (!editingCategory.name.trim()) {
        setError('Category name is required');
        return;
        }

        try {
        const response = await fetch(`/api/categories/${editingCategory.id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            name: editingCategory.name,
            color: editingCategory.color,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to update category');
        }

        const updatedCategory = await response.json();
        setCategories(
            categories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
        );
        setEditingCategory(null);
        setError('');
        } catch (error) {
        console.error('Error updating category:', error);
        setError(error.message);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!confirm('Are you sure you want to delete this category? All todos in this category will be uncategorized.')) {
        return;
        }

        try {
        const response = await fetch(`/api/categories/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to delete category');
        }

        setCategories(categories.filter((cat) => cat.id !== id));
        setError('');
        } catch (error) {
        console.error('Error deleting category:', error);
        setError(error.message);
        }
    };

    if (isLoading) {
        return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>
        
        {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
            </div>
        )}
        
        {/* Create Category Form */}
        <form onSubmit={handleCreateCategory} className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Create New Category</h3>
            <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Category name"
                />
            </div>
            <div className="w-full sm:w-32">
                <label className="block text-gray-700 mb-1">Color</label>
                <input
                type="color"
                value={newCategory.color}
                onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                className="w-full h-10 rounded-lg cursor-pointer"
                />
            </div>
            <div className="self-end">
                <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                Add Category
                </button>
            </div>
            </div>
        </form>
        
        {/* Categories List */}
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
            <thead>
                <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {categories.length === 0 ? (
                <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No categories found. Create your first category above.
                    </td>
                </tr>
                ) : (
                categories.map((category) => (
                    <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: category.color }}
                        ></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {editingCategory?.id === category.id ? (
                        <div className="flex items-center space-x-2">
                            <input
                            type="text"
                            value={editingCategory.name}
                            onChange={(e) =>
                                setEditingCategory({ ...editingCategory, name: e.target.value })
                            }
                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <input
                            type="color"
                            value={editingCategory.color}
                            onChange={(e) =>
                                setEditingCategory({ ...editingCategory, color: e.target.value })
                            }
                            className="w-8 h-8 rounded cursor-pointer"
                            />
                        </div>
                        ) : (
                        <span className="font-medium">{category.name}</span>
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingCategory?.id === category.id ? (
                        <div className="flex justify-end space-x-4">
                            <button
                            onClick={handleUpdateCategory}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                            Save
                            </button>
                            <button
                            onClick={() => setEditingCategory(null)}
                            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                            Cancel
                            </button>
                        </div>
                        ) : (
                        <div className="flex justify-end space-x-6">
                            <button
                            onClick={() => setEditingCategory(category)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                            >
                            Edit
                            </button>
                            <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            >
                            Delete
                            </button>
                        </div>
                        )}
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
}