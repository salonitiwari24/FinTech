"use client";

import { useState, useMemo } from "react";
import Card from "../components/Card";
import Chart from "../components/chart";
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaEdit, 
  FaTrash, 
  FaTimes,
  FaDollarSign,
  FaChartPie,
  FaReceipt
} from "react-icons/fa";

// Mock transaction data
const mockTransactions = [
  { id: 1, description: "Grocery Store", amount: -85.27, date: "2023-06-15", category: "Food" },
  { id: 2, description: "Electric Bill", amount: -124.56, date: "2023-06-10", category: "Utilities" },
  { id: 3, description: "Restaurant", amount: -45.80, date: "2023-06-12", category: "Food" },
  { id: 4, description: "Gas Station", amount: -38.65, date: "2023-06-14", category: "Transportation" },
  { id: 5, description: "Netflix Subscription", amount: -15.00, date: "2023-06-13", category: "Entertainment" },
  { id: 6, description: "Internet Bill", amount: -70.00, date: "2023-06-05", category: "Utilities" },
  { id: 7, description: "Movie Theater", amount: -25.00, date: "2023-06-08", category: "Entertainment" },
  { id: 8, description: "Coffee Shop", amount: -12.50, date: "2023-06-11", category: "Food" },
];

const categories = ["All", "Food", "Transportation", "Entertainment", "Utilities", "Other"];

export default function Expenses() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);

  // Filter and search transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || transaction.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchTerm, selectedCategory]);

  // Calculate expense summary
  const expenseSummary = useMemo(() => {
    const totalExpenses = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const categoryTotals = categories.slice(1).map(category => {
      const total = transactions
        .filter(t => t.category === category)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      return { category, total, percentage: (total / totalExpenses) * 100 };
    });
    return { totalExpenses, categoryTotals };
  }, [transactions]);

  // Chart data for expenses by category
  const chartData = {
    labels: expenseSummary.categoryTotals.map(item => item.category),
    datasets: [{
      data: expenseSummary.categoryTotals.map(item => item.total),
      backgroundColor: [
        '#00A651', '#0066CC', '#8b5cf6', '#f59e0b', '#10b981', '#6b7280'
      ],
      borderWidth: 0
    }]
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newTransaction = {
      id: Date.now(),
      description: formData.get('description') as string,
      amount: -(parseFloat(formData.get('amount') as string)),
      date: formData.get('date') as string,
      category: formData.get('category') as string,
    };
    setTransactions([newTransaction, ...transactions]);
    setShowModal(false);
    setEditingTransaction(null);
  };

  const handleEditTransaction = (transaction: any) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen professional-bg">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="professional-heading text-4xl">
            Expense Tracker
          </h1>
          <p className="professional-subheading text-xl">
            Monitor and manage your spending patterns
          </p>
        </div>

        {/* Expense Summary */}
        <div className="stats-grid mb-8">
          <div className="stat-card">
            <div className="stat-icon bg-red-100 text-red-600">
              <FaDollarSign />
            </div>
            <div className="stat-value text-red-600">${expenseSummary.totalExpenses.toFixed(2)}</div>
            <div className="stat-label">Total Expenses</div>
            <div className="text-xs text-gray-500 mt-1">This month</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon bg-blue-100 text-blue-600">
              <FaChartPie />
            </div>
            <div className="stat-value text-blue-600">{categories.length - 1}</div>
            <div className="stat-label">Categories</div>
            <div className="text-xs text-gray-500 mt-1">Tracked</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon bg-green-100 text-green-600">
              <FaReceipt />
            </div>
            <div className="stat-value text-green-600">{transactions.length}</div>
            <div className="stat-label">Transactions</div>
            <div className="text-xs text-gray-500 mt-1">This month</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon bg-purple-100 text-purple-600">
              <span className="text-2xl">📈</span>
            </div>
            <div className="stat-value text-purple-600">
              ${(expenseSummary.totalExpenses / 30).toFixed(2)}
            </div>
            <div className="stat-label">Avg. Daily</div>
            <div className="text-xs text-gray-500 mt-1">Spending</div>
          </div>
        </div>

        {/* Charts and Controls */}
        <div className="section-grid section-grid-2 mb-8">
          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">Expenses by Category</h3>
              <p className="chart-subtitle">Breakdown of your spending</p>
            </div>
            <div className="h-64">
              <Chart type="doughnut" data={chartData} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {expenseSummary.categoryTotals.map((item, index) => (
                <div key={item.category} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.category}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${item.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <h3 className="section-card-title">Category Breakdown</h3>
              <p className="section-card-subtitle">Spending per category with progress bars</p>
            </div>
            <div className="space-y-4">
              {expenseSummary.categoryTotals.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{item.category}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ${item.total.toFixed(2)} ({item.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="progress-professional">
                    <div 
                      className="progress-professional-bar"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-professional pl-10 pr-4 w-full"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-professional"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Add Expense Button */}
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <FaPlus className="h-4 w-4" />
            <span>Add Expense</span>
          </button>
        </div>

        {/* Transaction History */}
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Transaction History</h3>
            <p className="chart-subtitle">{filteredTransactions.length} transactions found</p>
          </div>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500 dark:text-gray-400">No transactions found for the current filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="professional-table w-full">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900 dark:text-white">{transaction.description}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge-primary">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-red-600 dark:text-red-400">
                          -${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditTransaction(transaction)}
                            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="professional-card max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="professional-heading text-lg">
                {editingTransaction ? 'Edit Transaction' : 'Add New Expense'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingTransaction(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  defaultValue={editingTransaction?.description || ''}
                  required
                  className="input-professional w-full"
                  placeholder="e.g., Grocery Store"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={editingTransaction ? Math.abs(editingTransaction.amount) : ''}
                  step="0.01"
                  min="0"
                  required
                  className="input-professional w-full"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select name="category" defaultValue={editingTransaction?.category || 'Food'} className="input-professional w-full">
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  defaultValue={editingTransaction?.date || new Date().toISOString().split('T')[0]}
                  required
                  className="input-professional w-full"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {editingTransaction ? 'Update' : 'Add'} Expense
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingTransaction(null);
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}