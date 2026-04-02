'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type CoinResult = 'Heads' | 'Tails' | null;

export default function FlipACoinPage() {
  const [result, setResult] = useState<CoinResult>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);

    // Simulate flipping delay
    setTimeout(() => {
      // Use pseudo-random number generator to determine result
      const isHeads = Math.random() < 0.5;
      const newResult = isHeads ? 'Heads' : 'Tails';

      setResult(newResult);
      if (isHeads) {
        setHeadsCount((prev) => prev + 1);
      } else {
        setTailsCount((prev) => prev + 1);
      }

      setIsFlipping(false);
    }, 800);
  };

  const handleReset = () => {
    setResult(null);
    setHeadsCount(0);
    setTailsCount(0);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full pb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl md:text-2xl mb-2">Coin Flipper</h1>
          <p className="text-sm text-gray-600">
            Flip a coin to make a quick decision.
          </p>
        </div>
        <Link href="/" className="nes-btn is-error px-3 py-1 text-sm shrink-0">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered p-4 md:p-8">
        <h2 className="title" style={{ background: 'var(--surface)' }}>The Coin</h2>

        <div className="flex flex-col gap-8 items-center mt-4">

          {/* Coin Visual */}
          <div
            className={`
              relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-yellow-400 flex items-center justify-center
              shadow-[inset_-10px_-10px_20px_rgba(200,150,0,0.6),10px_10px_20px_rgba(0,0,0,0.3)] border-4 border-yellow-600
              ${isFlipping ? 'animate-spin' : ''}
              transition-transform duration-300
            `}
            style={{
               animationDuration: '0.4s'
            }}
          >
             {/* Inner circle pattern */}
             <div className="absolute w-[85%] h-[85%] rounded-full border-2 border-dashed border-yellow-600 opacity-50 pointer-events-none"></div>

             {/* Text display */}
             <div className={`text-3xl md:text-4xl font-bold text-yellow-900 ${isFlipping ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
                {result ? (result === 'Heads' ? 'H' : 'T') : '?'}
             </div>

             {/* Detailed text for specific result */}
             {!isFlipping && result && (
               <div className="absolute bottom-4 text-xs font-bold text-yellow-800 tracking-wider uppercase">
                  {result}
               </div>
             )}
          </div>

          <div className="h-8 flex items-center justify-center">
             {!isFlipping && result && (
                 <p className="text-xl md:text-2xl font-bold animate-pulse">It&apos;s {result}!</p>
             )}
             {isFlipping && (
                 <p className="text-gray-500 animate-pulse">Flipping...</p>
             )}
          </div>

          <div className="w-full flex flex-col gap-6 max-w-md mt-2">

            <div className="flex gap-4 justify-center">
              <button
                type="button"
                className={`nes-btn flex-grow md:flex-grow-0 md:px-8 ${
                   isFlipping ? 'is-disabled opacity-70 cursor-not-allowed' : 'is-warning'
                }`}
                onClick={flipCoin}
                disabled={isFlipping}
              >
                Flip Coin
              </button>
              <button
                type="button"
                className="nes-btn is-error px-4"
                onClick={handleReset}
                disabled={isFlipping || (headsCount === 0 && tailsCount === 0)}
                style={{ opacity: isFlipping || (headsCount === 0 && tailsCount === 0) ? 0.5 : 1, cursor: isFlipping || (headsCount === 0 && tailsCount === 0) ? 'not-allowed' : 'auto' }}
              >
                Reset
              </button>
            </div>

            {/* Stats */}
            <div className="nes-container is-rounded mt-4 p-4 text-sm bg-gray-50 flex justify-between items-center">
                <div className="text-center">
                   <p className="mb-1 text-gray-500">Heads</p>
                   <p className="font-bold text-lg">{headsCount}</p>
                </div>
                <div className="text-center font-bold text-gray-300">
                   VS
                </div>
                <div className="text-center">
                   <p className="mb-1 text-gray-500">Tails</p>
                   <p className="font-bold text-lg">{tailsCount}</p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}