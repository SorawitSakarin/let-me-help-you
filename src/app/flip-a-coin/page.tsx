'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function FlipACoinPage() {
  const [result, setResult] = useState<'Heads' | 'Tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [stats, setStats] = useState({ heads: 0, tails: 0 });

  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setResult(null);

    timeoutRef.current = setTimeout(() => {
      const isHeads = Math.random() < 0.5;
      const newResult = isHeads ? 'Heads' : 'Tails';

      setResult(newResult);
      setStats(prev => ({
        ...prev,
        [newResult.toLowerCase()]: prev[newResult.toLowerCase() as keyof typeof prev] + 1
      }));
      setIsFlipping(false);
    }, 1500); // 1.5s delay for animation
  };

  const resetStats = () => {
    setStats({ heads: 0, tails: 0 });
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
          <Link href="/" className="nes-btn">
              &lt; Back to Home
          </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Coin Flipper</h2>

        <div className="flex flex-col items-center gap-8 py-4">

          <div className="h-48 w-48 flex items-center justify-center relative">
            <div
              className={`w-32 h-32 rounded-full border-4 border-black bg-yellow-400 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform duration-100 ${isFlipping ? 'animate-[spin_0.2s_linear_infinite]' : ''}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
               {!isFlipping && result && (
                  <span className="text-3xl font-bold text-black">{result === 'Heads' ? 'H' : 'T'}</span>
               )}
               {!isFlipping && !result && (
                  <span className="text-4xl text-black">?</span>
               )}
            </div>
          </div>

          <div className="h-12 flex items-center justify-center">
            {isFlipping ? (
               <span className="text-xl animate-pulse">Flipping...</span>
            ) : result ? (
               <span className={`text-2xl ${result === 'Heads' ? 'text-primary' : 'text-error'}`}>It&apos;s {result}!</span>
            ) : (
               <span className="text-xl">Click to flip the coin!</span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center w-full">
            <button
              type="button"
              className={`nes-btn is-primary ${isFlipping ? 'cursor-not-allowed opacity-50' : ''}`}
              onClick={flipCoin}
              disabled={isFlipping}
            >
              Flip Coin
            </button>
             <button
              type="button"
              className="nes-btn is-error"
              onClick={resetStats}
              disabled={isFlipping || (stats.heads === 0 && stats.tails === 0)}
            >
              Reset Stats
            </button>
          </div>

          <div className="nes-container is-rounded w-full max-w-sm mt-4">
             <p className="text-center mb-2">Statistics</p>
             <div className="flex justify-between items-center px-4">
                <div className="flex flex-col items-center">
                   <span className="text-primary">Heads</span>
                   <span className="text-2xl">{stats.heads}</span>
                </div>
                <div className="text-2xl">-</div>
                <div className="flex flex-col items-center">
                   <span className="text-error">Tails</span>
                   <span className="text-2xl">{stats.tails}</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
