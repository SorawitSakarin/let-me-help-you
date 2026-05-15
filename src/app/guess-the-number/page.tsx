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
    resetGame();
  }, []);

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('Guess a number between 1 and 100!');
    setAttempts(0);
    setIsWon(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const numGuess = parseInt(guess, 10);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts(attempts + 1);

    if (numGuess === targetNumber) {
      setMessage(`Congratulations! You guessed the number in ${attempts + 1} attempts.`);
      setIsWon(true);
    } else if (numGuess < targetNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
    setGuess('');
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

        <div className="flex flex-col items-center gap-6 py-4">
          <div className={`text-xl md:text-2xl flex flex-col items-center gap-4 ${isWon ? 'text-green-500' : 'text-blue-500'}`}>
            {isWon && <i className="nes-icon trophy is-medium animate-bounce"></i>}
            <span className="text-center">{message}</span>
            <span className="text-sm text-gray-500">Attempts: {attempts}</span>
          </div>

          {!isWon ? (
            <form onSubmit={handleGuess} className="flex flex-col gap-4 w-full max-w-xs">
              <input
                type="number"
                className="nes-input text-center"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                min="1"
                max="100"
                placeholder="Enter number"
                autoFocus
              />
              <button type="submit" className="nes-btn is-primary w-full">
                Guess
              </button>
            </form>
          ) : (
            <button
              type="button"
              className="nes-btn is-warning mt-4"
              onClick={resetGame}
            >
              Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
