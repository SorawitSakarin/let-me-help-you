"use client";

import React, { useState } from 'react';

type Choice = 'rock' | 'paper' | 'scissors';

const choices: Choice[] = ['rock', 'paper', 'scissors'];

export default function RockPaperScissors() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [resultMessage, setResultMessage] = useState<string>('Make your move!');

  const getResult = (player: Choice, computer: Choice) => {
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

  const handlePlay = (choice: Choice) => {
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(compChoice);

    const outcome = getResult(choice, compChoice);
    if (outcome === 'win') {
      setPlayerScore((prev) => prev + 1);
      setResultMessage(`You win! ${choice} beats ${compChoice}.`);
    } else if (outcome === 'lose') {
      setComputerScore((prev) => prev + 1);
      setResultMessage(`You lose! ${compChoice} beats ${choice}.`);
    } else {
      setResultMessage(`It's a draw! Both chose ${choice}.`);
    }
  };

  const handleReset = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResultMessage('Make your move!');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="nes-container with-title is-centered">
        <p className="title text-lg md:text-xl">Rock Paper Scissors</p>
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex justify-between items-center text-sm md:text-base mb-4">
             <div className="flex flex-col items-center">
                <span className="font-bold text-blue-600">You</span>
                <span className="text-2xl mt-2">{playerScore}</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="font-bold text-red-600">Computer</span>
                <span className="text-2xl mt-2">{computerScore}</span>
             </div>
          </div>

          <div className="text-center min-h-[4rem] flex flex-col items-center justify-center bg-gray-100 p-4 rounded-md">
            <p className="text-sm md:text-base font-bold mb-2">{resultMessage}</p>
            {playerChoice && computerChoice && (
               <div className="flex items-center gap-4 text-xs md:text-sm text-gray-600">
                  <span>You: <strong className="text-blue-600">{playerChoice}</strong></span>
                  <span>vs</span>
                  <span>Computer: <strong className="text-red-600">{computerChoice}</strong></span>
               </div>
            )}
          </div>

          <div className="flex justify-center gap-4 flex-wrap mt-4">
            <button
              type="button"
              className="nes-btn is-primary"
              onClick={() => handlePlay('rock')}
            >
              Rock
            </button>
            <button
              type="button"
              className="nes-btn is-success"
              onClick={() => handlePlay('paper')}
            >
              Paper
            </button>
            <button
              type="button"
              className="nes-btn is-error"
              onClick={() => handlePlay('scissors')}
            >
              Scissors
            </button>
          </div>

           <div className="flex justify-center mt-6 border-t-2 border-dashed border-gray-300 pt-6">
               <button
                  type="button"
                  className="nes-btn is-warning text-sm"
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
