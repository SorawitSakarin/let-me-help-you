'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GuessTheNumberPage() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('Enter a number between 1 and 100.');
  const [attempts, setAttempts] = useState<number>(0);
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(() => {
    // pseudo-random number generator
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();

    if (hasWon) return;

    const numGuess = parseInt(guess, 10);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setFeedback('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts((prev) => prev + 1);

    if (numGuess === targetNumber) {
      setFeedback('Congratulations! You guessed the correct number!');
      setHasWon(true);
    } else if (numGuess < targetNumber) {
      setFeedback('Too low! Try a higher number.');
    } else {
      setFeedback('Too high! Try a lower number.');
    }

    setGuess('');
  };

  const handleReset = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setFeedback('Enter a number between 1 and 100.');
    setAttempts(0);
    setHasWon(false);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Guess the Number</h2>

        <div className="flex flex-col items-center gap-8 py-4">
          <div className="text-center w-full">
            <p className="mb-4 text-xl">{feedback}</p>
            <p className="text-gray-500 text-sm">Attempts: {attempts}</p>
          </div>

          <form onSubmit={handleGuess} className="flex flex-col gap-4 w-full max-w-sm items-center">
            <input
              type="number"
              className="nes-input w-full text-center text-xl"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="e.g. 42"
              disabled={hasWon}
              min="1"
              max="100"
            />

            <button
              type="submit"
              className={`nes-btn w-full ${hasWon ? 'is-disabled cursor-not-allowed opacity-50' : 'is-primary'}`}
            >
              Guess
            </button>
          </form>

          {hasWon && (
            <div className="w-full text-center mt-4">
              <button
                type="button"
                className="nes-btn is-success"
                onClick={handleReset}
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
