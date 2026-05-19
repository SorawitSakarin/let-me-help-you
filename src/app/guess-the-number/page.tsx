'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GuessTheNumberPage() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setIsWon(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (isWon) return;

    const guessNum = parseInt(guess, 10);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts(prev => prev + 1);

    if (guessNum === targetNumber) {
      setMessage(`Congratulations! You guessed the number in ${attempts + 1} attempts!`);
      setIsWon(true);
    } else if (guessNum < targetNumber) {
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
          <p className="text-center text-sm md:text-base">
            I'm thinking of a number between 1 and 100. Can you guess it?
          </p>

          <form onSubmit={handleGuess} className="flex flex-col items-center gap-4 w-full max-w-xs">
             <input
                type="number"
                className={`nes-input text-center ${isWon ? 'is-disabled' : ''}`}
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter guess"
                min="1"
                max="100"
                disabled={isWon}
             />
             <button
                type="submit"
                className={`nes-btn ${isWon ? 'is-disabled' : 'is-primary'} w-full`}
                disabled={isWon}
             >
                Guess
             </button>
          </form>

          {message && (
             <div className={`nes-text text-center text-sm md:text-base mt-4 ${isWon ? 'is-success' : 'is-error'}`}>
                {message}
             </div>
          )}

          <div className="text-xs text-gray-500 mt-2">
             Attempts: {attempts}
          </div>

          <button
            type="button"
            className="nes-btn is-warning mt-4"
            onClick={startNewGame}
          >
            {isWon ? 'Play Again' : 'Reset Game'}
          </button>
        </div>
      </div>
    </div>
  );
}
