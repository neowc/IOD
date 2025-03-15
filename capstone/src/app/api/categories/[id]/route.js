import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { auth } from "@/lib/auth";

// Get a specific category
export async function GET(request, { params }) {
  try {
    // const session = await getServerSession(authOptions);
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        todos: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if the category belongs to the user
    if (category.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// Update a category
export async function PUT(request, { params }) {
  try {
    // const session = await getServerSession(authOptions);
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const { name, color } = await request.json();

    // Check if the category exists and belongs to the user
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    if (existingCategory.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Check if another category with the same name exists for this user
    if (name && name !== existingCategory.name) {
      const duplicateCategory = await prisma.category.findFirst({
        where: {
          name,
          userId: session.user.id,
          id: {
            not: Number(id), // Exclude current category
          },
        },
      });

      if (duplicateCategory) {
        return NextResponse.json(
          { error: 'Another category with this name already exists' },
          { status: 409 }
        );
      }
    }

    // Update the category
    const updatedCategory = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name || existingCategory.name,
        color: color || existingCategory.color,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// Delete a category
export async function DELETE(request, { params }) {
  try {
    // const session = await getServerSession(authOptions);
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Check if the category exists and belongs to the user
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    if (category.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Delete the category (todos will be updated to have null categoryId)
    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}