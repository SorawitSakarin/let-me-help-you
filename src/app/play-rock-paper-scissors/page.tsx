'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Choice = 'rock' | 'paper' | 'scissors' | null;
type Result = 'win' | 'lose' | 'draw' | null;

export default function RockPaperScissorsPage() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);

  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const getResult = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const playGame = (choice: Choice) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    const gameResult = getResult(choice, randomChoice);

    setPlayerChoice(choice);
    setComputerChoice(randomChoice);
    setResult(gameResult);

    if (gameResult === 'win') setPlayerScore((prev) => prev + 1);
    if (gameResult === 'lose') setComputerScore((prev) => prev + 1);
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full pb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl md:text-2xl mb-2">Rock Paper Scissors</h1>
          <p className="text-sm text-gray-600">
            Play a classic game of Rock Paper Scissors.
          </p>
        </div>
        <Link href="/" className="nes-btn is-error px-3 py-1 text-sm shrink-0">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered p-4 md:p-8">
        <h2 className="title" style={{ background: 'var(--surface)' }}>Game Arena</h2>

        <div className="flex flex-col gap-8 items-center mt-4">
          <div className="flex gap-10 w-full justify-center text-center">
             <div>
                <h3 className="text-lg">Player</h3>
                <p className="text-2xl font-bold mt-2">{playerScore}</p>
             </div>
             <div>
                <h3 className="text-lg">Computer</h3>
                <p className="text-2xl font-bold mt-2">{computerScore}</p>
             </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex gap-4 items-center justify-center min-h-[60px]">
               {playerChoice && computerChoice ? (
                   <>
                      <div className="text-center">
                          <p className="text-xs mb-1">You</p>
                          <span className="text-2xl font-bold capitalize text-blue-600">{playerChoice}</span>
                      </div>
                      <span className="text-xl font-bold">VS</span>
                      <div className="text-center">
                          <p className="text-xs mb-1">Comp</p>
                          <span className="text-2xl font-bold capitalize text-red-600">{computerChoice}</span>
                      </div>
                   </>
               ) : (
                   <span className="text-lg text-gray-500">Make a move!</span>
               )}
            </div>

            <div className="text-xl font-bold mt-2 min-h-[30px] flex items-center justify-center w-full">
                {result === 'win' && <span className="text-green-600">You Win!</span>}
                {result === 'lose' && <span className="text-red-600">Computer Wins!</span>}
                {result === 'draw' && <span className="text-yellow-600">It&apos;s a Draw!</span>}
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 max-w-md mt-4">
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <button
                type="button"
                className="nes-btn is-primary"
                onClick={() => playGame('rock')}
              >
                Rock
              </button>
              <button
                type="button"
                className="nes-btn is-success"
                onClick={() => playGame('paper')}
              >
                Paper
              </button>
              <button
                type="button"
                className="nes-btn is-warning"
                onClick={() => playGame('scissors')}
              >
                Scissors
              </button>
            </div>

            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    className="nes-btn is-error text-sm px-4 py-2"
                    onClick={resetGame}
                >
                    Reset Score
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
