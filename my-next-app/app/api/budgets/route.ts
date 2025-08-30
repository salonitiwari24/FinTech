import { NextResponse } from 'next/server';

// Mock data for budgets
const mockBudgets = [
  {
    id: '1',
    userId: 'user1',
    category: 'Groceries',
    amount: 400.00,
    spent: 245.75,
    period: 'monthly',
    startDate: '2023-11-01T00:00:00Z',
    endDate: '2023-11-30T23:59:59Z',
  },
  {
    id: '2',
    userId: 'user1',
    category: 'Entertainment',
    amount: 200.00,
    spent: 150.50,
    period: 'monthly',
    startDate: '2023-11-01T00:00:00Z',
    endDate: '2023-11-30T23:59:59Z',
  },
  {
    id: '3',
    userId: 'user1',
    category: 'Dining',
    amount: 300.00,
    spent: 275.25,
    period: 'monthly',
    startDate: '2023-11-01T00:00:00Z',
    endDate: '2023-11-30T23:59:59Z',
  },
  {
    id: '4',
    userId: 'user1',
    category: 'Transportation',
    amount: 150.00,
    spent: 87.50,
    period: 'monthly',
    startDate: '2023-11-01T00:00:00Z',
    endDate: '2023-11-30T23:59:59Z',
  },
];

// GET handler for retrieving budgets
export async function GET(request: Request) {
  // In a real app, we would authenticate the user and filter by their userId
  // For demo purposes, we'll return all mock budgets
  
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const period = searchParams.get('period');
  
  let filteredBudgets = [...mockBudgets];
  
  // Apply filters if provided
  if (category) {
    filteredBudgets = filteredBudgets.filter(b => 
      b.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (period) {
    filteredBudgets = filteredBudgets.filter(b => b.period === period);
  }
  
  return NextResponse.json({ budgets: filteredBudgets });
}

// POST handler for creating a new budget
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['category', 'amount', 'period'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // In a real app, we would save this to a database
    // For demo purposes, we'll just return the created budget with a mock ID
    const newBudget = {
      id: `${mockBudgets.length + 1}`,
      userId: 'user1', // In a real app, this would come from the authenticated user
      category: body.category,
      amount: body.amount,
      spent: 0, // New budget starts with 0 spent
      period: body.period,
      startDate: body.startDate || new Date().toISOString(),
      endDate: body.endDate || new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
    };
    
    return NextResponse.json({ budget: newBudget }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create budget' },
      { status: 500 }
    );
  }
}

// PUT handler for updating a budget
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'Budget ID is required' },
        { status: 400 }
      );
    }
    
    // In a real app, we would update the database
    // For demo purposes, we'll just return the updated budget
    const updatedBudget = {
      id: body.id,
      userId: 'user1',
      category: body.category || 'Unknown Category',
      amount: body.amount || 0,
      spent: body.spent || 0,
      period: body.period || 'monthly',
      startDate: body.startDate || new Date().toISOString(),
      endDate: body.endDate || new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
    };
    
    return NextResponse.json({ budget: updatedBudget });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update budget' },
      { status: 500 }
    );
  }
}

// DELETE handler for removing a budget
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'Budget ID is required' },
      { status: 400 }
    );
  }
  
  // In a real app, we would delete from the database
  // For demo purposes, we'll just return a success message
  
  return NextResponse.json({ success: true, message: 'Budget deleted' });
}