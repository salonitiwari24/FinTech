// components/Chart.tsx
"use client";

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  type: "line" | "bar" | "doughnut";
  data: any;
  options?: any;
}

export default function Chart({ type, data, options }: ChartProps) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'var(--foreground)', // Use CSS variable for text color
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            } else if (context.parsed) { // For Doughnut chart
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.toFixed(2));
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'var(--secondary)', // Use CSS variable for tick color
        },
        grid: {
          color: 'rgba(var(--secondary-rgb), 0.1)', // Light grid lines
        },
      },
      y: {
        ticks: {
          color: 'var(--secondary)', // Use CSS variable for tick color
          callback: function(value) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
          }
        },
        grid: {
          color: 'rgba(var(--secondary-rgb), 0.1)',
        },
      },
    }
  };

  const chartComponent = () => {
    switch (type) {
      case "line":
        return <Line data={data} options={{ ...defaultOptions, ...options }} />;
      case "bar":
        return <Bar data={data} options={{ ...defaultOptions, ...options }} />;
      case "doughnut":
        // Doughnut chart doesn't need scales
        return <Doughnut data={data} options={{
          ...defaultOptions,
          scales: undefined, // No scales for doughnut
          plugins: {
            ...defaultOptions.plugins,
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
                        }
                        return label;
                    }
                }
            }
          }
         }} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-64 w-full"> {/* Set a fixed height for charts */}
      {chartComponent()}
    </div>
  );
}