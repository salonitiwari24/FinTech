import { NextResponse } from 'next/server';

// Mock data for risk alerts
const mockRiskAlerts = [
  {
    id: '1',
    userId: 'user1',
    type: 'high',
    category: 'Spending',
    title: 'Unusual spending pattern detected',
    description: 'Your dining expenses are 45% higher than your monthly average.',
    date: '2023-11-10T14:30:00Z',
    isRead: false,
    actionTaken: false,
    recommendedAction: 'Review your recent dining transactions and consider adjusting your budget.',
  },
  {
    id: '2',
    userId: 'user1',
    type: 'medium',
    category: 'Budget',
    title: 'Budget threshold reached',
    description: 'You have spent 85% of your entertainment budget with 10 days remaining.',
    date: '2023-11-08T09:15:00Z',
    isRead: true,
    actionTaken: false,
    recommendedAction: 'Reduce entertainment spending for the remainder of the month.',
  },
  {
    id: '3',
    userId: 'user1',
    type: 'low',
    category: 'Subscription',
    title: 'Duplicate subscription detected',
    description: 'You appear to be paying for two similar streaming services.',
    date: '2023-11-05T16:45:00Z',
    isRead: true,
    actionTaken: true,
    recommendedAction: 'Consider cancelling one of the duplicate subscriptions.',
  },
  {
    id: '4',
    userId: 'user1',
    type: 'high',
    category: 'Security',
    title: 'Multiple login attempts',
    description: 'Multiple failed login attempts detected from an unknown location.',
    date: '2023-11-12T07:20:00Z',
    isRead: false,
    actionTaken: false,
    recommendedAction: 'Change your password immediately and enable two-factor authentication.',
  },
  {
    id: '5',
    userId: 'user1',
    type: 'medium',
    category: 'Investment',
    title: 'Portfolio imbalance',
    description: 'Your investment portfolio is heavily weighted in technology stocks.',
    date: '2023-11-09T11:30:00Z',
    isRead: false,
    actionTaken: false,
    recommendedAction: 'Consider diversifying your investments across different sectors.',
  },
];

// GET handler for retrieving risk alerts
export async function GET(request: Request) {
  // In a real app, we would authenticate the user and filter by their userId
  // For demo purposes, we'll return all mock risk alerts
  
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const category = searchParams.get('category');
  const isRead = searchParams.get('isRead');
  const actionTaken = searchParams.get('actionTaken');
  
  let filteredRisks = [...mockRiskAlerts];
  
  // Apply filters if provided
  if (type) {
    filteredRisks = filteredRisks.filter(r => r.type === type);
  }
  
  if (category) {
    filteredRisks = filteredRisks.filter(r => 
      r.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (isRead !== null) {
    const isReadBool = isRead === 'true';
    filteredRisks = filteredRisks.filter(r => r.isRead === isReadBool);
  }
  
  if (actionTaken !== null) {
    const actionTakenBool = actionTaken === 'true';
    filteredRisks = filteredRisks.filter(r => r.actionTaken === actionTakenBool);
  }
  
  // Calculate risk summary
  const riskSummary = {
    total: mockRiskAlerts.length,
    high: mockRiskAlerts.filter(r => r.type === 'high').length,
    medium: mockRiskAlerts.filter(r => r.type === 'medium').length,
    low: mockRiskAlerts.filter(r => r.type === 'low').length,
    unread: mockRiskAlerts.filter(r => !r.isRead).length,
    actionRequired: mockRiskAlerts.filter(r => !r.actionTaken).length,
  };
  
  // Calculate risk score (0-100)
  // Higher score means higher risk
  const riskScore = Math.min(
    100,
    Math.round(
      (riskSummary.high * 20 + 
       riskSummary.medium * 10 + 
       riskSummary.low * 5) / 
      Math.max(1, riskSummary.total)
    )
  );
  
  return NextResponse.json({
    risks: filteredRisks,
    summary: riskSummary,
    riskScore
  });
}

// POST handler for creating a new risk alert
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['type', 'category', 'title', 'description', 'recommendedAction'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // In a real app, we would save this to a database
    // For demo purposes, we'll just return the created risk alert with a mock ID
    const newRiskAlert = {
      id: `${mockRiskAlerts.length + 1}`,
      userId: 'user1', // In a real app, this would come from the authenticated user
      type: body.type,
      category: body.category,
      title: body.title,
      description: body.description,
      date: body.date || new Date().toISOString(),
      isRead: false,
      actionTaken: false,
      recommendedAction: body.recommendedAction,
    };
    
    return NextResponse.json({ risk: newRiskAlert }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create risk alert' },
      { status: 500 }
    );
  }
}

// PUT handler for updating a risk alert (e.g., marking as read or action taken)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'Risk alert ID is required' },
        { status: 400 }
      );
    }
    
    // In a real app, we would update the database
    // For demo purposes, we'll just return the updated risk alert
    const updatedRiskAlert = {
      id: body.id,
      userId: 'user1',
      type: body.type || 'medium',
      category: body.category || 'Other',
      title: body.title || 'Risk Alert',
      description: body.description || '',
      date: body.date || new Date().toISOString(),
      isRead: body.isRead !== undefined ? body.isRead : false,
      actionTaken: body.actionTaken !== undefined ? body.actionTaken : false,
      recommendedAction: body.recommendedAction || '',
    };
    
    return NextResponse.json({ risk: updatedRiskAlert });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update risk alert' },
      { status: 500 }
    );
  }
}