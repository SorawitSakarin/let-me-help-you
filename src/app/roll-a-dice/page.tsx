"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function RollADice() {
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(1);
  const [displayValue, setDisplayValue] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeouts/intervals on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);

    // Randomize final value
    const finalValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(finalValue);

    // Animation: change display value rapidly
    let rolls = 0;
    const maxRolls = 20; // Number of animation ticks
    const rollDelay = 50; // ms per tick

    intervalRef.current = setInterval(() => {
      setDisplayValue(Math.floor(Math.random() * 6) + 1);
      rolls++;

      if (rolls >= maxRolls) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayValue(finalValue);
        timeoutRef.current = setTimeout(() => {
          setIsRolling(false);
        }, 100);
      }
    }, rollDelay);
  };

  // Render dots based on dice value
  const renderDots = (value: number) => {
    const dots = [];
    const positions = {
      1: ['col-start-2 row-start-2'],
      2: ['col-start-1 row-start-1', 'col-start-3 row-start-3'],
      3: ['col-start-1 row-start-1', 'col-start-2 row-start-2', 'col-start-3 row-start-3'],
      4: ['col-start-1 row-start-1', 'col-start-3 row-start-1', 'col-start-1 row-start-3', 'col-start-3 row-start-3'],
      5: ['col-start-1 row-start-1', 'col-start-3 row-start-1', 'col-start-2 row-start-2', 'col-start-1 row-start-3', 'col-start-3 row-start-3'],
      6: ['col-start-1 row-start-1', 'col-start-3 row-start-1', 'col-start-1 row-start-2', 'col-start-3 row-start-2', 'col-start-1 row-start-3', 'col-start-3 row-start-3'],
    };

    const currentPositions = positions[value as keyof typeof positions] || positions[1];

    for (let i = 0; i < currentPositions.length; i++) {
      dots.push(
        <div
          key={i}
          className={`w-4 h-4 md:w-6 md:h-6 bg-black rounded-full ${currentPositions[i]} justify-self-center self-center`}
        ></div>
      );
    }
    return dots;
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Roll a Dice</h1>
        <Link href="/" className="nes-btn is-small">
          Back
        </Link>
      </div>

      <div className="nes-container is-rounded w-full flex flex-col items-center py-10">
        <div
          className={`w-32 h-32 md:w-48 md:h-48 border-4 border-black bg-white grid grid-cols-3 grid-rows-3 p-4 mb-8 transition-transform ${isRolling ? 'animate-pulse scale-95' : 'scale-100'} shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-lg`}
        >
          {renderDots(displayValue)}
        </div>

        <button
          type="button"
          className={`nes-btn is-primary is-large ${isRolling ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={rollDice}
          disabled={isRolling}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>

        {!isRolling && (
          <p className="mt-6 text-sm md:text-base">
            You rolled a <span className="font-bold text-blue-600">{diceValue}</span>!
          </p>
        )}
      </div>
    </div>
  );
}
