'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

export default function RollADicePage() {
  const [diceCount, setDiceCount] = useState<number>(1);
  const [diceValues, setDiceValues] = useState<number[]>([1]);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const handleRoll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);

    // Simulate rolling animation with rapid updates
    let rolls = 0;
    const maxRolls = 10;
    const interval = setInterval(() => {
      setDiceValues(Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1));
      rolls++;
      if (rolls >= maxRolls) {
        clearInterval(interval);
        // Final values
        setDiceValues(Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1));
        setIsRolling(false);
      }
    }, 50); // 50ms per frame
  }, [diceCount, isRolling]);

  const total = diceValues.reduce((sum, val) => sum + val, 0);

  // Helper to draw a die face based on value
  const renderDieFace = (value: number) => {
    // A simple representation of dots using CSS Grid or Flexbox.
    // For simplicity, let's use a 3x3 grid for the dots.
    const dotMap: Record<number, boolean[]> = {
      1: [false, false, false, false, true, false, false, false, false],
      2: [true, false, false, false, false, false, false, false, true],
      3: [true, false, false, false, true, false, false, false, true],
      4: [true, false, true, false, false, false, true, false, true],
      5: [true, false, true, false, true, false, true, false, true],
      6: [true, false, true, true, false, true, true, false, true],
    };

    const dots = dotMap[value] || dotMap[1];

    return (
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 bg-white border-4 border-black rounded-lg p-2 grid grid-cols-3 grid-rows-3 gap-1 place-items-center"
        style={{
          boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
        }}
      >
        {dots.map((isDot, index) => (
          <div key={index} className="w-full h-full flex items-center justify-center">
             {isDot && <div className="w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full" />}
          </div>
        ))}
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

        <div className="flex flex-col items-center gap-8 py-4">

          {/* Controls */}
          <div className="w-full bg-gray-100 p-4 border-4 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="dice-count" className="mb-0 text-sm whitespace-nowrap">Number of Dice:</label>
              <div className="nes-select">
                <select
                  id="dice-count"
                  value={diceCount}
                  onChange={(e) => {
                    const newCount = parseInt(e.target.value, 10);
                    setDiceCount(newCount);
                    setDiceValues(Array(newCount).fill(1));
                  }}
                  disabled={isRolling}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              className={`nes-btn is-primary whitespace-nowrap ${isRolling ? 'is-disabled' : ''}`}
              onClick={handleRoll}
              disabled={isRolling}
            >
              {isRolling ? 'Rolling...' : 'Roll!'}
            </button>
          </div>

          {/* Dice Display */}
          <div className="flex flex-wrap items-center justify-center gap-6 min-h-[120px] p-4">
            {diceValues.map((val, idx) => (
                <div key={idx} className={`${isRolling ? 'animate-bounce' : ''}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                    {renderDieFace(val)}
                </div>
            ))}
          </div>

          {/* Results Display */}
          <div className="nes-container is-rounded w-full max-w-sm text-center bg-white mt-4">
              <p className="text-sm text-gray-500 mb-2">Total Value</p>
              <p className="text-4xl text-blue-600 font-bold">{total}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
