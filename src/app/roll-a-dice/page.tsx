'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RollADicePage() {
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    // Simulate a roll
    const duration = 1000;
    const intervalTime = 100;
    const endTime = Date.now() + duration;

    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      if (Date.now() > endTime) {
        clearInterval(interval);
        setDiceValue(Math.floor(Math.random() * 6) + 1); // Final value
        setIsRolling(false);
      }
    }, intervalTime);
  };

  const renderDiceFace = (value: number | null) => {
    if (value === null) {
      return (
        <div className="w-32 h-32 md:w-48 md:h-48 border-4 border-black bg-white flex items-center justify-center rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-4xl text-gray-300">?</span>
        </div>
      );
    }

    const dotClass = "w-4 h-4 md:w-6 md:h-6 bg-black rounded-full";
    const dotGrid = (dots: number[]) => (
      <div className="grid grid-cols-3 grid-rows-3 gap-2 md:gap-4 p-4 md:p-6 w-32 h-32 md:w-48 md:h-48 border-4 border-black bg-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {Array(9).fill(null).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
             {dots.includes(i) && <div className={dotClass} />}
          </div>
        ))}
      </div>
    );

    // Grid positions:
    // 0 1 2
    // 3 4 5
    // 6 7 8
    switch (value) {
      case 1: return dotGrid([4]);
      case 2: return dotGrid([0, 8]);
      case 3: return dotGrid([0, 4, 8]);
      case 4: return dotGrid([0, 2, 6, 8]);
      case 5: return dotGrid([0, 2, 4, 6, 8]);
      case 6: return dotGrid([0, 2, 3, 5, 6, 8]);
      default: return dotGrid([]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Roll a Dice</h2>

        <div className="flex flex-col items-center gap-8 py-8">

          <div className={`transition-transform duration-100 ${isRolling ? 'animate-bounce' : ''}`}>
             {renderDiceFace(diceValue)}
          </div>

          <div className="text-xl h-8">
             {diceValue !== null && !isRolling ? `You rolled a ${diceValue}!` : ' '}
          </div>

          <button
            type="button"
            className={`nes-btn is-primary ${isRolling ? 'is-disabled' : ''}`}
            onClick={rollDice}
            disabled={isRolling}
          >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </button>
        </div>
      </div>
    </div>
  );
}
