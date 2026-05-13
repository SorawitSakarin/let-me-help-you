'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GuessTheNumberPage() {
  const [secretNumber, setSecretNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('Guess a number between 1 and 100');
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('Guess a number between 1 and 100');
    setAttempts(0);
    setGameOver(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameOver) return;

    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (num === secretNumber) {
      setMessage(`Congratulations! You guessed it in ${newAttempts} attempts.`);
      setGameOver(true);
    } else if (num < secretNumber) {
      setMessage('Too low! Try again.');
      setGuess('');
    } else {
      setMessage('Too high! Try again.');
      setGuess('');
    }
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
          <div className={`text-xl md:text-2xl text-center ${gameOver ? 'text-green-500' : 'text-blue-500'}`}>
            {gameOver && <i className="nes-icon trophy is-medium animate-bounce mb-4 block mx-auto"></i>}
            <span>{message}</span>
          </div>

          {!gameOver ? (
            <form onSubmit={handleGuess} className="flex flex-col items-center gap-4 w-full max-w-xs">
              <div className="w-full">
                <input
                  type="number"
                  id="guess_input"
                  className="nes-input"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  min="1"
                  max="100"
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
              className="nes-btn is-success mt-4"
              onClick={startNewGame}
            >
              Play Again
            </button>
          )}

          <div className="mt-4 text-sm text-gray-500">
            Attempts: {attempts}
          </div>
        </div>
      </div>
    </div>
  );
}
