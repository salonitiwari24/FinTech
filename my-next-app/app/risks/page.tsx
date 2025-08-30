"use client";

import { useState } from "react";
import Card from "../components/Card";
import { FaBell, FaExclamationTriangle, FaShieldAlt, FaChartLine } from "react-icons/fa";

// Mock data for demonstration
const mockRisks = [
  { 
    id: 1, 
    type: "high", 
    title: "Unusual Transaction Pattern", 
    description: "Multiple large transactions detected in a short timeframe",
    date: "2023-06-18",
    action: "Review recent transactions and verify their authenticity"
  },
  { 
    id: 2, 
    type: "medium", 
    title: "Budget Overspending", 
    description: "You've exceeded your Food budget by 15% this month",
    date: "2023-06-15",
    action: "Adjust your spending or increase your budget allocation"
  },
  { 
    id: 3, 
    type: "low", 
    title: "Subscription Renewal", 
    description: "Netflix subscription ($14.99) will renew in 3 days",
    date: "2023-06-20",
    action: "Ensure sufficient funds are available or cancel if not needed"
  },
  { 
    id: 4, 
    type: "medium", 
    title: "Potential Duplicate Payment", 
    description: "Similar transactions to the same merchant within 24 hours",
    date: "2023-06-12",
    action: "Check if you were charged twice for the same service"
  },
  { 
    id: 5, 
    type: "high", 
    title: "Insufficient Emergency Fund", 
    description: "Your emergency fund covers only 1.5 months of expenses",
    date: "2023-06-10",
    action: "Consider increasing your emergency savings to 3-6 months"
  }
];

export default function RisksPage() {
  const [riskFilter, setRiskFilter] = useState("all");
  
  // Filter risks based on selected risk level
  const filteredRisks = riskFilter === "all" 
    ? mockRisks 
    : mockRisks.filter(risk => risk.type === riskFilter);

  // Count risks by type
  const riskCounts = {
    high: mockRisks.filter(risk => risk.type === "high").length,
    medium: mockRisks.filter(risk => risk.type === "medium").length,
    low: mockRisks.filter(risk => risk.type === "low").length,
    all: mockRisks.length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Detection</h1>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setRiskFilter("all")}
              className={`px-3 py-1 rounded-md ${riskFilter === "all" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : "bg-white dark:bg-gray-800"}`}
            >
              All ({riskCounts.all})
            </button>
            <button 
              onClick={() => setRiskFilter("high")}
              className={`px-3 py-1 rounded-md ${riskFilter === "high" ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" : "bg-white dark:bg-gray-800"}`}
            >
              High ({riskCounts.high})
            </button>
            <button 
              onClick={() => setRiskFilter("medium")}
              className={`px-3 py-1 rounded-md ${riskFilter === "medium" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" : "bg-white dark:bg-gray-800"}`}
            >
              Medium ({riskCounts.medium})
            </button>
            <button 
              onClick={() => setRiskFilter("low")}
              className={`px-3 py-1 rounded-md ${riskFilter === "low" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-white dark:bg-gray-800"}`}
            >
              Low ({riskCounts.low})
            </button>
          </div>
        </div>

        {/* Risk Overview */}
        <Card title="Risk Overview" subtitle="Current financial health assessment" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <FaExclamationTriangle className="text-red-500 mr-2" />
                <h3 className="font-medium">Risk Score</h3>
              </div>
              <div className="flex items-end">
                <span className="text-3xl font-bold">65</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">/ 100</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: "65%" }}></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Moderate risk level</p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <FaShieldAlt className="text-blue-500 mr-2" />
                <h3 className="font-medium">Protection Status</h3>
              </div>
              <div className="flex items-center mt-2">
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Partial Coverage
                </span>
              </div>
              <ul className="mt-3 text-sm space-y-1">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Emergency fund: Partial
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Insurance: Missing
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Debt ratio: Good
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <FaChartLine className="text-green-500 mr-2" />
                <h3 className="font-medium">Trend Analysis</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your financial risk has <span className="text-green-500 font-medium">decreased by 12%</span> over the last 3 months.
              </p>
              <div className="mt-3 flex items-center space-x-1">
                <div className="h-8 w-1/5 bg-red-400 rounded-sm"></div>
                <div className="h-10 w-1/5 bg-red-400 rounded-sm"></div>
                <div className="h-12 w-1/5 bg-yellow-400 rounded-sm"></div>
                <div className="h-14 w-1/5 bg-yellow-400 rounded-sm"></div>
                <div className="h-16 w-1/5 bg-green-400 rounded-sm"></div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Risk Alerts */}
        <Card title="Risk Alerts" subtitle="Issues that need your attention">
          <div className="space-y-4">
            {filteredRisks.length > 0 ? (
              filteredRisks.map(risk => (
                <div 
                  key={risk.id} 
                  className={`p-4 rounded-lg border-l-4 ${
                    risk.type === "high" ? "border-red-500 bg-red-50 dark:bg-red-900/20" : 
                    risk.type === "medium" ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" : 
                    "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <FaBell className={`mr-3 ${
                        risk.type === "high" ? "text-red-500" : 
                        risk.type === "medium" ? "text-yellow-500" : 
                        "text-blue-500"
                      }`} />
                      <h3 className="font-medium">{risk.title}</h3>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{risk.date}</span>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{risk.description}</p>
                  <div className="mt-3">
                    <h4 className="text-sm font-medium">Recommended Action:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{risk.action}</p>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button className="btn-secondary text-sm">Dismiss</button>
                    <button className="btn-primary text-sm ml-2">Take Action</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FaShieldAlt className="mx-auto text-4xl text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No risks found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  No {riskFilter !== "all" ? riskFilter : ""} risk alerts match your current filter.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}