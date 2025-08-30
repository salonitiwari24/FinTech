"use client";

import { useState } from "react";
import Card from "../components/Card";
import { FaChartLine, FaCoins, FaLightbulb, FaArrowUp, FaArrowDown } from "react-icons/fa";

// Mock data for demonstration
const mockInvestments = [
  { id: 1, name: "S&P 500 ETF", value: 5250.75, growth: 8.2, allocation: 40 },
  { id: 2, name: "Tech Growth Fund", value: 3120.50, growth: 12.5, allocation: 25 },
  { id: 3, name: "Bond Fund", value: 2500.00, growth: 3.1, allocation: 20 },
  { id: 4, name: "Real Estate REIT", value: 1875.25, growth: -2.3, allocation: 15 }
];

const mockSavingsGoals = [
  { id: 1, name: "Emergency Fund", current: 5000, target: 10000, date: "2023-12-31" },
  { id: 2, name: "Vacation", current: 1500, target: 3000, date: "2023-09-30" },
  { id: 3, name: "Down Payment", current: 15000, target: 50000, date: "2025-06-30" }
];

const mockRecommendations = [
  { 
    id: 1, 
    title: "Increase Emergency Fund", 
    description: "Your emergency fund only covers 1.5 months of expenses. Consider increasing it to 3-6 months.",
    impact: "high"
  },
  { 
    id: 2, 
    title: "Rebalance Portfolio", 
    description: "Your tech allocation is higher than recommended. Consider rebalancing to reduce risk.",
    impact: "medium"
  },
  { 
    id: 3, 
    title: "Tax-Loss Harvesting", 
    description: "Consider selling your underperforming Real Estate REIT to offset capital gains.",
    impact: "medium"
  }
];

