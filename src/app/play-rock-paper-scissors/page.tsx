'use client';

import { useState } from 'react';
import Link from 'next/link';

type Choice = 'Rock' | 'Paper' | 'Scissors' | null;

export default function RockPaperScissorsPage() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<string | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const choices: Choice[] = ['Rock', 'Paper', 'Scissors'];

  const getResult = (player: Choice, computer: Choice) => {
    if (player === computer) return "It's a Tie!";
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      return 'You Win!';
    }
    return 'You Lose!';
  };

  const playGame = (choice: Choice) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    const gameResult = getResult(choice, randomChoice);

    setPlayerChoice(choice);
    setComputerChoice(randomChoice);
    setResult(gameResult);

    if (gameResult === 'You Win!') {
      setPlayerScore(prev => prev + 1);
    } else if (gameResult === 'You Lose!') {
      setComputerScore(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setPlayerScore(0);
    setComputerScore(0);
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
          <div className="flex justify-between w-full max-w-md px-4 py-2 bg-gray-100 border-4 border-black rounded-lg">
            <div className="text-center">
              <p className="text-sm md:text-base font-bold text-blue-600">Player</p>
              <p className="text-xl md:text-2xl">{playerScore}</p>
            </div>
            <div className="text-center">
              <p className="text-sm md:text-base font-bold text-red-600">Computer</p>
              <p className="text-xl md:text-2xl">{computerScore}</p>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex gap-4 flex-wrap justify-center mt-4">
            <button
              type="button"
              className="nes-btn is-primary"
              onClick={() => playGame('Rock')}
            >
              Rock
            </button>
            <button
              type="button"
              className="nes-btn is-success"
              onClick={() => playGame('Paper')}
            >
              Paper
            </button>
            <button
              type="button"
              className="nes-btn is-error"
              onClick={() => playGame('Scissors')}
            >
              Scissors
            </button>
          </div>

          {/* Result Area */}
          <div className="min-h-[120px] flex flex-col items-center justify-center mt-4 w-full">
            {result ? (
              <div className="text-center w-full">
                <div className="flex justify-center items-center gap-4 md:gap-12 mb-4">
                   <div className="flex flex-col items-center">
                       <span className="text-xs text-gray-500 mb-1">You</span>
                       <span className="text-lg md:text-xl font-bold">{playerChoice}</span>
                   </div>
                   <div className="text-xl font-bold">vs</div>
                   <div className="flex flex-col items-center">
                       <span className="text-xs text-gray-500 mb-1">Computer</span>
                       <span className="text-lg md:text-xl font-bold">{computerChoice}</span>
                   </div>
                </div>
                <div className={`text-xl md:text-2xl font-bold mt-4 animate-bounce
                  ${result === 'You Win!' ? 'text-green-500' :
                    result === 'You Lose!' ? 'text-red-500' :
                    'text-yellow-500'}`}
                >
                  {result}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm md:text-base">Choose your weapon to start!</p>
            )}
          </div>

          <button
            type="button"
            className="nes-btn is-warning mt-4"
            onClick={resetGame}
          >
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
}
