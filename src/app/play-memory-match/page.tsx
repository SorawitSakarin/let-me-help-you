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
  const [isLocked, setIsLocked] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeGame();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const initializeGame = () => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    })));
    setFlippedIndices([]);
    setMoves(0);
    setIsLocked(false);
  };

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsLocked(true);
      setMoves(m => m + 1);

      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
        newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
        setCards(newCards);
        setFlippedIndices([]);
        setIsLocked(false);
      } else {
        timeoutRef.current = setTimeout(() => {
          setCards(currentCards => {
            const resetCards = [...currentCards];
            resetCards[firstIndex] = { ...resetCards[firstIndex], isFlipped: false };
            resetCards[secondIndex] = { ...resetCards[secondIndex], isFlipped: false };
            return resetCards;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const isGameWon = cards.length > 0 && cards.every(card => card.isMatched);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Memory Match</h2>

        <div className="flex justify-between items-center w-full mb-6 px-4">
          <p className="mb-0">Moves: {moves}</p>
          <button type="button" className="nes-btn is-error" onClick={initializeGame}>
            Restart
          </button>
        </div>

        {isGameWon ? (
          <div className="text-center py-8">
            <h3 className="text-xl text-green-600 mb-4 animate-bounce">You Won! 🎉</h3>
            <p className="mb-6">Total moves: {moves}</p>
            <button type="button" className="nes-btn is-success" onClick={initializeGame}>
              Play Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-md mx-auto perspective-1000">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={`aspect-square nes-btn p-0 text-2xl sm:text-4xl transition-transform duration-300 transform-style-3d ${
                  card.isFlipped || card.isMatched ? 'is-success' : 'is-primary'
                }`}
                onClick={() => handleCardClick(index)}
                disabled={card.isFlipped || card.isMatched || isLocked}
              >
                {card.isFlipped || card.isMatched ? card.emoji : '?'}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}