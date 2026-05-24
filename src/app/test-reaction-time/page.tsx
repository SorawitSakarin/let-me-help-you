'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type GameState = 'idle' | 'waiting' | 'ready' | 'result' | 'early';

export default function ReactionTimeTest() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startGame = () => {
    setGameState('waiting');
    setReactionTime(null);
    const delay = Math.floor(Math.random() * 3000) + 2000; // 2 to 5 seconds
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'idle' || gameState === 'result' || gameState === 'early') {
      startGame();
    } else if (gameState === 'waiting') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState('early');
    } else if (gameState === 'ready') {
      if (startTimeRef.current) {
        const time = Date.now() - startTimeRef.current;
        setReactionTime(time);
        setGameState('result');
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">Reaction Time Test</h1>
        <Link href="/" className="nes-btn text-xs">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered">
        <h2 className="title">Play</h2>

        <div
          onClick={handleClick}
          className={`w-full h-64 flex items-center justify-center cursor-pointer border-4 border-black mb-4 select-none
            ${gameState === 'idle' ? 'bg-blue-300' : ''}
            ${gameState === 'waiting' ? 'bg-red-400' : ''}
            ${gameState === 'ready' ? 'bg-green-400' : ''}
            ${gameState === 'result' ? 'bg-blue-300' : ''}
            ${gameState === 'early' ? 'bg-blue-300' : ''}
          `}
        >
          <div className="text-center p-4">
            {gameState === 'idle' && <p className="text-xl">Click to start</p>}
            {gameState === 'waiting' && <p className="text-xl text-white">Wait for green...</p>}
            {gameState === 'ready' && <p className="text-3xl font-bold text-white">CLICK NOW!</p>}
            {gameState === 'result' && (
              <div>
                <p className="text-2xl mb-2">{reactionTime} ms</p>
                <p>Click to try again</p>
              </div>
            )}
            {gameState === 'early' && (
              <div>
                <p className="text-xl text-red-600 mb-2">Too early!</p>
                <p>Click to try again</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}