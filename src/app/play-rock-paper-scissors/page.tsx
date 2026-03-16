'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Choice = 'Rock' | 'Paper' | 'Scissors' | null;

const CHOICES: NonNullable<Choice>[] = ['Rock', 'Paper', 'Scissors'];

export default function RockPaperScissorsPage() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<string | null>(null);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const getComputerChoice = (): NonNullable<Choice> => {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
  };

  const determineWinner = (player: NonNullable<Choice>, computer: NonNullable<Choice>) => {
    if (player === computer) {
      return 'Draw!';
    }

    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      return 'You Win!';
    }

    return 'Computer Wins!';
  };

  const playGame = (choice: NonNullable<Choice>) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setPlayerChoice(choice);

    // Add a small delay for visual effect
    setTimeout(() => {
      const compChoice = getComputerChoice();
      setComputerChoice(compChoice);

      const gameResult = determineWinner(choice, compChoice);
      setResult(gameResult);

      if (gameResult === 'You Win!') {
        setPlayerScore((prev) => prev + 1);
      } else if (gameResult === 'Computer Wins!') {
        setComputerScore((prev) => prev + 1);
      }

      setIsPlaying(false);
    }, 600);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setPlayerScore(0);
    setComputerScore(0);
    setIsPlaying(false);
  };

  const getChoiceIcon = (choice: Choice) => {
    switch (choice) {
      case 'Rock': return '💎';
      case 'Paper': return '📄';
      case 'Scissors': return '✂️';
      default: return '❓';
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4 pb-10">
      <div className="w-full text-left">
          <Link href="/" className="nes-btn">
              &lt; Back to Home
          </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title" style={{ background: 'var(--surface)' }}>Rock Paper Scissors</h2>

        <div className="flex flex-col items-center gap-6 py-4 mt-4">

          {/* Score Board */}
          <div className="flex w-full justify-between items-center bg-gray-100 p-4 rounded-lg border-4 border-black mb-4">
             <div className="flex flex-col items-center">
                 <span className="text-sm md:text-base font-bold text-blue-600">Player</span>
                 <span className="text-2xl md:text-4xl">{playerScore}</span>
             </div>
             <div className="text-xl md:text-2xl font-bold">VS</div>
             <div className="flex flex-col items-center">
                 <span className="text-sm md:text-base font-bold text-red-600">Computer</span>
                 <span className="text-2xl md:text-4xl">{computerScore}</span>
             </div>
          </div>

          {/* Result Display */}
          <div className="h-12 flex items-center justify-center w-full">
            {result ? (
               <span className={`text-xl md:text-2xl font-bold ${
                  result === 'You Win!' ? 'text-green-500 animate-bounce' :
                  result === 'Computer Wins!' ? 'text-red-500' : 'text-yellow-500'
               }`}>
                  {result}
               </span>
            ) : (
               <span className="text-sm md:text-base text-gray-500">Choose your weapon!</span>
            )}
          </div>

          {/* Battle Arena */}
          <div className="flex w-full justify-around items-center my-4">
              <div className="flex flex-col items-center gap-2">
                 <div className={`w-20 h-20 md:w-32 md:h-32 flex items-center justify-center border-4 border-black rounded bg-white text-4xl md:text-6xl ${playerChoice ? 'animate-[wiggle_0.3s_ease-in-out]' : ''}`}>
                    {getChoiceIcon(playerChoice)}
                 </div>
                 <span className="text-xs md:text-sm">You</span>
              </div>

              <div className="text-xl md:text-3xl font-bold text-gray-400">
                ⚡
              </div>

              <div className="flex flex-col items-center gap-2">
                 <div className={`w-20 h-20 md:w-32 md:h-32 flex items-center justify-center border-4 border-black rounded bg-white text-4xl md:text-6xl ${isPlaying ? 'animate-[spin_0.5s_ease-in-out_infinite]' : computerChoice ? 'animate-[wiggle_0.3s_ease-in-out]' : ''}`}>
                    {isPlaying ? '❓' : getChoiceIcon(computerChoice)}
                 </div>
                 <span className="text-xs md:text-sm">Computer</span>
              </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 w-full">
             {CHOICES.map((choice) => (
                 <button
                    key={choice}
                    type="button"
                    className={`nes-btn w-full sm:w-auto ${
                        choice === 'Rock' ? 'is-primary' :
                        choice === 'Paper' ? 'is-success' : 'is-warning'
                    } ${isPlaying ? 'is-disabled' : ''}`}
                    onClick={() => playGame(choice)}
                    disabled={isPlaying}
                 >
                    {getChoiceIcon(choice)} {choice}
                 </button>
             ))}
          </div>

          <button
            type="button"
            className="nes-btn is-error mt-8"
            onClick={resetGame}
            disabled={isPlaying || (!playerChoice && playerScore === 0 && computerScore === 0)}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
