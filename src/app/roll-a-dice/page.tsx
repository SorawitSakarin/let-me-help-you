'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RollADicePage() {
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setResult(null);

    // Simulate rolling animation
    let rolls = 0;
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * 6) + 1);
      rolls++;
      if (rolls >= 10) {
        clearInterval(interval);
        setResult(Math.floor(Math.random() * 6) + 1);
        setIsRolling(false);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/" className="nes-btn is-primary">
          &lt; Back
        </Link>
        <h1 className="title text-xl md:text-2xl m-0">Roll a Dice</h1>
      </div>

      <div className="nes-container with-title">
        <h2 className="title">Virtual Dice</h2>

        <div className="flex flex-col items-center gap-8 py-8">
          <div
            className={`w-32 h-32 flex items-center justify-center border-4 border-black bg-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isRolling ? 'animate-bounce' : ''}`}
          >
            {result ? (
              <span className="text-6xl font-bold">{result}</span>
            ) : (
              <span className="text-6xl text-gray-300">?</span>
            )}
          </div>

          <button
            type="button"
            onClick={rollDice}
            className={`nes-btn is-success text-lg px-8 py-4 ${isRolling ? 'is-disabled' : ''}`}
            disabled={isRolling}
          >
            {isRolling ? 'Rolling...' : 'Roll Dice!'}
          </button>
        </div>
      </div>

      <div className="nes-container is-rounded bg-blue-50">
        <p className="text-sm">
          <strong>How it works:</strong> Click the button to roll a standard 6-sided die. A random number between 1 and 6 will be generated using a pseudo-random number generator algorithm.
        </p>
      </div>
    </div>
  );
}
