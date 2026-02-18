"use client";
import React, { useEffect, useState } from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
}

export default function FloatingElement({ children, delay = 0 }: FloatingElementProps) {
  const [randomDelay, setRandomDelay] = useState(delay);

  useEffect(() => {
    // Add a random offset to the delay if no explicit delay is set, to avoid sync
    if (delay === 0) {
      setRandomDelay(Math.random() * 2);
    }
  }, [delay]);

  return (
    <div className="animate-float" style={{ animationDelay: `${randomDelay}s` }}>
      {children}
    </div>
  );
}
