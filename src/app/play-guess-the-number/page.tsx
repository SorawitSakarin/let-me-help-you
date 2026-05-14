'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GuessTheNumberPage() {
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
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
    if (!targetNumber || isWon) return;

    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts((prev) => prev + 1);

    if (numGuess === targetNumber) {
      setMessage(`Congratulations! You guessed it in ${attempts + 1} attempts.`);
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

        <div className="flex flex-col items-center gap-6 py-4">
          <div className={`text-sm md:text-base text-center ${isWon ? 'text-green-500' : 'text-blue-500'}`}>
            {isWon && <i className="nes-icon trophy is-medium animate-bounce mb-2 block mx-auto"></i>}
            <p>{message}</p>
          </div>

          {!isWon ? (
            <form onSubmit={handleGuess} className="flex flex-col items-center gap-4 w-full max-w-xs">
              <div className="nes-field w-full">
                <input
                  type="number"
                  id="guess_field"
                  className="nes-input text-center"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Enter 1-100"
                  min="1"
                  max="100"
                  required
                />
              </div>
              <button type="submit" className="nes-btn is-primary w-full">
                Guess
              </button>
            </form>
          ) : (
            <button
              type="button"
              className="nes-btn is-success"
              onClick={startNewGame}
            >
              Play Again
            </button>
          )}

          <div className="text-xs text-gray-500 mt-4">
            Attempts: {attempts}
          </div>
        </div>
      </div>
    </div>
  );
}