'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

export default function MemoryMatchClient() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initializeGame = () => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledEmojis);
    setFlippedIndices([]);
    setMoves(0);
    setIsLocked(false);
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    initializeGame();
    return () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }
  }, []);

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
      setMoves((prev) => prev + 1);

      const [firstIndex, secondIndex] = newFlippedIndices;
      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        // Match found
        const matchedCards = [...newCards];
        matchedCards[firstIndex] = { ...matchedCards[firstIndex], isMatched: true };
        matchedCards[secondIndex] = { ...matchedCards[secondIndex], isMatched: true };
        setCards(matchedCards);
        setFlippedIndices([]);
        setIsLocked(false);
      } else {
        // No match
        timeoutRef.current = setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIndex] = { ...resetCards[firstIndex], isFlipped: false };
          resetCards[secondIndex] = { ...resetCards[secondIndex], isFlipped: false };
          setCards(resetCards);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const isGameComplete = cards.length > 0 && cards.every((card) => card.isMatched);

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
          <div className="flex justify-between w-full px-4 text-xl">
             <span>Moves: {moves}</span>
             {isGameComplete && <span className="text-green-500 animate-pulse">You Win!</span>}
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 bg-gray-100 p-4 rounded-lg border-4 border-black">
             {cards.map((card, index) => (
                <button
                   key={card.id}
                   type="button"
                   className={`nes-btn w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-2xl sm:text-4xl flex items-center justify-center p-0 ${
                       card.isFlipped || card.isMatched ? 'is-primary' : ''
                   } ${card.isMatched ? 'opacity-50 cursor-not-allowed' : ''}`}
                   onClick={() => handleCardClick(index)}
                   disabled={card.isMatched}
                >
                   {card.isFlipped || card.isMatched ? card.emoji : '?'}
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
