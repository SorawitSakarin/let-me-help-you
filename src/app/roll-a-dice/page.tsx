'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function RollADicePage() {
  const [value, setValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const rollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);

    // Animate the rolling
    rollIntervalRef.current = setInterval(() => {
      setValue(Math.floor(Math.random() * 6) + 1);
    }, 100);

    // Stop rolling after 1.5 seconds
    timeoutRef.current = setTimeout(() => {
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
      setValue(Math.floor(Math.random() * 6) + 1);
      setIsRolling(false);
    }, 1500);
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Render dots based on dice value
  const renderDots = () => {
    const dots = [];
    // Positions for 3x3 grid (top-left, top-mid, top-right, mid-left, center, mid-right, bot-left, bot-mid, bot-right)
    const positions = [
      [4], // 1
      [0, 8], // 2
      [0, 4, 8], // 3
      [0, 2, 6, 8], // 4
      [0, 2, 4, 6, 8], // 5
      [0, 2, 3, 5, 6, 8] // 6
    ];

    const currentPositions = positions[value - 1] || [];

    for (let i = 0; i < 9; i++) {
      dots.push(
        <div
          key={i}
          className={`w-4 h-4 rounded-full sm:w-6 sm:h-6 ${currentPositions.includes(i) ? 'bg-black' : 'bg-transparent'}`}
        />
      );
    }

    return (
      <div className={`grid grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-6 bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${isRolling ? 'animate-wiggle' : ''}`}>
        {dots}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
          <Link href="/" className="nes-btn">
              &lt; Back to Home
          </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Roll a Dice</h2>

        <div className="flex flex-col items-center gap-8 py-8">

          <div className="relative w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center">
             {renderDots()}
          </div>

          <button
            type="button"
            className={`nes-btn is-primary text-lg px-8 py-4 ${isRolling ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={rollDice}
            disabled={false} // Custom NES.css disabled styling handled via classes
          >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </button>
        </div>
      </div>
    </div>
  );
}