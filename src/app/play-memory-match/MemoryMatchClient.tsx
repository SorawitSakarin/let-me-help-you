'use client';

import React, { useState, useEffect, useRef } from 'react';

const EMOJIS = ['🎃', '👻', '👽', '🤖', '🤡', '💩', '👾', '🤠'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatchClient() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Derived state
  const isGameOver = cards.length > 0 && cards.every((card) => card.isMatched);

  const initializeGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    initializeGame();
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

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        setCards((prevCards) => {
          const matchedCards = [...prevCards];
          matchedCards[firstIndex] = { ...matchedCards[firstIndex], isMatched: true };
          matchedCards[secondIndex] = { ...matchedCards[secondIndex], isMatched: true };
          return matchedCards;
        });
        setFlippedIndices([]);
      } else {
        timeoutRef.current = setTimeout(() => {
          setCards((prevCards) => {
            const unmatchedCards = [...prevCards];
            unmatchedCards[firstIndex] = { ...unmatchedCards[firstIndex], isFlipped: false };
            unmatchedCards[secondIndex] = { ...unmatchedCards[secondIndex], isFlipped: false };
            return unmatchedCards;
          });
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex justify-between w-full max-w-sm">
        <span className="nes-text is-primary">Moves: {moves}</span>
        {isGameOver && <span className="nes-text is-success">You Win!</span>}
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {cards.map((card, index) => {
          const isFlippedOrMatched = card.isFlipped || card.isMatched;
          return (
             <button
                key={card.id}
                type="button"
                className={`nes-btn flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 text-2xl sm:text-3xl p-0 ${
                  card.isMatched ? 'is-success' : isFlippedOrMatched ? 'is-warning' : 'is-primary'
                }`}
                onClick={() => handleCardClick(index)}
                style={{
                  cursor: isFlippedOrMatched ? 'not-allowed' : 'pointer',
                  opacity: card.isMatched ? 0.8 : 1
                }}
              >
                {isFlippedOrMatched ? card.emoji : '?'}
             </button>
          )
        })}
      </div>

      <button type="button" className="nes-btn" onClick={initializeGame}>
        Restart Game
      </button>
    </div>
  );
}
