'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Choice = 'rock' | 'paper' | 'scissors';

const choices: Choice[] = ['rock', 'paper', 'scissors'];

export default function PlayRockPaperScissors() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [resultMessage, setResultMessage] = useState<string>('');

  const play = (choice: Choice) => {
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(compChoice);

    if (choice === compChoice) {
      setResultMessage("It's a tie!");
    } else if (
      (choice === 'rock' && compChoice === 'scissors') ||
      (choice === 'paper' && compChoice === 'rock') ||
      (choice === 'scissors' && compChoice === 'paper')
    ) {
      setResultMessage('You win!');
      setPlayerScore((prev) => prev + 1);
    } else {
      setResultMessage('Computer wins!');
      setComputerScore((prev) => prev + 1);
    }
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResultMessage('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">Rock Paper Scissors</h1>
        <Link href="/" className="nes-btn text-xs">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered">
        <h2 className="title">Play</h2>

        <div className="flex justify-around mb-6 text-sm md:text-base">
          <div>
            <p className="mb-2 font-bold text-primary">You</p>
            <p className="text-xl">{playerScore}</p>
          </div>
          <div>
            <p className="mb-2 font-bold text-error">Computer</p>
            <p className="text-xl">{computerScore}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {choices.map((c) => (
            <button
              key={c}
              className={`nes-btn capitalize ${playerChoice === c ? 'is-primary' : ''}`}
              onClick={() => play(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="min-h-[80px]">
          {playerChoice && computerChoice && (
            <div className="text-sm">
              <p className="mb-2">
                You chose <span className="font-bold text-primary capitalize">{playerChoice}</span>
              </p>
              <p className="mb-4">
                Computer chose <span className="font-bold text-error capitalize">{computerChoice}</span>
              </p>
              <p className="text-lg font-bold nes-text is-warning">{resultMessage}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="nes-btn is-error text-sm" onClick={resetGame}>
            Reset Score
          </button>
        </div>
      </div>
    </div>
  );
}
