import { NextResponse } from 'next/server';

// Mock data for investments
const mockInvestments = [
  {
    id: '1',
    userId: 'user1',
    name: 'S&P 500 ETF',
    type: 'ETF',
    value: 5000.00,
    initialInvestment: 4500.00,
    purchaseDate: '2023-01-15T00:00:00Z',
    currentReturn: 11.11,
    risk: 'medium',
  },
  {
    id: '2',
    userId: 'user1',
    name: 'Tech Growth Fund',
    type: 'Mutual Fund',
    value: 3200.00,
    initialInvestment: 3000.00,
    purchaseDate: '2023-02-20T00:00:00Z',
    currentReturn: 6.67,
    risk: 'high',
  },
  {
    id: '3',
    userId: 'user1',
    name: 'Government Bonds',
    type: 'Bonds',
    value: 2000.00,
    initialInvestment: 2000.00,
    purchaseDate: '2023-03-10T00:00:00Z',
    currentReturn: 0,
    risk: 'low',
  },
  {
    id: '4',
    userId: 'user1',
    name: 'Real Estate Trust',
    type: 'REIT',
    value: 4200.00,
    initialInvestment: 4000.00,
    purchaseDate: '2023-04-05T00:00:00Z',
    currentReturn: 5.00,
    risk: 'medium',
  },
];

// GET handler for retrieving investments
export async function GET(request: Request) {
  // In a real app, we would authenticate the user and filter by their userId
  // For demo purposes, we'll return all mock investments
  
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const risk = searchParams.get('risk');
  
  let filteredInvestments = [...mockInvestments];
  
  // Apply filters if provided
  if (type) {
    filteredInvestments = filteredInvestments.filter(i => 
      i.type.toLowerCase() === type.toLowerCase()
    );
  }
  
  if (risk) {
    filteredInvestments = filteredInvestments.filter(i => i.risk === risk);
  }
  
  // Calculate portfolio summary
  const totalValue = filteredInvestments.reduce((sum, inv) => sum + inv.value, 0);
  const totalInitialInvestment = filteredInvestments.reduce((sum, inv) => sum + inv.initialInvestment, 0);
  const totalReturn = ((totalValue - totalInitialInvestment) / totalInitialInvestment) * 100;
  
  // Calculate allocation by type
  const allocation = filteredInvestments.reduce((acc, inv) => {
    acc[inv.type] = (acc[inv.type] || 0) + inv.value;
    return acc;
  }, {});
  
  // Convert allocation to percentages
  Object.keys(allocation).forEach(key => {
    allocation[key] = (allocation[key] / totalValue) * 100;
  });
  
  return NextResponse.json({
    investments: filteredInvestments,
    summary: {
      totalValue,
      totalInitialInvestment,
      totalReturn,
      allocation
    }
  });
}

// POST handler for creating a new investment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'type', 'value', 'initialInvestment', 'risk'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Calculate return
    const currentReturn = ((body.value - body.initialInvestment) / body.initialInvestment) * 100;
    
    // In a real app, we would save this to a database
    // For demo purposes, we'll just return the created investment with a mock ID
    const newInvestment = {
      id: `${mockInvestments.length + 1}`,
      userId: 'user1', // In a real app, this would come from the authenticated user
      name: body.name,
      type: body.type,
      value: body.value,
      initialInvestment: body.initialInvestment,
      purchaseDate: body.purchaseDate || new Date().toISOString(),
      currentReturn,
      risk: body.risk,
    };
    
    return NextResponse.json({ investment: newInvestment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create investment' },
      { status: 500 }
    );
  }
}

// PUT handler for updating an investment
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'Investment ID is required' },
        { status: 400 }
      );
    }
    
    // Calculate return if value and initialInvestment are provided
    let currentReturn = 0;
    if (body.value && body.initialInvestment) {
      currentReturn = ((body.value - body.initialInvestment) / body.initialInvestment) * 100;
    }
    
    // In a real app, we would update the database
    // For demo purposes, we'll just return the updated investment
    const updatedInvestment = {
      id: body.id,
      userId: 'user1',
      name: body.name || 'Unknown Investment',
      type: body.type || 'Other',
      value: body.value || 0,
      initialInvestment: body.initialInvestment || 0,
      purchaseDate: body.purchaseDate || new Date().toISOString(),
      currentReturn,
      risk: body.risk || 'medium',
    };
    
    return NextResponse.json({ investment: updatedInvestment });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update investment' },
      { status: 500 }
    );
  }
}

// DELETE handler for removing an investment
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'Investment ID is required' },
      { status: 400 }
    );
  }
  
  // In a real app, we would delete from the database
  // For demo purposes, we'll just return a success message
  
  return NextResponse.json({ success: true, message: 'Investment deleted' });
}