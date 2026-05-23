'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const ICONS = [
  'nes-icon coin', 'nes-icon trophy', 'nes-icon like', 'nes-icon star',
  'nes-icon twitch', 'nes-icon github', 'nes-icon heart', 'nes-icon save'
];

type Card = {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function MemoryGamePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    initializeGame();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const initializeGame = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const shuffledIcons = [...ICONS, ...ICONS].sort(() => Math.random() - 0.5);
    const initialCards = shuffledIcons.map((icon, index) => ({
      id: index,
      icon,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    const newCards = cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (newCards[firstIndex].icon === newCards[secondIndex].icon) {
        const matchedCards = newCards.map((card, i) =>
          i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
        );
        setCards(matchedCards);
        setFlippedIndices([]);
        if (matchedCards.every(card => card.isMatched)) {
          timeoutRef.current = setTimeout(() => setIsWon(true), 500);
        }
      } else {
        timeoutRef.current = setTimeout(() => {
          const resetCards = newCards.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
          );
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>
      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Memory Game</h2>
        <div className="flex flex-col items-center gap-6 py-4">
          {isWon && (
            <div className="text-xl md:text-2xl flex items-center gap-4 text-green-500">
              <i className="nes-icon trophy is-medium animate-bounce"></i>
              <span>You Won in {moves} moves!</span>
            </div>
          )}
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={`nes-btn w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 p-0 flex items-center justify-center ${card.isFlipped || card.isMatched ? 'is-primary' : ''}`}
                onClick={() => handleCardClick(index)}
                aria-label={`Card ${index}`}
              >
                {(card.isFlipped || card.isMatched) ? (
                  <i className={`${card.icon} is-small sm:is-medium`}></i>
                ) : (
                  <span className="text-2xl font-bold">?</span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-lg">Moves: {moves}</span>
            <button type="button" className="nes-btn is-warning" onClick={initializeGame}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}