"use client";

import Link from "next/link";
import { FaChartLine, FaShieldAlt, FaRobot, FaChartPie } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen professional-bg relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-8xl text-primary">📈</div>
        <div className="absolute top-40 right-32 text-6xl text-secondary">💰</div>
        <div className="absolute bottom-32 left-32 text-7xl text-primary">📊</div>
        <div className="absolute bottom-20 right-20 text-8xl text-secondary">💎</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="mb-8">
            <div className="text-8xl mb-6">📈</div>
            <h1 className="professional-heading text-5xl md:text-7xl mb-6">
              FinCopilot
            </h1>
            <p className="professional-subheading text-xl md:text-2xl mb-8">
              Your AI-Powered Financial Command Center
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Experience the future of personal finance with intelligent insights, 
              automated budgeting, and AI-driven investment recommendations. 
              Built for the modern investor who demands excellence.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <button className="btn-primary text-lg px-8 py-4">
                Get Started
              </button>
            </Link>
            <Link href="/profile">
              <button className="btn-secondary text-lg px-8 py-4">
                My Account
              </button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="section-grid section-grid-4 max-w-6xl mx-auto mb-16">
          <div className="section-card text-center">
            <div className="text-4xl mb-4 text-primary">📈</div>
            <FaChartLine className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="section-card-title">Smart Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced financial insights with AI-powered pattern recognition
            </p>
          </div>

          <div className="section-card text-center">
            <div className="text-4xl mb-4 text-secondary">🛡️</div>
            <FaShieldAlt className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="section-card-title">Risk Management</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Proactive risk detection and mitigation strategies
            </p>
          </div>

          <div className="section-card text-center">
            <div className="text-4xl mb-4 text-primary">🤖</div>
            <FaRobot className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="section-card-title">AI Predictions</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Machine learning forecasts for smarter financial decisions
            </p>
          </div>

          <div className="section-card text-center">
            <div className="text-4xl mb-4 text-secondary">📊</div>
            <FaChartPie className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="section-card-title">Portfolio Tracking</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive investment monitoring and analysis
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="professional-heading text-3xl mb-8">
            Trusted by Financial Professionals
          </h2>
          <div className="section-grid section-grid-3">
            <div className="section-card">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="section-card-title">Bank-Grade Security</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enterprise-level encryption and security protocols
              </p>
            </div>
            
            <div className="section-card">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="section-card-title">Real-Time Updates</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Live market data and instant notifications
              </p>
            </div>
            
            <div className="section-card">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="section-card-title">Personalized Insights</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tailored recommendations based on your goals
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="section-card max-w-2xl mx-auto">
            <h3 className="section-card-title text-2xl mb-4">
              Ready to Transform Your Finances?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Join thousands of users who have already taken control of their financial future
            </p>
            <Link href="/dashboard">
              <button className="btn-primary text-lg px-8 py-4">
                Launch FinCopilot
              </button>
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 FinCopilot. All rights reserved.</p>
            <p className="mt-2">
              <span className="font-medium">AI-Powered Finance</span> • 
              <span className="mx-2">📈</span> 
              <span className="font-medium">Trusted Financial Technology</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
