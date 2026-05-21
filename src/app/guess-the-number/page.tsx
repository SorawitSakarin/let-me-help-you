'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GuessTheNumberPage() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('Guess a number between 1 and 100.');
  const [attempts, setAttempts] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('Guess a number between 1 and 100.');
    setAttempts(0);
    setIsGameOver(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();

    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts(prev => prev + 1);

    if (numGuess === targetNumber) {
      setMessage(`Congratulations! You guessed it in ${attempts + 1} attempts!`);
      setIsGameOver(true);
    } else if (numGuess < targetNumber) {
      setMessage('Too low! Try a higher number.');
    } else {
      setMessage('Too high! Try a lower number.');
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
          <div className={`text-lg md:text-xl text-center ${isGameOver ? 'text-green-600' : 'text-blue-600'}`}>
            <p>{message}</p>
            {!isGameOver && <p className="mt-2 text-sm text-gray-600">Attempts: {attempts}</p>}
          </div>

          {!isGameOver ? (
            <form onSubmit={handleGuess} className="flex flex-col items-center gap-4 w-full max-w-xs">
              <div className="nes-field w-full">
                <input
                  type="number"
                  id="guess_field"
                  className="nes-input"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  min="1"
                  max="100"
                  required
                  autoFocus
                />
              </div>
              <button type="submit" className="nes-btn is-primary w-full">
                Guess
              </button>
            </form>
          ) : (
            <button
              type="button"
              className="nes-btn is-success mt-4 animate-pulse"
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
