"use client";

import { useState, useEffect } from "react";
import Card from "../components/Card";
import Chart from "../components/chart";
import { 
  FaRobot, 
  FaChartLine, 
  FaLightbulb, 
  FaTrendingUp, 
  FaTrendingDown, 
  FaExclamationTriangle,
  FaCalendarAlt,
  FaDollarSign,
  FaBrain,
  FaCog,
  FaPlay,
  FaPause,
  FaRefresh
} from "react-icons/fa";

// Mock prediction data
const mockPredictions = [
  {
    id: 1,
    category: "Food & Dining",
    currentSpending: 450,
    predictedSpending: 520,
    confidence: 85,
    trend: "increasing",
    factors: ["Seasonal price increases", "Dining out frequency", "Grocery inflation"],
    recommendations: ["Set stricter dining budget", "Plan meals in advance", "Use grocery coupons"],
    risk: "medium"
  },
  {
    id: 2,
    category: "Transportation",
    currentSpending: 280,
    predictedSpending: 250,
    confidence: 92,
    trend: "decreasing",
    factors: ["Fuel prices stabilizing", "Reduced commuting", "Public transport usage"],
    recommendations: ["Continue current habits", "Consider carpooling", "Monitor fuel efficiency"],
    risk: "low"
  },
  {
    id: 3,
    category: "Entertainment",
    currentSpending: 180,
    predictedSpending: 220,
    confidence: 78,
    trend: "increasing",
    factors: ["Holiday season", "New streaming services", "Social activities"],
    recommendations: ["Review subscriptions", "Set entertainment budget", "Find free alternatives"],
    risk: "medium"
  },
  {
    id: 4,
    category: "Utilities",
    currentSpending: 320,
    predictedSpending: 350,
    confidence: 88,
    trend: "increasing",
    factors: ["Winter heating costs", "Energy price hikes", "Increased usage"],
    recommendations: ["Improve home insulation", "Use energy-efficient appliances", "Monitor usage patterns"],
    risk: "high"
  }
];

const mockAiInsights = [
  {
    id: 1,
    type: "spending_pattern",
    title: "Unusual Spending Pattern Detected",
    description: "Your entertainment spending has increased by 22% this month compared to your 3-month average. This could impact your savings goals.",
    severity: "warning",
    action: "Review entertainment budget",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    type: "opportunity",
    title: "Savings Opportunity Identified",
    description: "Based on your spending patterns, you could save an additional $150/month by optimizing your subscription services and dining habits.",
    severity: "info",
    action: "View optimization plan",
    timestamp: "1 day ago"
  },
  {
    id: 3,
    type: "risk_alert",
    title: "Budget Risk Alert",
    description: "Your current spending trajectory suggests you may exceed your monthly budget by 8% if current patterns continue.",
    severity: "danger",
    action: "Adjust spending plan",
    timestamp: "3 days ago"
  }
];

