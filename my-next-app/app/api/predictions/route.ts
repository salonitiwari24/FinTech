import { NextResponse } from 'next/server';

// Mock data for AI predictions
const mockPredictions = [
  {
    id: '1',
    userId: 'user1',
    type: 'spending',
    category: 'Groceries',
    currentAverage: 350.00,
    predictedNextMonth: 375.50,
    trend: 'increasing',
    confidence: 0.85,
    factors: [
      'Seasonal food price increases',
      'Your historical spending pattern',
      'Recent grocery inflation data'
    ],
    recommendation: 'Consider buying non-perishables in bulk to offset rising prices.',
    date: '2023-11-10T00:00:00Z',
  },
  {
    id: '2',
    userId: 'user1',
    type: 'income',
    category: 'Salary',
    currentAverage: 4500.00,
    predictedNextMonth: 4500.00,
    trend: 'stable',
    confidence: 0.95,
    factors: [
      'Consistent monthly income pattern',
      'No scheduled bonuses or raises'
    ],
    recommendation: 'Your income appears stable. This is a good time to review your savings goals.',
    date: '2023-11-10T00:00:00Z',
  },
  {
    id: '3',
    userId: 'user1',
    type: 'savings',
    category: 'Emergency Fund',
    currentAverage: 250.00,
    predictedNextMonth: 200.00,
    trend: 'decreasing',
    confidence: 0.75,
    factors: [
      'Increased spending in other categories',
      'Seasonal expenses approaching',
      'Recent withdrawal pattern'
    ],
    recommendation: 'Try to maintain your emergency fund contributions by reducing discretionary spending.',
    date: '2023-11-10T00:00:00Z',
  },
  {
    id: '4',
    userId: 'user1',
    type: 'investment',
    category: 'Stock Portfolio',
    currentAverage: null,
    predictedReturn: 7.5,
    trend: 'increasing',
    confidence: 0.65,
    factors: [
      'Market sector performance',
      'Economic indicators',
      'Your portfolio composition'
    ],
    recommendation: 'Your tech-heavy portfolio may benefit from some diversification into defensive sectors.',
    date: '2023-11-10T00:00:00Z',
  },
  {
    id: '5',
    userId: 'user1',
    type: 'cashflow',
    category: 'Monthly Net',
    currentAverage: 1200.00,
    predictedNextMonth: 1050.00,
    trend: 'decreasing',
    confidence: 0.80,
    factors: [
      'Upcoming subscription renewals',
      'Seasonal utility cost increases',
      'Predicted spending increases'
    ],
    recommendation: 'Review your upcoming subscriptions and consider pausing non-essential services.',
    date: '2023-11-10T00:00:00Z',
  },
];

// GET handler for retrieving AI predictions
export async function GET(request: Request) {
  // In a real app, we would authenticate the user and filter by their userId
  // For demo purposes, we'll return all mock predictions
  
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const category = searchParams.get('category');
  
  let filteredPredictions = [...mockPredictions];
  
  // Apply filters if provided
  if (type) {
    filteredPredictions = filteredPredictions.filter(p => p.type === type);
  }
  
  if (category) {
    filteredPredictions = filteredPredictions.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Generate summary insights
  const insights = {
    overallTrend: calculateOverallTrend(filteredPredictions),
    topRecommendations: getTopRecommendations(filteredPredictions),
    riskAreas: identifyRiskAreas(filteredPredictions),
    opportunityAreas: identifyOpportunityAreas(filteredPredictions),
  };
  
  return NextResponse.json({
    predictions: filteredPredictions,
    insights
  });
}

// Helper function to calculate overall financial trend
function calculateOverallTrend(predictions) {
  // Count trends
  const trends = predictions.reduce((acc, p) => {
    if (p.trend) {
      acc[p.trend] = (acc[p.trend] || 0) + 1;
    }
    return acc;
  }, {});
  
  // Determine dominant trend
  let dominantTrend = 'stable';
  let maxCount = 0;
  
  Object.entries(trends).forEach(([trend, count]) => {
    if (count > maxCount) {
      dominantTrend = trend;
      maxCount = count;
    }
  });
  
  // Calculate average confidence
  const avgConfidence = predictions.reduce((sum, p) => sum + (p.confidence || 0), 0) / 
    predictions.filter(p => p.confidence).length;
  
  return {
    dominantTrend,
    avgConfidence: avgConfidence.toFixed(2),
    summary: `Your finances are generally ${dominantTrend} with ${avgConfidence.toFixed(2) * 100}% confidence.`
  };
}

// Helper function to get top recommendations
function getTopRecommendations(predictions) {
  // Sort by confidence and return top 3 recommendations
  return predictions
    .filter(p => p.recommendation)
    .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    .slice(0, 3)
    .map(p => ({
      category: p.category,
      recommendation: p.recommendation,
      confidence: p.confidence
    }));
}

// Helper function to identify risk areas
function identifyRiskAreas(predictions) {
  return predictions
    .filter(p => p.trend === 'decreasing' && p.type !== 'spending')
    .map(p => ({
      category: p.category,
      type: p.type,
      severity: calculateSeverity(p)
    }))
    .concat(
      predictions
        .filter(p => p.trend === 'increasing' && p.type === 'spending')
        .map(p => ({
          category: p.category,
          type: p.type,
          severity: calculateSeverity(p)
        }))
    )
    .sort((a, b) => b.severity - a.severity);
}

// Helper function to identify opportunity areas
function identifyOpportunityAreas(predictions) {
  return predictions
    .filter(p => p.trend === 'increasing' && p.type !== 'spending')
    .map(p => ({
      category: p.category,
      type: p.type,
      potential: calculatePotential(p)
    }))
    .concat(
      predictions
        .filter(p => p.trend === 'decreasing' && p.type === 'spending')
        .map(p => ({
          category: p.category,
          type: p.type,
          potential: calculatePotential(p)
        }))
    )
    .sort((a, b) => b.potential - a.potential);
}

// Helper function to calculate severity score
function calculateSeverity(prediction) {
  // Higher confidence and larger changes indicate higher severity
  const confidenceFactor = prediction.confidence || 0.5;
  
  let changeFactor = 0;
  if (prediction.currentAverage && prediction.predictedNextMonth) {
    const percentChange = Math.abs((prediction.predictedNextMonth - prediction.currentAverage) / prediction.currentAverage);
    changeFactor = Math.min(percentChange, 1); // Cap at 100% change
  } else {
    changeFactor = 0.5; // Default if we can't calculate
  }
  
  return (confidenceFactor * 0.7 + changeFactor * 0.3) * 10; // Scale to 0-10
}

// Helper function to calculate opportunity potential
function calculatePotential(prediction) {
  // Similar to severity but for positive changes
  return calculateSeverity(prediction);
}