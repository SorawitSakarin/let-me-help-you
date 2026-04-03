"use client";

import React, { useState, useEffect, useRef } from "react";

export default function GuessTheNumberPage() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("Guess a number between 1 and 100!");
  const [attempts, setAttempts] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setFeedback("Guess a number between 1 and 100!");
    setAttempts(0);
    setIsGameOver(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGameOver) return;

    const numGuess = parseInt(guess, 10);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setFeedback("Please enter a valid number between 1 and 100.");
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (numGuess === targetNumber) {
      setFeedback(`Correct! You guessed it in ${newAttempts} attempts!`);
      setIsGameOver(true);
    } else if (numGuess < targetNumber) {
      setFeedback("Too low! Try a higher number.");
      setGuess("");
      inputRef.current?.focus();
    } else {
      setFeedback("Too high! Try a lower number.");
      setGuess("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="mb-8 flex items-center gap-4">
        <i className="nes-icon trophy is-large"></i>
        <div>
          <h1 className="text-2xl font-bold mb-2">Guess the Number</h1>
          <p className="text-gray-600">Can you guess the secret number?</p>
        </div>
      </div>

      <div className="nes-container with-title mb-8">
        <p className="title">Game Board</p>

        <div className="text-center mb-6">
          <p className={`text-xl font-bold mb-4 ${isGameOver ? "text-green-600" : ""}`}>
            {feedback}
          </p>
          <p className="text-sm text-gray-500">
            Attempts: {attempts}
          </p>
        </div>

        <form onSubmit={handleGuess} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="nes-field flex-grow max-w-xs">
            <input
              type="number"
              ref={inputRef}
              className="nes-input text-center"
              placeholder="1-100"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={isGameOver}
              min="1"
              max="100"
            />
          </div>
          <button
            type="submit"
            className={`nes-btn is-primary ${isGameOver ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={(e) => {
               if(isGameOver) e.preventDefault();
            }}
          >
            Guess!
          </button>
        </form>
      </div>

      {isGameOver && (
        <div className="text-center">
          <button
            type="button"
            className="nes-btn is-success"
            onClick={startNewGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
