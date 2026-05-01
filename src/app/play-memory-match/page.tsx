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

  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    initializeGame();
    return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

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
        newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
        newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
        setCards(newCards);
        setFlippedIndices([]);
        setIsLocked(false);
      } else {
        timerRef.current = setTimeout(() => {
          setCards((prevCards) => {
            const revertedCards = [...prevCards];
            revertedCards[firstIndex] = { ...revertedCards[firstIndex], isFlipped: false };
            revertedCards[secondIndex] = { ...revertedCards[secondIndex], isFlipped: false };
            return revertedCards;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const isWin = cards.length > 0 && cards.every((card) => card.isMatched);

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
           <div className={`text-xl md:text-2xl flex items-center gap-4 ${isWin ? 'text-green-500' : 'text-blue-500'}`}>
            {isWin && <i className="nes-icon trophy is-medium animate-bounce"></i>}
            <span>{isWin ? `You won in ${moves} moves!` : `Moves: ${moves}`}</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 p-4 bg-gray-100 rounded-lg border-4 border-black">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={`nes-btn w-12 h-16 sm:w-16 sm:h-20 md:w-24 md:h-28 text-2xl sm:text-3xl md:text-4xl flex items-center justify-center p-0 ${card.isFlipped || card.isMatched ? 'is-primary' : 'is-error'} ${card.isMatched ? 'opacity-50' : ''}`}
                onClick={() => handleCardClick(index)}
                aria-label={`Card ${index}`}
                disabled={card.isFlipped || card.isMatched || isLocked}
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