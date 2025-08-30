# 💰 AI Financial Copilot

A Next.js application that serves as your personal finance AI assistant. This app not only tracks and categorizes expenses but also predicts future spending, flags potential risks, and auto-optimizes savings and investments.

## Features

### 📊 Expense Tracking & Categorization
- **Smart Categorization**: Automatically categorizes your transactions
- **Visual Analytics**: Interactive charts and graphs to visualize spending patterns
- **Custom Categories**: Create and manage custom expense categories

### 🔮 Predictive Financial Analysis
- **Spending Forecasts**: AI-powered predictions of future expenses
- **Budget Recommendations**: Personalized budget suggestions based on spending habits
- **Cash Flow Projections**: Visualize your future financial position

### ⚠️ Risk Detection
- **Unusual Activity Alerts**: Get notified of suspicious transactions
- **Overspending Warnings**: Receive alerts when approaching budget limits
- **Subscription Monitoring**: Track recurring payments and identify unused services

### 💹 Investment Optimization
- **Portfolio Analysis**: AI-driven insights on your investment portfolio
- **Auto-Investment Suggestions**: Personalized investment recommendations
- **Savings Optimization**: Smart strategies to maximize your savings

## 🚀 Getting Started

### Installation

1. Navigate to the my-next-app directory:
```bash
cd my-next-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
my-next-app/
├── app/
│   ├── api/
│   │   ├── transactions/
│   │   │   └── route.ts          # Transaction processing endpoints
│   │   ├── predictions/
│   │   │   └── route.ts          # Financial prediction endpoints
│   │   └── investments/
│   │       └── route.ts          # Investment optimization endpoints
│   ├── styles/                   # Application styles
│   ├── components/               # Reusable UI components
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main dashboard interface
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript configuration
```

## 🎯 How to Use

### Expense Tracking
1. Connect your bank accounts or manually input transactions
2. View automatically categorized expenses on your dashboard
3. Analyze spending patterns with interactive visualizations

### Financial Predictions
1. Access the "Predictions" tab to view future spending forecasts
2. Adjust parameters to see different financial scenarios
3. Receive personalized recommendations to improve financial health

### Risk Management
1. Set up notification preferences for different risk types
2. Review flagged transactions and spending alerts
3. Take action on identified financial risks

### Investment Optimization
1. Connect investment accounts or manually input portfolio details
2. View AI-generated analysis of your current investments
3. Explore recommended portfolio adjustments and savings strategies

## 🤖 AI Model

This application uses Ollama with advanced language models for financial analysis and predictions. Make sure you have Ollama installed and the appropriate model downloaded:

```bash
ollama pull llama3.2:1b
```

## 🔒 Security

- All financial data is encrypted and stored securely
- No sensitive information is shared with third parties
- Regular security audits and updates

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: React Icons
- **Database**: Prisma with SQLite
- **Authentication**: NextAuth.js
- **AI**: Ollama integration

## 📱 Pages

- **Dashboard**: Main financial overview with charts and insights
- **Expenses**: Detailed expense tracking and categorization
- **Investments**: Portfolio analysis and optimization
- **Savings**: Goal tracking and savings strategies
- **Risks**: Risk assessment and alerts
- **Predictions**: AI-powered financial forecasting

## 🎨 Theme

The application features a professional green/blue/black color scheme with:
- Modern grid-based layouts
- Center-aligned headings
- Professional financial dashboard design
- Responsive design for all devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
