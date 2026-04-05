'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PlayGuessTheNumber() {
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    // Generate pseudo-random number in useEffect to prevent hydration mismatch
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();

    if (gameOver || targetNumber === null) return;

    const numGuess = parseInt(guess, 10);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts((prev) => prev + 1);

    if (numGuess === targetNumber) {
      setMessage(`Correct! You guessed it in ${attempts + 1} attempts.`);
      setGameOver(true);
    } else if (numGuess < targetNumber) {
      setMessage('Too low! Try again.');
      setGuess('');
    } else {
      setMessage('Too high! Try again.');
      setGuess('');
    }
  };

  const handleRestart = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto w-full">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold">Guess the Number</h2>
        <Link href="/" className="nes-btn is-warning text-xs">
          Back
        </Link>
      </div>

      <div className="nes-container with-title w-full">
        <h3 className="title">Game Area</h3>

        <p className="mb-4 text-sm">
          I&apos;m thinking of a number between 1 and 100.
        </p>

        <form onSubmit={handleGuess} className="flex flex-col gap-4">
          <div className="nes-field">
            <label htmlFor="guess_input" className="text-xs">Your Guess:</label>
            <input
              type="number"
              id="guess_input"
              className="nes-input"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={gameOver || targetNumber === null}
              min="1"
              max="100"
              required
            />
          </div>

          {!gameOver ? (
            <button
              type="submit"
              className={`nes-btn is-primary w-full ${gameOver || targetNumber === null ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={gameOver || targetNumber === null}
            >
              Guess
            </button>
          ) : (
            <button
              type="button"
              className="nes-btn is-success w-full"
              onClick={handleRestart}
            >
              Play Again
            </button>
          )}
        </form>

        {message && (
          <div className="mt-4 p-4 border-4 border-black bg-gray-100">
            <p className="text-center font-bold text-sm">{message}</p>
          </div>
        )}

        <div className="mt-4 text-xs">
          <p>Attempts: <span className="text-primary">{attempts}</span></p>
        </div>
      </div>
    </div>
  );
}
