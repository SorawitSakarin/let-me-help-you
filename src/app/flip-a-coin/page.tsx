'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function FlipACoinPage() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'Heads' | 'Tails' | null>(null);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setResult(null); // Clear previous result to trigger CSS animation on flip

    // Add a random delay to simulate flipping
    const flipDuration = 1000 + Math.random() * 500;

    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setResult(outcome);
      if (outcome === 'Heads') {
        setHeadsCount(prev => prev + 1);
      } else {
        setTailsCount(prev => prev + 1);
      }
      setIsFlipping(false);
    }, flipDuration);
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
          <h1 className="text-xl md:text-2xl mb-2">Flip a Coin</h1>
          <p className="text-sm text-gray-600">
            Heads or Tails? Let the coin decide.
          </p>
        </div>
        <Link href="/" className="nes-btn is-error px-3 py-1 text-sm shrink-0">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered p-4 md:p-8">
        <h2 className="title" style={{ background: 'var(--surface)' }}>Coin Flipper</h2>

        <div className="flex flex-col gap-8 items-center mt-4">

          {/* Coin Visual Area */}
          <div className="flex items-center justify-center min-h-[200px]">
            {isFlipping ? (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-yellow-400 border-4 border-yellow-600 flex items-center justify-center shadow-lg animate-spin">
                <span className="text-yellow-800 font-bold text-xl md:text-2xl">?</span>
              </div>
            ) : result ? (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-yellow-400 border-4 border-yellow-600 flex flex-col items-center justify-center shadow-lg transition-transform duration-300 transform scale-100">
                <span className="text-yellow-900 font-bold text-xl md:text-2xl uppercase tracking-widest">{result}</span>
              </div>
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-300 border-4 border-gray-400 flex items-center justify-center shadow-lg cursor-pointer" onClick={flipCoin}>
                 <span className="text-gray-600 font-bold text-sm text-center px-4">Click to Flip</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center w-full max-w-md">
            <button
              type="button"
              className={`nes-btn w-full ${isFlipping ? 'is-disabled' : 'is-warning'}`}
              onClick={flipCoin}
              disabled={isFlipping}
            >
              {isFlipping ? 'Flipping...' : 'Flip Coin'}
            </button>
          </div>

          {/* Statistics */}
          <div className="w-full max-w-md mt-4 nes-container is-rounded p-4">
             <div className="flex justify-between items-center mb-2 border-b-2 border-dashed border-gray-300 pb-2">
                 <h3 className="text-sm font-bold">Stats</h3>
                 <button className="nes-btn is-error text-[10px] px-2 py-1" onClick={resetStats} disabled={isFlipping}>Reset</button>
             </div>
             <div className="flex justify-around text-sm">
                <div className="text-center">
                    <div className="font-bold text-gray-500 mb-1">Heads</div>
                    <div className="text-xl">{headsCount}</div>
                </div>
                <div className="text-center">
                    <div className="font-bold text-gray-500 mb-1">Tails</div>
                    <div className="text-xl">{tailsCount}</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}