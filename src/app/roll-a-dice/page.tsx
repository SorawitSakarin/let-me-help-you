'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RollADicePage() {
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    // Simulate rolling delay
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newValue);
      setIsRolling(false);
    }, 500);
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

        <div className="flex flex-col items-center gap-6 py-4">
          <div className="text-xl md:text-2xl flex items-center gap-4 text-blue-500">
            <span>Result:</span>
          </div>

          <div
            className={`w-32 h-32 md:w-48 md:h-48 border-4 border-black bg-white flex items-center justify-center text-6xl md:text-8xl font-bold ${
              isRolling ? 'animate-bounce opacity-50' : ''
            }`}
          >
            {isRolling ? '?' : diceValue}
          </div>

          <button
            type="button"
            className={`nes-btn is-primary mt-4 ${
              isRolling ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={rollDice}
          >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </button>
        </div>
      </div>
    </div>
  );
}
