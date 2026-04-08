'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const EMOJIS = ['🎮', '🚀', '👾', '🌟', '👻', '🍕', '🎸', '🦄'];

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
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initializeGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
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
    setIsWon(false);
    setIsChecking(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCardClick = (index: number) => {
    // Prevent clicking if checking, already flipped, or matched
    if (isChecking || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlippedIndices.length === 2) {
      setIsChecking(true);
      setMoves((prev) => prev + 1);

      const [firstIndex, secondIndex] = newFlippedIndices;

      if (cards[firstIndex].emoji === cards[index].emoji) {
        // Match found
        setCards((prevCards) =>
          prevCards.map((card, i) =>
            i === firstIndex || i === secondIndex
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          )
        );
        setFlippedIndices([]);
        setIsChecking(false);

        // Check win condition
        setCards((currentCards) => {
          if (currentCards.every((card) => card.isMatched)) {
            setIsWon(true);
          }
          return currentCards;
        });
      } else {
        // No match, flip back after delay
        timeoutRef.current = setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, i) =>
              i === firstIndex || i === secondIndex
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedIndices([]);
          setIsChecking(false);
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

        <div className="flex justify-between items-center w-full mb-6 px-4">
            <div>
              <p>Moves: {moves}</p>
            </div>
            <button
                type="button"
                className="nes-btn is-warning text-sm"
                onClick={initializeGame}
            >
               Restart
            </button>
        </div>

        {isWon && (
           <div className="nes-container is-rounded bg-green-50 text-center mb-6">
              <h3 className="text-green-600 mb-2">You Won!</h3>
              <p>Completed in {moves} moves.</p>
           </div>
        )}

        <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-md mx-auto">
          {cards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={`nes-btn aspect-square p-0 flex items-center justify-center text-2xl sm:text-4xl ${
                card.isFlipped || card.isMatched ? 'is-disabled opacity-90' : 'is-primary'
              }`}
              onClick={() => handleCardClick(index)}
            >
               {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
