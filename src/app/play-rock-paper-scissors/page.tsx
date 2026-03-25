'use client';

import { useState } from 'react';
import Link from 'next/link';

type Choice = 'Rock' | 'Paper' | 'Scissors' | null;
type Result = 'Win' | 'Lose' | 'Draw' | null;

export default function RockPaperScissorsPage() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);

  const choices: Choice[] = ['Rock', 'Paper', 'Scissors'];

  const playGame = (choice: Choice) => {
    if (!choice) return;

    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(compChoice);

    if (choice === compChoice) {
      setResult('Draw');
    } else if (
      (choice === 'Rock' && compChoice === 'Scissors') ||
      (choice === 'Paper' && compChoice === 'Rock') ||
      (choice === 'Scissors' && compChoice === 'Paper')
    ) {
      setResult('Win');
      setPlayerScore((prev) => prev + 1);
    } else {
      setResult('Lose');
      setComputerScore((prev) => prev + 1);
    }
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Rock Paper Scissors</h2>

        <div className="flex flex-col items-center gap-6 py-4">

          {/* Scoreboard */}
          <div className="flex justify-around w-full max-w-sm px-4">
            <div className="text-center">
              <h3 className="text-blue-500 mb-2">You</h3>
              <p className="text-2xl">{playerScore}</p>
            </div>
            <div className="text-center">
              <h3 className="text-red-500 mb-2">Computer</h3>
              <p className="text-2xl">{computerScore}</p>
            </div>
          </div>

          {/* Game Result */}
          <div className="h-20 flex flex-col items-center justify-center">
            {result ? (
              <>
                <div className={`text-xl md:text-2xl mb-2 ${result === 'Win' ? 'text-green-500' : result === 'Lose' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {result === 'Win' && <i className="nes-icon trophy is-medium animate-bounce mr-2"></i>}
                  {result === 'Win' ? 'You Win!' : result === 'Lose' ? 'Computer Wins!' : 'It\'s a Draw!'}
                </div>
                <p className="text-sm text-gray-600">
                  {playerChoice} vs {computerChoice}
                </p>
              </>
            ) : (
              <p className="text-lg">Choose your weapon!</p>
            )}
          </div>

          {/* Player Choices */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className="nes-btn is-primary px-4 py-2"
              onClick={() => playGame('Rock')}
            >
              Rock
            </button>
            <button
              type="button"
              className="nes-btn is-success px-4 py-2"
              onClick={() => playGame('Paper')}
            >
              Paper
            </button>
            <button
              type="button"
              className="nes-btn is-error px-4 py-2"
              onClick={() => playGame('Scissors')}
            >
              Scissors
            </button>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            className="nes-btn is-warning mt-8"
            onClick={resetGame}
          >
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
}
