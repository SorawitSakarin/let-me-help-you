'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const ICONS = ['coin', 'trophy', 'twitch', 'like', 'star', 'github', 'heart', 'arrow-down'];

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatchPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const getInitialCards = () => {
    return [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
  };

  const initializeGame = () => {
    setCards(getInitialCards());
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    setCards(getInitialCards());
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    const newCards = cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlippedIndices.length === 2) {
      setMoves(m => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].icon === newCards[secondIndex].icon) {
        const matchedCards = newCards.map((card, i) =>
          i === firstIndex || i === secondIndex
            ? { ...card, isMatched: true }
            : card
        );
        setCards(matchedCards);
        setFlippedIndices([]);

        if (matchedCards.every(card => card.isMatched)) {
          setIsWon(true);
        }
      } else {
        timeoutRef.current = setTimeout(() => {
          setCards(prevCards =>
            prevCards.map((card, i) =>
              i === firstIndex || i === secondIndex
                ? { ...card, isFlipped: false }
                : card
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
          <div className="flex justify-between w-full max-w-[400px] px-4 text-sm md:text-base">
            <span>Moves: {moves}</span>
            {isWon && <span className="text-green-500 animate-pulse flex items-center gap-2"><i className="nes-icon trophy is-small animate-bounce"></i>You Won!</span>}
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-4 bg-gray-100 p-4 rounded-lg border-4 border-black">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={`nes-btn w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center p-0 ${
                  card.isFlipped || card.isMatched ? 'is-primary' : ''
                } ${card.isMatched ? 'opacity-50 cursor-default' : ''}`}
                onClick={() => handleCardClick(index)}
                aria-label={`Card ${index}`}
                disabled={card.isMatched}
              >
                {(card.isFlipped || card.isMatched) ? (
                  <i className={`nes-icon ${card.icon} is-small`}></i>
                ) : (
                  <span>?</span>
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="nes-btn is-warning mt-4"
            onClick={initializeGame}
          >
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
}