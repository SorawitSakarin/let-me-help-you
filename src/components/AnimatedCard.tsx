import React from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number; // in seconds
  className?: string;
}

export default function AnimatedCard({ children, delay = 0, className = "" }: AnimatedCardProps) {
  return (
    <div
      className={`animate-fade-in-up opacity-0 ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
