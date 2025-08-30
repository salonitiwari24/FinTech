"use client";

import { useState } from "react";
import Card from "../components/Card";
import Chart from "../components/chart";
import { 
  FaChartLine, 
  FaTrendingUp, 
  FaTrendingDown, 
  FaDollarSign, 
  FaChartPie,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter
} from "react-icons/fa";

// Mock investment data
const mockInvestments = [
  {
    id: 1,
    name: "S&P 500 ETF",
    symbol: "SPY",
    type: "ETF",
    value: 15000,
    shares: 100,
    avgPrice: 150.00,
    currentPrice: 155.50,
    change: 5.50,
    changePercent: 3.67,
    category: "US Stocks",
    sector: "Broad Market"
  },
  {
    id: 2,
    name: "Apple Inc.",
    symbol: "AAPL",
    type: "Stock",
    value: 8500,
    shares: 50,
    avgPrice: 170.00,
    currentPrice: 175.00,
    change: 5.00,
    changePercent: 2.94,
    category: "US Stocks",
    sector: "Technology"
  },
  {
    id: 3,
    name: "Vanguard Total Bond",
    symbol: "BND",
    type: "ETF",
    value: 5000,
    shares: 50,
    avgPrice: 100.00,
    currentPrice: 98.50,
    change: -1.50,
    changePercent: -1.50,
    category: "Bonds",
    sector: "Fixed Income"
  },
  {
    id: 4,
    name: "Tesla Inc.",
    symbol: "TSLA",
    type: "Stock",
    value: 3000,
    shares: 20,
    avgPrice: 150.00,
    currentPrice: 145.00,
    change: -5.00,
    changePercent: -3.33,
    category: "US Stocks",
    sector: "Automotive"
  }
];

const mockPortfolioData = {
  totalValue: 31500,
  totalGain: 1450,
  totalGainPercent: 4.82,
  allocation: {
    labels: ["US Stocks", "Bonds", "International", "Cash"],
    data: [70, 20, 8, 2],
    colors: ["#3b82f6", "#10b981", "#f59e0b", "#6b7280"]
  }
};

export default function Investments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("value");

  const filteredInvestments = mockInvestments.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         inv.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || inv.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    switch (sortBy) {
      case "value": return b.value - a.value;
      case "change": return b.change - a.change;
      case "changePercent": return b.changePercent - a.changePercent;
      case "name": return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const categories = ["all", ...Array.from(new Set(mockInvestments.map(inv => inv.category)))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Investment Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your investments and analyze performance
          </p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <div className="text-center">
              <FaDollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Total Value</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                ${mockPortfolioData.totalValue.toLocaleString()}
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <div className="text-center">
              <FaTrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Total Gain</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                +${mockPortfolioData.totalGain.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                +{mockPortfolioData.totalGainPercent}%
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <div className="text-center">
              <FaChartPie className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Holdings</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {mockInvestments.length}
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400">Investments</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <div className="text-center">
              <FaChartLine className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">Best Performer</p>
              <p className="text-lg font-bold text-orange-700 dark:text-orange-300">
                SPY
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                +3.67%
              </p>
            </div>
          </Card>
        </div>

        {/* Charts and Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card title="Portfolio Allocation" subtitle="Asset distribution">
            <div className="h-64">
              <Chart 
                type="doughnut" 
                data={{
                  labels: mockPortfolioData.allocation.labels,
                  datasets: [{
                    data: mockPortfolioData.allocation.data,
                    backgroundColor: mockPortfolioData.allocation.colors,
                    borderWidth: 0
                  }]
                }}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {mockPortfolioData.allocation.labels.map((label, index) => (
                <div key={label} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: mockPortfolioData.allocation.colors[index] }}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {mockPortfolioData.allocation.data[index]}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Performance Trend" subtitle="Portfolio value over time">
            <div className="h-64">
              <Chart 
                type="line" 
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [{
                    label: "Portfolio Value",
                    data: [30000, 30500, 30800, 31200, 31000, 31500],
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    fill: true,
                    tension: 0.4
                  }]
                }}
              />
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search investments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="value">Sort by Value</option>
              <option value="change">Sort by Change</option>
              <option value="changePercent">Sort by % Change</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          {/* Add Investment Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <FaPlus className="h-4 w-4" />
            <span>Add Investment</span>
          </button>
        </div>

        {/* Investments Table */}
        <Card title="Your Investments" subtitle={`${sortedInvestments.length} investments found`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Investment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Shares</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Change</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedInvestments.map((investment) => (
                  <tr key={investment.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{investment.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{investment.symbol}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        investment.type === 'ETF' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {investment.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        ${investment.value.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ${investment.currentPrice.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {investment.shares}
                    </td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center space-x-1 ${
                        investment.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {investment.change >= 0 ? (
                          <FaTrendingUp className="h-4 w-4" />
                        ) : (
                          <FaTrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-medium">
                          {investment.change >= 0 ? '+' : ''}${investment.change.toFixed(2)}
                        </span>
                        <span className="text-sm">
                          ({investment.changePercent >= 0 ? '+' : ''}{investment.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                          <FaEye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
