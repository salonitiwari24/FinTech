import { NextResponse } from 'next/server';

// Mock data for transactions
const mockTransactions = [
  {
    id: '1',
    userId: 'user1',
    amount: 1250.00,
    type: 'income',
    category: 'Salary',
    description: 'Monthly salary',
    date: '2023-11-01T08:00:00Z',
  },
  {
    id: '2',
    userId: 'user1',
    amount: -45.99,
    type: 'expense',
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    date: '2023-11-03T15:30:00Z',
  },
  {
    id: '3',
    userId: 'user1',
    amount: -9.99,
    type: 'expense',
    category: 'Subscription',
    description: 'Netflix subscription',
    date: '2023-11-05T12:00:00Z',
  },
  {
    id: '4',
    userId: 'user1',
    amount: -35.50,
    type: 'expense',
    category: 'Dining',
    description: 'Restaurant dinner',
    date: '2023-11-07T19:45:00Z',
  },
  {
    id: '5',
    userId: 'user1',
    amount: -120.00,
    type: 'expense',
    category: 'Utilities',
    description: 'Electricity bill',
    date: '2023-11-10T09:15:00Z',
  },
];

// GET handler for retrieving transactions
export async function GET(request: Request) {
  // In a real app, we would authenticate the user and filter by their userId
  // For demo purposes, we'll return all mock transactions
  
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const type = searchParams.get('type');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  
  let filteredTransactions = [...mockTransactions];
  
  // Apply filters if provided
  if (category) {
    filteredTransactions = filteredTransactions.filter(t => 
      t.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (type) {
    filteredTransactions = filteredTransactions.filter(t => t.type === type);
  }
  
  if (startDate) {
    const start = new Date(startDate);
    filteredTransactions = filteredTransactions.filter(t => 
      new Date(t.date) >= start
    );
  }
  
  if (endDate) {
    const end = new Date(endDate);
    filteredTransactions = filteredTransactions.filter(t => 
      new Date(t.date) <= end
    );
  }
  
  return NextResponse.json({ transactions: filteredTransactions });
}

// POST handler for creating a new transaction
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['amount', 'type', 'category', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // In a real app, we would save this to a database
    // For demo purposes, we'll just return the created transaction with a mock ID
    const newTransaction = {
      id: `${mockTransactions.length + 1}`,
      userId: 'user1', // In a real app, this would come from the authenticated user
      amount: body.type === 'expense' ? -Math.abs(body.amount) : Math.abs(body.amount),
      type: body.type,
      category: body.category,
      description: body.description,
      date: body.date || new Date().toISOString(),
    };
    
    return NextResponse.json({ transaction: newTransaction }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}

// DELETE handler for removing a transaction
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'Transaction ID is required' },
      { status: 400 }
    );
  }
  
  // In a real app, we would delete from the database
  // For demo purposes, we'll just return a success message
  
  return NextResponse.json({ success: true, message: 'Transaction deleted' });
}