'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const ICONS = [
  'nes-icon coin', 'nes-icon trophy', 'nes-icon heart', 'nes-icon star',
  'nes-icon like', 'nes-icon twitch', 'nes-icon github', 'nes-icon whatsapp'
];

type Card = { id: number; icon: string; isFlipped: boolean; isMatched: boolean };

export default function MemoryMatchPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initializeGame = () => {
    const shuffledIcons = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon, isFlipped: false, isMatched: false }));
    setCards(shuffledIcons);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    initializeGame();
    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    const newCards = cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlippedIndices.length === 2) {
      setMoves((m) => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (cards[firstIndex].icon === cards[secondIndex].icon) {
        const matchedCards = newCards.map((card, i) =>
          i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
        );
        setCards(matchedCards);
        setFlippedIndices([]);

        if (matchedCards.every((card) => card.isMatched)) {
          setIsWon(true);
        }

      } else {
        timeoutRef.current = setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, i) =>
              i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
            )
          );
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
        <h2 className="title">Memory Match</h2>

        <div className="flex flex-col items-center gap-6 py-4">
          <div className="flex justify-between w-full max-w-sm px-4 text-sm md:text-base">
            <span>Moves: {moves}</span>
            {isWon && <span className="text-green-500 animate-bounce">You Win!</span>}
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-4 bg-gray-100 p-4 rounded-lg border-4 border-black">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={`nes-btn w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center p-0 ${
                  card.isFlipped || card.isMatched ? 'is-success' : 'is-primary'
                }`}
                onClick={() => handleCardClick(index)}
                disabled={card.isFlipped || card.isMatched}
                aria-label={`Card ${index}`}
              >
                {(card.isFlipped || card.isMatched) ? <i className={`${card.icon} is-medium`}></i> : <span className="text-2xl">?</span>}
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
