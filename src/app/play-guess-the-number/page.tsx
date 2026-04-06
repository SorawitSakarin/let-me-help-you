'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Decorations from '@/components/Decorations';

export default function GuessTheNumber() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('Guess a number between 1 and 100!');
  const [attempts, setAttempts] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize game on client side only to avoid hydration errors
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    // Generate a pseudo-random number between 1 and 100
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('Guess a number between 1 and 100!');
    setAttempts(0);
    setIsGameOver(false);
    setTimeout(() => {
        if(inputRef.current) {
            inputRef.current.focus();
        }
    }, 100);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();

    if (isGameOver) return;

    const numGuess = parseInt(guess, 10);

    if (isNaN(numGuess)) {
      setMessage('Please enter a valid number.');
      return;
    }

    if (numGuess < 1 || numGuess > 100) {
      setMessage('Please guess between 1 and 100.');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (numGuess === targetNumber) {
      setMessage(`Correct! You guessed it in ${newAttempts} attempts.`);
      setIsGameOver(true);
    } else if (numGuess < targetNumber) {
      setMessage('Too low! Try a higher number.');
    } else {
      setMessage('Too high! Try a lower number.');
    }

    setGuess('');
    if(inputRef.current) {
        inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/" className="nes-btn">
          &lt; Back
        </Link>
        <h1 className="text-xl md:text-2xl font-bold m-0">Guess the Number</h1>
      </div>

      <div className="nes-container with-title relative">
        <h2 className="title">Game</h2>
        <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20">
          <Decorations />
        </div>

        <div className="flex flex-col gap-6 relative z-10 p-2 md:p-4">
          <div className={`nes-container is-rounded flex items-center justify-center min-h-[100px] text-center p-4 ${isGameOver ? 'is-success' : 'is-dark'}`}>
            <p className="text-sm md:text-base m-0 leading-relaxed">{message}</p>
          </div>

          <div className="flex justify-between items-center text-xs md:text-sm text-gray-500 px-2">
            <span>Attempts: {attempts}</span>
          </div>

          <form onSubmit={handleGuess} className="flex flex-col sm:flex-row gap-4 mt-2">
            <div className="flex-grow nes-field">
                <input
                  ref={inputRef}
                  type="number"
                  className="nes-input w-full"
                  placeholder="Enter a number..."
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  disabled={isGameOver}
                  min="1"
                  max="100"
                  autoFocus
                />
            </div>

            {!isGameOver ? (
                <button
                type="submit"
                className={`nes-btn is-primary w-full sm:w-auto ${!guess ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                Guess
                </button>
            ) : (
                <button
                type="button"
                onClick={resetGame}
                className="nes-btn is-warning w-full sm:w-auto"
                >
                Play Again
                </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
