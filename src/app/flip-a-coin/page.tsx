'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type CoinSide = 'Heads' | 'Tails' | null;

export default function FlipACoinPage() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<CoinSide>(null);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setResult(null);

    // Simulate 1.5s timeout for animation
    setTimeout(() => {
      const isHeads = Math.random() < 0.5;
      const newResult = isHeads ? 'Heads' : 'Tails';

      setResult(newResult);
      if (isHeads) {
        setHeadsCount(prev => prev + 1);
      } else {
        setTailsCount(prev => prev + 1);
      }
      setIsFlipping(false);
    }, 1500);
  };

  const resetStats = () => {
    setHeadsCount(0);
    setTailsCount(0);
    setResult(null);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full pb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl md:text-2xl mb-2">Coin Flipper</h1>
          <p className="text-sm text-gray-600">
            Flip a virtual coin instantly.
          </p>
        </div>
        <Link href="/" className="nes-btn is-error px-3 py-1 text-sm shrink-0">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered p-4 md:p-8">
        <h2 className="title" style={{ background: 'var(--surface)' }}>Flip the Coin</h2>

        <div className="flex flex-col gap-8 items-center mt-4">

          {/* Coin Visual */}
          <div
            className={`
              relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 flex items-center justify-center
              ${isFlipping ? 'animate-[spin_0.2s_linear_infinite]' : ''}
              ${result === 'Heads' ? 'bg-yellow-400 border-yellow-600' : result === 'Tails' ? 'bg-gray-300 border-gray-500' : 'bg-yellow-400 border-yellow-600'}
              transition-colors duration-300
            `}
          >
            {/* Inner coin detail */}
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-2 border-dashed flex items-center justify-center border-black opacity-50">
               {/* Display */}
               <span className="text-black text-2xl md:text-4xl font-bold">
                 {isFlipping ? '...' : result === 'Heads' ? 'H' : result === 'Tails' ? 'T' : '?'}
               </span>
            </div>
          </div>

          <div className="text-xl md:text-2xl font-bold min-h-[2rem]">
            {isFlipping ? 'Flipping...' : result ? `It's ${result}!` : 'Ready to flip?'}
          </div>

          <div className="w-full flex flex-col gap-4 max-w-md">
            <div className="flex gap-4 justify-center mt-2">
              <button
                type="button"
                className={`nes-btn w-full md:w-auto ${
                   isFlipping ? 'is-disabled' : 'is-primary'
                }`}
                onClick={flipCoin}
                disabled={isFlipping}
              >
                Flip Coin
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="w-full max-w-md mt-6">
            <div className="nes-container with-title text-sm p-4">
               <p className="title">Stats</p>
               <div className="flex justify-between items-center mb-2">
                  <span>Heads: {headsCount}</span>
                  <span>Tails: {tailsCount}</span>
               </div>
               <div className="flex justify-between items-center text-gray-500 mb-4">
                  <span>Total: {headsCount + tailsCount}</span>
               </div>
               <button
                  type="button"
                  className="nes-btn is-warning w-full text-xs"
                  onClick={resetStats}
                  disabled={isFlipping || (headsCount === 0 && tailsCount === 0)}
               >
                 Reset Stats
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
