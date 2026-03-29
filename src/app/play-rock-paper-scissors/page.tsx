'use client';

import { useState } from 'react';
import Link from 'next/link';

type Choice = 'Rock' | 'Paper' | 'Scissors';
type Result = 'Win' | 'Lose' | 'Draw' | null;

const CHOICES: Choice[] = ['Rock', 'Paper', 'Scissors'];

export default function RockPaperScissorsPage() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getComputerChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
  };

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'Draw';
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      return 'Win';
    }
    return 'Lose';
  };

  const handleChoice = (choice: Choice) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setPlayerChoice(choice);

    // Simulate computer thinking
    setTimeout(() => {
      const computerSelection = getComputerChoice();
      setComputerChoice(computerSelection);

      const gameResult = determineWinner(choice, computerSelection);
      setResult(gameResult);

      if (gameResult === 'Win') {
        setPlayerScore(prev => prev + 1);
      } else if (gameResult === 'Lose') {
        setComputerScore(prev => prev + 1);
      }

      setIsPlaying(false);
    }, 500);
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setIsPlaying(false);
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

          <div className="flex justify-between w-full max-w-md px-4 text-xl">
             <div className="flex flex-col items-center">
                 <span>Player</span>
                 <span className="text-2xl font-bold text-blue-500">{playerScore}</span>
             </div>
             <div className="flex flex-col items-center">
                 <span>Computer</span>
                 <span className="text-2xl font-bold text-red-500">{computerScore}</span>
             </div>
          </div>

          <div className="flex flex-col items-center gap-4 min-h-[120px] justify-center">
             {result ? (
                 <div className="flex flex-col items-center gap-4">
                    <div className={`text-2xl md:text-3xl ${result === 'Win' ? 'text-green-500' : result === 'Lose' ? 'text-red-500' : 'text-yellow-500'}`}>
                        {result === 'Draw' ? "It's a Draw!" : `You ${result}!`}
                    </div>
                    <div className="text-sm md:text-base text-gray-600">
                        Player chose {playerChoice} | Computer chose {computerChoice}
                    </div>
                 </div>
             ) : (
                 <div className="text-xl text-gray-500">
                     Choose your weapon!
                 </div>
             )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {CHOICES.map((choice) => (
              <button
                key={choice}
                type="button"
                className={`nes-btn w-32 h-16 flex items-center justify-center text-sm md:text-base ${
                  isPlaying ? 'is-disabled' : 'is-primary'
                }`}
                onClick={() => handleChoice(choice)}
                disabled={isPlaying}
              >
                {choice}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="nes-btn is-warning mt-4"
            onClick={resetGame}
            disabled={isPlaying}
          >
            Reset Score
          </button>
        </div>
      </div>
    </div>
  );
}
