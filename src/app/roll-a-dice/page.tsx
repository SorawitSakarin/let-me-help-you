'use client';

import React, { useState, useEffect } from 'react';

export default function RollADice() {
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [rollsCount, setRollsCount] = useState(0);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    // Play rolling animation
    let frames = 0;
    const maxFrames = 10;
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * 6) + 1);
      frames++;
      if (frames >= maxFrames) {
        clearInterval(interval);
        setResult(Math.floor(Math.random() * 6) + 1);
        setIsRolling(false);
        setRollsCount((prev) => prev + 1);
      }
    }, 50);
  };

  const getDiceIcon = (num: number | null) => {
    switch (num) {
      case 1: return '⚀';
      case 2: return '⚁';
      case 3: return '⚂';
      case 4: return '⚃';
      case 5: return '⚄';
      case 6: return '⚅';
      default: return '⚀'; // Use consistent 8-bit style unicode character
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-2xl mx-auto w-full">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl md:text-2xl text-center">Roll a Dice</h1>
        <p className="text-sm text-gray-600 text-center">
          Simulate rolling a standard 6-sided die.
        </p>
      </div>

      <div className="nes-container with-title is-centered">
        <h2 className="title">Virtual Dice</h2>

        <div className="flex flex-col items-center gap-8 py-8">
          <div
            className={`text-9xl transition-transform duration-100 ${isRolling ? 'animate-bounce' : ''}`}
            style={{ fontSize: '8rem', lineHeight: '1' }}
          >
            {getDiceIcon(result)}
          </div>

          <div className="flex flex-col items-center gap-4">
            {result !== null && !isRolling && (
              <p className="text-lg">You rolled a <strong>{result}</strong>!</p>
            )}

            <button
              type="button"
              onClick={rollDice}
              className={`nes-btn is-primary ${isRolling ? 'is-disabled' : ''}`}
              disabled={isRolling}
            >
              {isRolling ? 'Rolling...' : 'Roll Dice'}
            </button>

            {rollsCount > 0 && !isRolling && (
              <p className="text-xs text-gray-500 mt-4">Total rolls: {rollsCount}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
