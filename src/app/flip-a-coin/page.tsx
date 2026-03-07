'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function FlipACoinPage() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'Heads' | 'Tails' | null>(null);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  const handleFlip = () => {
    setIsFlipping(true);
    setResult(null);

    // Simulate flipping time
    setTimeout(() => {
      const isHeads = Math.random() < 0.5;
      const newResult = isHeads ? 'Heads' : 'Tails';
      setResult(newResult);
      if (isHeads) {
        setHeadsCount((prev) => prev + 1);
      } else {
        setTailsCount((prev) => prev + 1);
      }
      setIsFlipping(false);
    }, 1500);
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
            Flip a virtual coin for heads or tails.
          </p>
        </div>
        <Link href="/" className="nes-btn is-error px-3 py-1 text-sm shrink-0">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered p-4 md:p-8">
        <h2 className="title" style={{ background: 'var(--surface)' }}>Flip a Coin</h2>

        <div className="flex flex-col gap-8 items-center mt-4">
          {/* Coin Visual */}
          <div className="flex items-center justify-center h-48 w-48 relative">
            <div
              className={`
                w-32 h-32 rounded-full border-4 border-yellow-500 bg-yellow-300 flex items-center justify-center shadow-lg
                transition-transform duration-[1500ms]
                ${isFlipping ? 'animate-[spin_0.2s_linear_infinite] opacity-80' : ''}
              `}
              style={{
                boxShadow: 'inset 0 0 20px rgba(200, 150, 0, 0.5), 0 5px 15px rgba(0, 0, 0, 0.2)'
              }}
            >
              {!isFlipping && result ? (
                <span className="text-yellow-800 font-bold text-2xl font-sans drop-shadow-sm">
                  {result === 'Heads' ? 'H' : 'T'}
                </span>
              ) : (
                <i className="nes-icon coin is-large"></i>
              )}
            </div>
          </div>

          <div className="h-10 flex items-center justify-center">
            {result && !isFlipping && (
              <p className="text-xl animate-[pulse_0.5s_ease-in-out_1]">
                It&apos;s <span className={result === 'Heads' ? 'text-blue-600' : 'text-red-600'}>{result}</span>!
              </p>
            )}
            {isFlipping && <p className="text-xl">Flipping...</p>}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className={`nes-btn w-full md:w-auto ${
                isFlipping ? 'is-disabled' : 'is-primary'
              }`}
              onClick={handleFlip}
              disabled={isFlipping}
            >
              Flip Coin
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="nes-container with-title p-4">
        <h3 className="title" style={{ background: 'var(--surface)' }}>Stats</h3>
        <div className="flex flex-col md:flex-row justify-around items-center gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Heads</p>
            <p className="text-2xl text-blue-600">{headsCount}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Tails</p>
            <p className="text-2xl text-red-600">{tailsCount}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Total</p>
            <p className="text-2xl">{headsCount + tailsCount}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="nes-btn is-warning text-sm px-4 py-1"
            onClick={handleReset}
            disabled={isFlipping || (headsCount === 0 && tailsCount === 0)}
          >
            Reset Stats
          </button>
        </div>
      </div>
    </div>
  );
}
