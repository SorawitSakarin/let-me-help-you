'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const EMOJIS = ['🎮', '🎲', '🎯', '🎰', '🎳', '🎪', '🎨', '🎭'];

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
  const [isWon, setIsWon] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    })));
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    if (newFlippedIndices.length === 2) {
      setMoves((m) => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        // Match found
        newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
        newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
        setCards(newCards);
        setFlippedIndices([]);

        if (newCards.every(c => c.isMatched)) {
          setIsWon(true);
        }
      } else {
        // No match
        timeoutRef.current = setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIndex] = { ...resetCards[firstIndex], isFlipped: false };
          resetCards[secondIndex] = { ...resetCards[secondIndex], isFlipped: false };
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
      return () => {
          if(timeoutRef.current) clearTimeout(timeoutRef.current);
      }
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Memory Match</h2>

        <div className="flex flex-col items-center gap-6 py-4">
          <div className="text-xl flex items-center justify-between w-full px-8">
            <span>Moves: {moves}</span>
            {isWon && <span className="text-green-500 animate-bounce">You Won!</span>}
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 bg-gray-100 p-4 rounded-lg border-4 border-black">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                aria-label={`Card ${index + 1}`}
                className={`nes-btn w-16 h-16 sm:w-20 sm:h-20 text-2xl sm:text-4xl flex items-center justify-center p-0 ${
                  card.isFlipped || card.isMatched ? 'is-success' : 'is-primary'
                } ${card.isMatched ? 'opacity-50' : ''}`}
                onClick={() => handleCardClick(index)}
                disabled={card.isFlipped || card.isMatched}
              >
                {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="nes-btn is-warning mt-4"
            onClick={initializeGame}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
