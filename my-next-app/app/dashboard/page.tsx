"use client";

import { useState } from "react";

export default function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Financial Dashboard
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <p className="text-lg text-gray-600 mb-4">
            Dashboard is working! 🎉
          </p>
          
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Clicked {count} times
          </button>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Income</h3>
              <p className="text-2xl font-bold text-green-600">$2,500</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800">Expenses</h3>
              <p className="text-2xl font-bold text-red-600">$1,200</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Savings</h3>
              <p className="text-2xl font-bold text-blue-600">$1,300</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
