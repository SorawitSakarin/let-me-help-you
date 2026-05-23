'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type CoinResult = 'Heads' | 'Tails' | null;

export default function CoinFlipperPage() {
  const [result, setResult] = useState<CoinResult>(null);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [headsCount, setHeadsCount] = useState<number>(0);
  const [tailsCount, setTailsCount] = useState<number>(0);

  // Use refs to manage timeouts so they can be cleaned up
  const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

  const handleFlip = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setResult(null); // Clear previous result during animation

    // Simulate coin toss delay
    flipTimeoutRef.current = setTimeout(() => {
      const toss = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setResult(toss);
      if (toss === 'Heads') {
        setHeadsCount((prev) => prev + 1);
      } else {
        setTailsCount((prev) => prev + 1);
      }
      setIsFlipping(false);
    }, 1500); // 1.5s delay as mentioned in memory
  };

  const handleResetStats = () => {
    setHeadsCount(0);
    setTailsCount(0);
    setResult(null);
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
    }
    setIsFlipping(false);
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

          {/* Visual Coin Area */}
          <div className="h-40 flex items-center justify-center">
            {isFlipping ? (
              <div className="animate-spin duration-700">
                 <i className="nes-icon coin is-large"></i>
              </div>
            ) : result ? (
              <div className="flex flex-col items-center animate-pulse">
                 <i className="nes-icon coin is-large"></i>
                 <span className="mt-4 text-2xl text-blue-500 font-bold">{result}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center opacity-50">
                 <i className="nes-icon coin is-large"></i>
                 <span className="mt-4 text-xl">Ready to flip...</span>
              </div>
            )}
          </div>

          <div className="flex gap-4 w-full justify-center">
             <button
                type="button"
                className={`nes-btn w-full max-w-[200px] ${isFlipping ? 'cursor-not-allowed opacity-50 is-disabled' : 'is-primary'}`}
                onClick={handleFlip}
             >
               {isFlipping ? 'Flipping...' : 'Flip Coin'}
             </button>
          </div>

          {/* Statistics Tracking */}
          <div className="w-full nes-container is-rounded bg-gray-50 mt-4">
            <h3 className="text-center mb-4">Statistics</h3>
            <div className="flex justify-around items-center w-full mb-4">
               <div className="text-center">
                 <span className="block text-green-600 mb-2">Heads</span>
                 <span className="text-2xl">{headsCount}</span>
               </div>
               <div className="text-center">
                 <span className="block text-red-600 mb-2">Tails</span>
                 <span className="text-2xl">{tailsCount}</span>
               </div>
            </div>

            <div className="text-center mt-6">
                <button
                    type="button"
                    className="nes-btn is-error w-full sm:w-auto text-sm"
                    onClick={handleResetStats}
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
