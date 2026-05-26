'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type GameState = 'waiting' | 'ready' | 'clickedTooEarly' | 'finished';

export default function ReactionTimeTestPage() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startGame = () => {
    setGameState('ready');
    setReactionTime(null);
    setStartTime(null);

    // Random delay between 2 to 5 seconds
    const delay = Math.floor(Math.random() * 3000) + 2000;

    timeoutRef.current = setTimeout(() => {
      setGameState('waiting');
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'ready') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setGameState('clickedTooEarly');
    } else if (gameState === 'waiting' && startTime) {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setGameState('finished');
      setStartTime(null);
    } else if (gameState === 'finished' || gameState === 'clickedTooEarly') {
      startGame();
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Reaction Time Test</h2>

        <div className="flex flex-col items-center gap-6 py-4">
          <p className="text-center text-sm md:text-base">
            Test your visual reflexes! Click the box as soon as it turns green.
          </p>

          {gameState === 'waiting' && !startTime ? (
             <button
              type="button"
              className="nes-btn is-primary w-full h-48 md:h-64 text-xl md:text-2xl mt-4"
              onClick={startGame}
             >
               Click to Start
             </button>
          ) : (
             <div
               role="button"
               tabIndex={0}
               onClick={handleClick}
               onKeyDown={(e) => {
                 if (e.key === 'Enter' || e.key === ' ') {
                   handleClick();
                 }
               }}
               className={`w-full h-48 md:h-64 mt-4 flex flex-col items-center justify-center cursor-pointer border-4 border-black select-none ${
                 gameState === 'ready' ? 'bg-red-500 text-white' :
                 gameState === 'waiting' && startTime ? 'bg-green-500 text-white' :
                 'bg-gray-200'
               }`}
             >
               {gameState === 'ready' && <span className="text-2xl md:text-3xl text-center">Wait for green...</span>}
               {gameState === 'waiting' && startTime && <span className="text-2xl md:text-3xl text-center font-bold">CLICK NOW!</span>}
               {gameState === 'clickedTooEarly' && <span className="text-xl md:text-2xl text-center text-red-600">Too early! Click to try again.</span>}
               {gameState === 'finished' && (
                 <div className="flex flex-col items-center gap-4 text-black">
                   <span className="text-2xl md:text-3xl font-bold">{reactionTime} ms</span>
                   <span className="text-sm md:text-base text-gray-700">Click to try again</span>
                 </div>
               )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
