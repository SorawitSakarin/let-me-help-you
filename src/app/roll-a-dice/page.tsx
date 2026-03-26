'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RollADicePage() {
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setDiceValue(null);

    // Simulate rolling animation
    let rolls = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rolls++;
      if (rolls >= 10) {
        clearInterval(interval);
        // Final value
        setDiceValue(Math.floor(Math.random() * 6) + 1);
        setIsRolling(false);
      }
    }, 50);
  };

  const getDiceFace = (value: number | null) => {
    if (value === null) return '?';
    // Optionally use Unicode dice characters: ⚀ ⚁ ⚂ ⚃ ⚄ ⚅
    const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return faces[value - 1];
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

        <div className="flex flex-col items-center gap-6 py-8">
          <div className={`text-9xl md:text-[12rem] flex items-center justify-center leading-none select-none h-40 md:h-56 ${isRolling ? 'animate-pulse' : ''}`}>
            {getDiceFace(diceValue)}
          </div>

          <div className="text-xl md:text-2xl h-8">
            {diceValue && !isRolling ? `You rolled a ${diceValue}!` : isRolling ? 'Rolling...' : 'Click to roll'}
          </div>

          <button
            type="button"
            className={`nes-btn is-primary mt-4 ${isRolling ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={rollDice}
          >
            Roll Dice
          </button>
        </div>
      </div>
    </div>
  );
}
