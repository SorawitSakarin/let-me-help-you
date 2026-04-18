'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const [isWon, setIsWon] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initializeGame = () => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    const initialCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    const initialCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
  }, []);

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
        const matchedCards = [...newCards];
        matchedCards[firstIndex] = { ...matchedCards[firstIndex], isMatched: true };
        matchedCards[secondIndex] = { ...matchedCards[secondIndex], isMatched: true };
        setCards(matchedCards);
        setFlippedIndices([]);

        if (matchedCards.every((card) => card.isMatched)) {
          setIsWon(true);
        }
      } else {
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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
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
          <div className="flex justify-between w-full max-w-sm px-4">
            <span>Moves: {moves}</span>
            {isWon && <span className="text-green-500 font-bold">You Won!</span>}
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 bg-gray-100 p-4 rounded-lg border-4 border-black">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={`nes-btn w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-xl sm:text-3xl flex items-center justify-center p-0 ${card.isFlipped || card.isMatched ? 'is-primary' : ''} ${card.isFlipped || card.isMatched ? 'cursor-not-allowed opacity-90' : ''}`}
                onClick={() => handleCardClick(index)}
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
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
}