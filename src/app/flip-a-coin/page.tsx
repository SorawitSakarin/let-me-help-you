'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type CoinSide = 'Heads' | 'Tails' | null;

export default function FlipACoinPage() {
  const [result, setResult] = useState<CoinSide>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setResult(null); // Clear previous result while flipping

    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
    }

    flipTimeoutRef.current = setTimeout(() => {
      const isHeads = Math.random() < 0.5;
      const newResult = isHeads ? 'Heads' : 'Tails';

      setResult(newResult);
      if (isHeads) {
        setHeadsCount(prev => prev + 1);
      } else {
        setTailsCount(prev => prev + 1);
      }
      setIsFlipping(false);
    }, 1500); // 1.5s delay for animation
  };

  const resetStats = () => {
    setHeadsCount(0);
    setTailsCount(0);
    setResult(null);
  };

  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
          <Link href="/" className="nes-btn">
              &lt; Back to Home
          </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Coin Flipper</h2>

        <div className="flex flex-col items-center gap-8 py-6">

          {/* Coin Visualizer */}
          <div className="flex items-center justify-center h-48 w-48 relative">
            {isFlipping ? (
               <div className="w-32 h-32 bg-yellow-400 rounded-full border-4 border-black flex items-center justify-center animate-spin">
                 <span className="text-2xl font-bold opacity-0">?</span>
               </div>
            ) : result ? (
               <div className={`w-32 h-32 ${result === 'Heads' ? 'bg-yellow-400' : 'bg-gray-300'} rounded-full border-4 border-black flex items-center justify-center animate-bounce shadow-[4px_4px_0_0_#000] transition-all`}>
                  <span className="text-xl font-bold text-black">{result === 'Heads' ? 'H' : 'T'}</span>
               </div>
            ) : (
                <div className="w-32 h-32 bg-yellow-400 rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_#000]">
                  <span className="text-2xl font-bold opacity-50">?</span>
                </div>
            )}
          </div>

          {/* Result Text */}
          <div className="h-12 flex items-center">
            {isFlipping ? (
              <span className="text-xl md:text-2xl animate-pulse">Flipping...</span>
            ) : result ? (
              <span className={`text-2xl md:text-3xl font-bold ${result === 'Heads' ? 'text-yellow-600' : 'text-gray-600'}`}>
                It's {result}!
              </span>
            ) : (
               <span className="text-xl text-gray-500">Click to flip</span>
            )}
          </div>

          {/* Action Button */}
          <button
            type="button"
            className={`nes-btn is-primary w-full max-w-xs text-lg md:text-xl py-4 ${isFlipping ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={flipCoin}
          >
            FLIP COIN
          </button>

          {/* Stats Section */}
          <div className="w-full mt-4 p-4 border-t-4 border-dashed border-gray-300 flex flex-col items-center gap-4">
             <h3 className="text-lg mb-2">Statistics</h3>
             <div className="flex gap-8 justify-center w-full">
                <div className="flex flex-col items-center">
                   <span className="text-yellow-600 mb-2">Heads</span>
                   <span className="text-2xl">{headsCount}</span>
                </div>
                <div className="flex flex-col items-center">
                   <span className="text-gray-600 mb-2">Tails</span>
                   <span className="text-2xl">{tailsCount}</span>
                </div>
             </div>
             <button
               type="button"
               className="nes-btn is-error is-small mt-4"
               onClick={resetStats}
             >
               Reset Stats
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}
