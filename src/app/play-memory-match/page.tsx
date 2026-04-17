'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

export default function MemoryMatchPage() {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initializeGame = () => {
    const shuffled = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatched((prev) => [...prev, firstIndex, secondIndex]);
        setFlipped([]);
      } else {
        timeoutRef.current = setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="nes-btn is-error px-2 py-1 flex items-center justify-center">
          <span className="text-xs">&lt;</span>
        </Link>
        <h1 className="text-2xl md:text-3xl m-0 flex-1 break-words">Memory Match</h1>
      </div>

      <div className="nes-container with-title is-rounded" style={{ padding: '1.5rem' }}>
        <h2 className="title text-base" style={{ background: 'var(--surface)', marginBottom: '0' }}>Game Board</h2>

        <div className="mb-4 text-center">
          <p>Moves: {moves}</p>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-sm mx-auto">
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index);
            const isMatched = matched.includes(index);
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleCardClick(index)}
                className={`nes-btn w-12 h-16 md:w-16 md:h-20 flex items-center justify-center p-0 ${
                  isMatched ? 'is-success cursor-not-allowed opacity-90' : isFlipped ? 'is-warning' : 'is-primary'
                }`}
                style={{ fontSize: '1.5rem' }}
              >
                {isFlipped ? card : '?'}
              </button>
            );
          })}
        </div>

        {matched.length === cards.length && cards.length > 0 && (
          <div className="mt-6 text-center text-green-600">
            <p>You won in {moves} moves!</p>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button type="button" onClick={initializeGame} className="nes-btn is-primary">
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
}
