'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatchPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initializeGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const shuffledEmojis = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
    setCards(shuffledEmojis);
    setFlippedIndices([]);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves(prev => prev + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        const matchedCards = [...newCards];
        matchedCards[firstIndex] = { ...matchedCards[firstIndex], isMatched: true };
        matchedCards[secondIndex] = { ...matchedCards[secondIndex], isMatched: true };
        setCards(matchedCards);
        setFlippedIndices([]);
      } else {
        timeoutRef.current = setTimeout(() => {
          const unFlippedCards = [...newCards];
          unFlippedCards[firstIndex] = { ...unFlippedCards[firstIndex], isFlipped: false };
          unFlippedCards[secondIndex] = { ...unFlippedCards[secondIndex], isFlipped: false };
          setCards(unFlippedCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const isWin = cards.length > 0 && cards.every(card => card.isMatched);

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <Link href="/" className="nes-btn">
          &larr; Back
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-center">Memory Match</h1>
        <div className="w-[100px]"></div>
      </div>

      <div className="nes-container with-title text-center mb-8 w-full max-w-md">
        <p className="title">Score</p>
        <p className="text-xl">Moves: {moves}</p>
        {isWin && (
          <div className="mt-4 animate-bounce">
            <p className="text-success text-xl font-bold">You Win!</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`nes-btn ${card.isFlipped || card.isMatched ? 'is-success' : ''} h-20 w-20 md:h-24 md:w-24 text-2xl md:text-4xl flex items-center justify-center p-0`}
            disabled={card.isFlipped || card.isMatched}
            aria-label={`Card ${index + 1}`}
          >
            {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
          </button>
        ))}
      </div>

      <button onClick={initializeGame} className="nes-btn is-primary">
        Reset Game
      </button>
    </main>
  );
}