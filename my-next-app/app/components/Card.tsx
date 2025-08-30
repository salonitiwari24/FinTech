// components/Card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function Card({ children, className = "", title, subtitle }: CardProps) {
  return (
    <div className={`professional-card p-6 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6 text-center">
          {title && (
            <h3 className="professional-heading text-xl mb-2">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="professional-subheading text-base">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}