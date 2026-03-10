'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function RollADicePage() {
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);

    // Animate the dice for 1.5s
    intervalRef.current = setInterval(() => {
        setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      setIsRolling(false);
    }, 1500);
  };

  const renderDots = (value: number) => {
    const dotClasses = "w-3 h-3 md:w-4 md:h-4 bg-black rounded-full absolute";
    const dots = [];

    // Top-left
    if ([2, 3, 4, 5, 6].includes(value)) {
        dots.push(<div key="tl" className={`${dotClasses} top-[15%] left-[15%]`}></div>);
    }
    // Top-right
    if ([4, 5, 6].includes(value)) {
        dots.push(<div key="tr" className={`${dotClasses} top-[15%] right-[15%]`}></div>);
    }
    // Middle-left
    if ([6].includes(value)) {
        dots.push(<div key="ml" className={`${dotClasses} top-[50%] left-[15%] -translate-y-1/2`}></div>);
    }
    // Center
    if ([1, 3, 5].includes(value)) {
        dots.push(<div key="c" className={`${dotClasses} top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2`}></div>);
    }
    // Middle-right
    if ([6].includes(value)) {
        dots.push(<div key="mr" className={`${dotClasses} top-[50%] right-[15%] -translate-y-1/2`}></div>);
    }
    // Bottom-left
    if ([4, 5, 6].includes(value)) {
        dots.push(<div key="bl" className={`${dotClasses} bottom-[15%] left-[15%]`}></div>);
    }
    // Bottom-right
    if ([2, 3, 4, 5, 6].includes(value)) {
        dots.push(<div key="br" className={`${dotClasses} bottom-[15%] right-[15%]`}></div>);
    }

    return dots;
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full pb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl md:text-2xl mb-2">Roll a Dice</h1>
          <p className="text-sm text-gray-600">
            Roll a virtual 6-sided dice.
          </p>
        </div>
        <Link href="/" className="nes-btn is-error px-3 py-1 text-sm shrink-0">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered p-4 md:p-8">
        <h2 className="title" style={{ background: 'var(--surface)' }}>The Dice</h2>

        <div className="flex flex-col gap-8 items-center mt-4">

          {/* Dice Visual */}
          <div
            className={`
              relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl border-4 border-black
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              ${isRolling ? 'animate-[spin_0.2s_linear_infinite]' : ''}
              transition-transform duration-300
            `}
          >
              {renderDots(diceValue)}
          </div>

          <div className="w-full flex flex-col gap-4 max-w-md mt-4 items-center">
             <p className="text-xl md:text-2xl font-bold h-8 flex items-center justify-center">
                {isRolling ? 'Rolling...' : `You rolled a ${diceValue}!`}
             </p>

            <div className="flex justify-center mt-2 w-full">
              <button
                type="button"
                className={`nes-btn is-primary w-full md:w-auto ${
                   isRolling ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={rollDice}
              >
                Roll Dice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}