export default function Predictions() {
  const [selectedCategory, setSelectedCategory] = "all";
  const [predictionTimeframe, setPredictionTimeframe] = useState("month");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState(mockAiInsights);

  // Simulate AI analysis
  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Add new insights
      const newInsight = {
        id: Date.now(),
        type: "new_analysis",
        title: "New AI Analysis Complete",
        description: "Fresh spending predictions and recommendations have been generated based on your latest financial data.",
        severity: "success",
        action: "View new predictions",
        timestamp: "Just now"
      };
      setAiInsights([newInsight, ...aiInsights]);
    }, 3000);
  };

  const totalCurrentSpending = mockPredictions.reduce((sum, p) => sum + p.currentSpending, 0);
  const totalPredictedSpending = mockPredictions.reduce((sum, p) => sum + p.predictedSpending, 0);
  const overallChange = totalPredictedSpending - totalCurrentSpending;
  const overallChangePercent = ((overallChange / totalCurrentSpending) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                AI Financial Predictions
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Get AI-powered insights into your future spending and financial opportunities
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <select
                value={predictionTimeframe}
                onChange={(e) => setPredictionTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="week">Next Week</option>
                <option value="month">Next Month</option>
                <option value="quarter">Next Quarter</option>
                <option value="year">Next Year</option>
              </select>
              
              <button
                onClick={runAnalysis}
                disabled={isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <FaCog className="h-4 w-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <FaPlay className="h-4 w-4" />
                    <span>Run Analysis</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <div className="text-center">
              <FaDollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Current Spending</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                ${totalCurrentSpending.toLocaleString()}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">This month</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <div className="text-center">
              <FaChartLine className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Predicted Spending</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                ${totalPredictedSpending.toLocaleString()}
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-400">Next month</p>
            </div>
          </Card>

          <Card className={`${
            overallChange >= 0 
              ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700'
              : 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700'
          }`}>
            <div className="text-center">
              {overallChange >= 0 ? (
                <FaTrendingUp className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
              ) : (
                <FaTrendingDown className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              )}
              <p className={`text-sm font-medium mb-1 ${
                overallChange >= 0 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-green-600 dark:text-green-400'
              }`}>
                Predicted Change
              </p>
              <p className={`text-2xl font-bold ${
                overallChange >= 0 
                  ? 'text-red-700 dark:text-red-300' 
                  : 'text-green-700 dark:text-green-300'
              }`}>
                {overallChange >= 0 ? '+' : ''}${overallChange.toLocaleString()}
              </p>
              <p className={`text-sm ${
                overallChange >= 0 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-green-600 dark:text-green-400'
              }`}>
                {overallChange >= 0 ? '+' : ''}{overallChangePercent}%
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-700">
            <div className="text-center">
              <FaBrain className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">AI Confidence</p>
              <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                86%
              </p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400">Average accuracy</p>
            </div>
          </Card>
        </div>

        {/* Predictions and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Predictions */}
          <Card title="Category Predictions" subtitle="AI forecasts for next month">
            <div className="space-y-4">
              {mockPredictions.map((prediction) => (
                <div key={prediction.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{prediction.category}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      prediction.risk === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                      prediction.risk === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {prediction.risk} risk
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Current</p>
                      <p className="font-medium text-gray-900 dark:text-white">${prediction.currentSpending}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Predicted</p>
                      <p className={`font-medium ${
                        prediction.predictedSpending > prediction.currentSpending 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        ${prediction.predictedSpending}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Confidence</span>
                      <span className="text-gray-900 dark:text-white">{prediction.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${prediction.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Trend:</strong> {prediction.trend}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Key Factors:</strong> {prediction.factors.join(', ')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Recommendations:</strong> {prediction.recommendations.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights */}
          <Card title="AI Insights & Alerts" subtitle="Real-time financial intelligence">
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className={`p-4 rounded-lg border-l-4 ${
                  insight.severity === 'danger' ? 'bg-red-50 dark:bg-red-900/20 border-red-400' :
                  insight.severity === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400' :
                  insight.severity === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-400' :
                  'bg-blue-50 dark:bg-blue-900/20 border-blue-400'
                }`}>
                  <div className="flex items-start">
                    <FaLightbulb className={`mr-3 mt-1 flex-shrink-0 ${
                      insight.severity === 'danger' ? 'text-red-600 dark:text-red-400' :
                      insight.severity === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                      insight.severity === 'success' ? 'text-green-600 dark:text-green-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                          {insight.action}
                        </button>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{insight.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Spending Trend Chart */}
        <Card title="Spending Trend Analysis" subtitle="Historical vs. Predicted spending patterns">
          <div className="h-80">
            <Chart 
              type="line" 
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul (Predicted)"],
                datasets: [
                  {
                    label: "Actual Spending",
                    data: [1200, 1350, 1180, 1420, 1300, 1230, null],
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    fill: false,
                    tension: 0.4
                  },
                  {
                    label: "Predicted Spending",
                    data: [null, null, null, null, null, 1230, 1380],
                    borderColor: "#ef4444",
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    fill: false,
                    tension: 0.4,
                    borderDash: [5, 5]
                  }
                ]
              }}
            />
          </div>
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Dashed line indicates AI predictions. Confidence level: 86%</p>
          </div>
        </Card>

        {/* Action Items */}
        <Card title="Recommended Actions" subtitle="AI-suggested next steps to optimize your finances">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center mb-2">
                <FaExclamationTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <h4 className="font-medium text-blue-900 dark:text-blue-300">Immediate Actions</h4>
              </div>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Review entertainment subscriptions</li>
                <li>• Set dining out budget limit</li>
                <li>• Monitor utility usage</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-center mb-2">
                <FaTrendingUp className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <h4 className="font-medium text-green-900 dark:text-green-300">Optimization</h4>
              </div>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• Automate savings transfers</li>
                <li>• Use cashback rewards</li>
                <li>• Plan meals in advance</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                <h4 className="font-medium text-purple-900 dark:text-purple-300">Long-term Planning</h4>
              </div>
              <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                <li>• Set quarterly budget reviews</li>
                <li>• Plan for seasonal expenses</li>
                <li>• Build emergency fund</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
