'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GuessTheNumber() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('Guess a number between 1 and 100!');
    setAttempts(0);
    setGameOver(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameOver) return;

    const numericGuess = parseInt(guess, 10);

    if (isNaN(numericGuess) || numericGuess < 1 || numericGuess > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts((prev) => prev + 1);

    if (numericGuess === targetNumber) {
      setMessage(`Congratulations! You guessed it in ${attempts + 1} attempts!`);
      setGameOver(true);
    } else if (numericGuess < targetNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }

    setGuess('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">Guess the Number</h1>
        <Link href="/" className="nes-btn text-xs">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered">
        <h2 className="title">Play</h2>

        <p className="mb-4">{message}</p>
        <p className="mb-6">Attempts: {attempts}</p>

        <form onSubmit={handleGuess} className="flex flex-col items-center gap-4">
          <input
            type="number"
            className="nes-input w-full max-w-[200px] text-center"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={gameOver}
            min="1"
            max="100"
            placeholder="1-100"
          />
          <button
            type="submit"
            className={`nes-btn w-full max-w-[200px] ${gameOver ? 'is-disabled' : 'is-primary'}`}
            disabled={gameOver}
          >
            Guess
          </button>
        </form>

        {gameOver && (
          <div className="mt-6 flex justify-center">
            <button className="nes-btn is-success text-sm" onClick={startNewGame}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
