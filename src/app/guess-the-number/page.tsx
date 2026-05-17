'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GuessTheNumberPage() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('Guess a number between 1 and 100!');
  const [attempts, setAttempts] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('Guess a number between 1 and 100!');
    setAttempts(0);
    setIsWon(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (isWon) return;

    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (numGuess === targetNumber) {
      setMessage(`Congratulations! You guessed the number in ${newAttempts} attempts!`);
      setIsWon(true);
    } else if (numGuess < targetNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
    setGuess('');
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Guess the Number</h2>

        <div className="flex flex-col items-center gap-6 py-6">
          <p className={`text-lg text-center ${isWon ? 'text-green-600 font-bold' : ''}`}>
            {message}
          </p>

          <p className="text-sm">Attempts: {attempts}</p>

          <form onSubmit={handleGuess} className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <input
              type="number"
              className="nes-input w-full"
              placeholder="Enter guess"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={isWon}
              min="1"
              max="100"
            />
            <button
              type="submit"
              className={`nes-btn ${isWon ? 'is-disabled' : 'is-primary'} w-full sm:w-auto`}
              disabled={isWon}
            >
              Guess
            </button>
          </form>

          {isWon && (
            <button
              type="button"
              className="nes-btn is-success mt-4"
              onClick={startNewGame}
            >
              Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
