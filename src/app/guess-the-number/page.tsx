'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSecureRandomInt } from '@/utils/crypto';

export default function GuessTheNumberPage() {
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('Guess a number between 1 and 100!');
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);

  useEffect(() => {
    setTargetNumber(getSecureRandomInt(100) + 1);
  }, []);

  const handleGuess = () => {
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts(prev => prev + 1);

    if (num === targetNumber) {
      setMessage(`Congratulations! You guessed it in ${attempts + 1} attempts.`);
      setIsWon(true);
    } else if (num < targetNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }

    setGuess('');
  };

  const handleReset = () => {
    setTargetNumber(getSecureRandomInt(100) + 1);
    setAttempts(0);
    setIsWon(false);
    setMessage('Guess a number between 1 and 100!');
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
          <div className={`nes-balloon ${isWon ? 'from-left is-success' : 'from-left'}`}>
            <p>{message}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
            <input
              type="number"
              className="nes-input"
              placeholder="Enter number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={isWon}
              onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
            />
            <button
                type="button"
                className={`nes-btn ${isWon ? 'is-disabled' : 'is-primary'}`}
                onClick={handleGuess}
                disabled={isWon}
             >
               Guess
             </button>
          </div>

          <div className="mt-4">
             <p>Attempts: {attempts}</p>
          </div>

          <div className="text-center mt-6">
                <button
                    type="button"
                    className="nes-btn is-error w-full sm:w-auto text-sm"
                    onClick={handleReset}
                >
                    Reset Game
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}