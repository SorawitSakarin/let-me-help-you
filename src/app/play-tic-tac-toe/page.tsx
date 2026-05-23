'use client';

import { useState } from 'react';
import Link from 'next/link';

type Player = 'X' | 'O' | null;

export default function TicTacToePage() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  const handleClick = (index: number) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (index: number) => {
    return (
      <button
        type="button"
        className={`nes-btn w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-2xl sm:text-4xl flex items-center justify-center p-0 m-1 ${
          board[index] === 'X' ? 'is-primary' : board[index] === 'O' ? 'is-error' : ''
        } ${!!board[index] || !!winner ? 'cursor-not-allowed opacity-90' : ''}`}
        onClick={() => handleClick(index)}
        aria-label={`Square ${index}`}
      >
        {board[index]}
      </button>
    );
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
          <Link href="/" className="nes-btn">
              &lt; Back to Home
          </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Tic Tac Toe</h2>

        <div className="flex flex-col items-center gap-6 py-4">
          <div className={`text-xl md:text-2xl flex items-center gap-4 ${winner ? 'text-green-500' : isDraw ? 'text-yellow-500' : 'text-blue-500'}`}>
            {winner && <i className="nes-icon trophy is-medium animate-bounce"></i>}
            <span>{status}</span>
          </div>

          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg border-4 border-black">
            <div className="flex">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="flex">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="flex">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>

          <button
            type="button"
            className="nes-btn is-warning mt-4"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