export default function SavingsPage() {
  const [activeTab, setActiveTab] = useState("investments");
  
  // Calculate total portfolio value
  const totalPortfolioValue = mockInvestments.reduce((sum, inv) => sum + inv.value, 0);
  
  // Calculate average portfolio growth
  const weightedGrowth = mockInvestments.reduce((sum, inv) => {
    return sum + (inv.growth * (inv.value / totalPortfolioValue));
  }, 0);

  // Calculate savings goals progress
  const savingsGoalsProgress = mockSavingsGoals.map(goal => {
    const progress = (goal.current / goal.target) * 100;
    return { ...goal, progress };
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Savings & Investments</h1>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab("investments")}
              className={`px-4 py-2 rounded-md ${activeTab === "investments" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : "bg-white dark:bg-gray-800"}`}
            >
              Investments
            </button>
            <button 
              onClick={() => setActiveTab("goals")}
              className={`px-4 py-2 rounded-md ${activeTab === "goals" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : "bg-white dark:bg-gray-800"}`}
            >
              Savings Goals
            </button>
            <button 
              onClick={() => setActiveTab("recommendations")}
              className={`px-4 py-2 rounded-md ${activeTab === "recommendations" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : "bg-white dark:bg-gray-800"}`}
            >
              Recommendations
            </button>
          </div>
        </div>

        {/* Investment Portfolio */}
        {activeTab === "investments" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card title="Portfolio Value" className="border-l-4 border-blue-500">
                <div className="flex items-center">
                  <span className="stat-value text-blue-600 dark:text-blue-400">${totalPortfolioValue.toFixed(2)}</span>
                </div>
                <p className="stat-label">Total investments</p>
              </Card>
              
              <Card title="Performance" className={`border-l-4 ${weightedGrowth >= 0 ? "border-green-500" : "border-red-500"}`}>
                <div className="flex items-center">
                  <span className={`stat-value ${weightedGrowth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {weightedGrowth >= 0 ? "+" : ""}{weightedGrowth.toFixed(2)}%
                  </span>
                  {weightedGrowth >= 0 ? 
                    <FaArrowUp className="ml-2 text-green-600 dark:text-green-400" /> : 
                    <FaArrowDown className="ml-2 text-red-600 dark:text-red-400" />
                  }
                </div>
                <p className="stat-label">Average growth</p>
              </Card>
              
              <Card title="Asset Allocation" className="border-l-4 border-purple-500">
                <div className="flex items-center">
                  <span className="stat-value text-purple-600 dark:text-purple-400">{mockInvestments.length}</span>
                </div>
                <p className="stat-label">Investment vehicles</p>
              </Card>
            </div>

            <Card title="Investment Portfolio" subtitle="Current holdings and performance">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="py-3 px-4 text-left">Investment</th>
                      <th className="py-3 px-4 text-right">Value</th>
                      <th className="py-3 px-4 text-right">Growth</th>
                      <th className="py-3 px-4 text-right">Allocation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockInvestments.map(investment => (
                      <tr key={investment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-3 px-4 font-medium">{investment.name}</td>
                        <td className="py-3 px-4 text-right">${investment.value.toFixed(2)}</td>
                        <td className={`py-3 px-4 text-right font-medium ${
                          investment.growth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                        }`}>
                          {investment.growth >= 0 ? "+" : ""}{investment.growth}%
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end">
                            <span className="mr-2">{investment.allocation}%</span>
                            <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  investment.growth >= 8 ? "bg-green-500" : 
                                  investment.growth >= 0 ? "bg-blue-500" : 
                                  "bg-red-500"
                                }`} 
                                style={{ width: `${investment.allocation}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Portfolio Allocation</h3>
                <div className="h-8 w-full flex rounded-md overflow-hidden">
                  {mockInvestments.map((investment, index) => (
                    <div 
                      key={investment.id}
                      className={`h-full ${
                        index % 4 === 0 ? "bg-blue-500" : 
                        index % 4 === 1 ? "bg-green-500" : 
                        index % 4 === 2 ? "bg-purple-500" : 
                        "bg-yellow-500"
                      }`}
                      style={{ width: `${investment.allocation}%` }}
                      title={`${investment.name}: ${investment.allocation}%`}
                    ></div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {mockInvestments.map((investment, index) => (
                    <div key={investment.id} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-1 ${
                        index % 4 === 0 ? "bg-blue-500" : 
                        index % 4 === 1 ? "bg-green-500" : 
                        index % 4 === 2 ? "bg-purple-500" : 
                        "bg-yellow-500"
                      }`}></div>
                      <span className="text-sm">{investment.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Savings Goals */}
        {activeTab === "goals" && (
          <>
            <Card title="Savings Goals" subtitle="Track your progress towards financial targets" className="mb-8">
              <div className="space-y-6">
                {savingsGoalsProgress.map(goal => (
                  <div key={goal.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{goal.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Target date: {goal.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${goal.current.toFixed(2)} / ${goal.target.toFixed(2)}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{goal.progress.toFixed(1)}% complete</p>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          goal.progress >= 75 ? "bg-green-500" : 
                          goal.progress >= 25 ? "bg-blue-500" : 
                          "bg-yellow-500"
                        }`} 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="btn-secondary text-sm">Edit</button>
                      <button className="btn-primary text-sm ml-2">Add Funds</button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <button className="btn-primary flex items-center">
                  <FaCoins className="mr-2" /> Add New Savings Goal
                </button>
              </div>
            </Card>
            
            <Card title="Savings Tips" subtitle="AI-powered recommendations to reach your goals faster">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div className="flex items-start">
                  <FaLightbulb className="mr-3 mt-1 text-yellow-500" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Automate Your Savings</h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Setting up automatic transfers to your savings accounts can help you reach your goals 30% faster. Based on your income pattern, we recommend scheduling transfers of $250 every two weeks right after your paycheck arrives.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div className="flex items-start">
                  <FaLightbulb className="mr-3 mt-1 text-yellow-500" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Round-Up Savings Strategy</h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Consider using a round-up savings app that automatically saves the "change" from your purchases. Based on your transaction history, this could add approximately $45-60 to your savings each month without feeling the impact.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Investment Recommendations */}
        {activeTab === "recommendations" && (
          <Card title="AI Investment Recommendations" subtitle="Personalized suggestions to optimize your portfolio">
            <div className="space-y-6">
              {mockRecommendations.map(rec => (
                <div 
                  key={rec.id} 
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.impact === "high" ? "border-red-500 bg-red-50 dark:bg-red-900/20" : 
                    rec.impact === "medium" ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" : 
                    "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <FaChartLine className={`mr-3 ${
                      rec.impact === "high" ? "text-red-500" : 
                      rec.impact === "medium" ? "text-yellow-500" : 
                      "text-blue-500"
                    }`} />
                    <h3 className="font-medium">{rec.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{rec.description}</p>
                  <div className="mt-3 flex justify-end">
                    <button className="btn-secondary text-sm">Dismiss</button>
                    <button className="btn-primary text-sm ml-2">Apply Recommendation</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium mb-3">AI Portfolio Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Based on your financial goals, risk tolerance, and market conditions, our AI suggests the following optimal asset allocation:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Stocks</p>
                  <p className="text-lg font-semibold">55%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current: 65%</p>
                </div>
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Bonds</p>
                  <p className="text-lg font-semibold">30%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current: 20%</p>
                </div>
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Real Estate</p>
                  <p className="text-lg font-semibold">10%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current: 15%</p>
                </div>
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cash</p>
                  <p className="text-lg font-semibold">5%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current: 0%</p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-center">
                <button className="btn-primary">Rebalance Portfolio</button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}