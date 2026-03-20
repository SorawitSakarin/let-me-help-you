'use client';

import { useState } from 'react';
import Link from 'next/link';

type Choice = 'Rock' | 'Paper' | 'Scissors' | null;

export default function RockPaperScissorsPage() {
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [resultMessage, setResultMessage] = useState<string>('Choose your weapon!');

  const choices: Choice[] = ['Rock', 'Paper', 'Scissors'];

  const play = (choice: Choice) => {
    if (!choice) return;

    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(compChoice);

    if (choice === compChoice) {
      setResultMessage("It's a tie!");
    } else if (
      (choice === 'Rock' && compChoice === 'Scissors') ||
      (choice === 'Paper' && compChoice === 'Rock') ||
      (choice === 'Scissors' && compChoice === 'Paper')
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
    setResultMessage('Choose your weapon!');
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4 pb-10">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Rock Paper Scissors</h2>

        <div className="flex flex-col items-center gap-6 py-4">
          <div className="flex w-full justify-around text-lg md:text-xl font-bold mb-4">
            <div className="text-blue-600">You: {playerScore}</div>
            <div className="text-red-600">Computer: {computerScore}</div>
          </div>

          <div
            className={`text-xl md:text-2xl h-8 flex items-center justify-center ${
              resultMessage === 'You win!'
                ? 'text-green-500'
                : resultMessage === 'Computer wins!'
                ? 'text-red-500'
                : 'text-gray-600'
            }`}
          >
            {resultMessage}
          </div>

          <div className="flex gap-4 md:gap-8 justify-center my-4">
            <button
              type="button"
              className="nes-btn is-primary p-2 w-24 h-24 md:w-32 md:h-32 text-sm md:text-base flex flex-col items-center justify-center gap-2"
              onClick={() => play('Rock')}
            >
              <i className="nes-icon is-large like"></i>
              <span>Rock</span>
            </button>
            <button
              type="button"
              className="nes-btn is-success p-2 w-24 h-24 md:w-32 md:h-32 text-sm md:text-base flex flex-col items-center justify-center gap-2"
              onClick={() => play('Paper')}
            >
              <i className="nes-icon is-large star"></i>
              <span>Paper</span>
            </button>
            <button
              type="button"
              className="nes-btn is-error p-2 w-24 h-24 md:w-32 md:h-32 text-sm md:text-base flex flex-col items-center justify-center gap-2"
              onClick={() => play('Scissors')}
            >
              <i className="nes-icon is-large close"></i>
              <span>Scissors</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-sm md:text-base items-center bg-gray-100 p-4 rounded-lg border-2 border-black w-full justify-center min-h-[100px]">
            <div className="flex flex-col items-center">
              <span className="font-bold mb-2">You played:</span>
              <span className={playerChoice ? 'text-blue-600' : 'text-gray-400'}>
                {playerChoice || '?'}
              </span>
            </div>
            <div className="hidden md:block text-2xl font-bold text-gray-400">VS</div>
            <div className="flex flex-col items-center">
              <span className="font-bold mb-2">Computer played:</span>
              <span className={computerChoice ? 'text-red-600' : 'text-gray-400'}>
                {computerChoice || '?'}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="nes-btn is-warning mt-4 w-full md:w-auto"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
