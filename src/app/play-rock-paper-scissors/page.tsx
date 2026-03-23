'use client';

import React, { useState } from 'react';

type Choice = 'Rock' | 'Paper' | 'Scissors';
type Result = 'Win' | 'Lose' | 'Draw' | null;

const CHOICES: Choice[] = ['Rock', 'Paper', 'Scissors'];

export default function RockPaperScissorsPage() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>(null);

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

  const play = (choice: Choice) => {
    const compChoice = getComputerChoice();
    const gameResult = determineWinner(choice, compChoice);

    setPlayerChoice(choice);
    setComputerChoice(compChoice);
    setResult(gameResult);

    if (gameResult === 'Win') {
      setPlayerScore((prev) => prev + 1);
    } else if (gameResult === 'Lose') {
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

  const getResultClass = () => {
    if (result === 'Win') return 'is-success';
    if (result === 'Lose') return 'is-error';
    return 'is-warning';
  };

  const getResultText = () => {
    if (result === 'Win') return 'You Win!';
    if (result === 'Lose') return 'You Lose!';
    if (result === 'Draw') return "It's a Draw!";
    return 'Make your move!';
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Rock Paper Scissors</h1>
        <p className="text-gray-600">Play a classic game of Rock Paper Scissors against the computer.</p>
      </div>

      <div className="nes-container with-title is-rounded is-centered">
        <h3 className="title">Scoreboard</h3>
        <div className="flex justify-around text-lg md:text-xl">
          <div className="flex flex-col items-center">
            <span className="text-blue-600">You</span>
            <span className="font-bold">{playerScore}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-red-600">Computer</span>
            <span className="font-bold">{computerScore}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center my-4">
        <div className="flex flex-col items-center gap-2">
           <span className="text-sm">Your Choice:</span>
           <div className={`nes-btn w-32 cursor-default ${playerChoice ? 'is-primary' : ''}`}>
             {playerChoice || '?'}
           </div>
        </div>
        <div className="text-2xl font-bold">VS</div>
        <div className="flex flex-col items-center gap-2">
           <span className="text-sm">Computer&apos;s Choice:</span>
           <div className={`nes-btn w-32 cursor-default ${computerChoice ? 'is-error' : ''}`}>
             {computerChoice || '?'}
           </div>
        </div>
      </div>

      <div className="flex justify-center text-center">
         <div className={`nes-badge`}>
           <span className={result ? getResultClass() : 'is-dark'}>{getResultText()}</span>
         </div>
      </div>

      <div className="nes-container is-rounded">
         <p className="text-center mb-4">Choose your weapon:</p>
         <div className="flex justify-center gap-4 flex-wrap">
            <button
               className="nes-btn is-primary"
               onClick={() => play('Rock')}
            >
               Rock
            </button>
            <button
               className="nes-btn is-success"
               onClick={() => play('Paper')}
            >
               Paper
            </button>
            <button
               className="nes-btn is-warning"
               onClick={() => play('Scissors')}
            >
               Scissors
            </button>
         </div>
      </div>

      <div className="flex justify-center mt-4">
        <button className="nes-btn is-error" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}
