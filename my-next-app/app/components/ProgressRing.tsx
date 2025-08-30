// components/ProgressRing.tsx
import React from 'react';

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number; // 0-100
  color: string;
  backgroundColor?: string;
}

export default function ProgressRing({ radius, stroke, progress, color, backgroundColor = 'var(--secondary)' }: ProgressRingProps) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="transform -rotate-90" // Start at the top
    >
      <circle
        stroke={backgroundColor}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeLinecap="round"
        className="transition-all duration-500 ease-out"
      />
    </svg>
  );
}