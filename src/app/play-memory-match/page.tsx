'use client';

import React, { useState, useEffect, useRef } from 'react';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
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
    setFlippedCards([]);
    setMoves(0);
    setIsGameOver(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    initializeGame();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsGameOver(true);
    }
  }, [cards]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstIndex, secondIndex] = newFlippedCards;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        setCards((prevCards) => {
          const updatedCards = [...prevCards];
          updatedCards[firstIndex] = { ...updatedCards[firstIndex], isMatched: true };
          updatedCards[secondIndex] = { ...updatedCards[secondIndex], isMatched: true };
          return updatedCards;
        });
        setFlippedCards([]);
      } else {
        timeoutRef.current = setTimeout(() => {
          setCards((prevCards) => {
            const updatedCards = [...prevCards];
            updatedCards[firstIndex] = { ...updatedCards[firstIndex], isFlipped: false };
            updatedCards[secondIndex] = { ...updatedCards[secondIndex], isFlipped: false };
            return updatedCards;
          });
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Memory Match</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-lg mx-auto">
          Test your memory by finding all the matching pairs.
        </p>
      </div>

      <div className="nes-container with-title">
        <p className="title">Game Board</p>

        <div className="flex justify-between items-center mb-6">
          <div className="text-lg">Moves: {moves}</div>
          <button
            type="button"
            className="nes-btn is-warning"
            onClick={initializeGame}
          >
            Restart
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
          {cards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={`nes-btn aspect-square p-0 flex items-center justify-center text-2xl md:text-4xl transition-all duration-300 ${
                card.isFlipped || card.isMatched ? 'is-success' : ''
              }`}
              onClick={() => handleCardClick(index)}
              aria-label={`Card ${index}`}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '❓'}
            </button>
          ))}
        </div>

        {isGameOver && (
          <div className="nes-container is-rounded is-dark text-center mt-6">
            <h2 className="text-xl md:text-2xl text-yellow-400 mb-4 animate-pulse">
              🎉 You Won! 🎉
            </h2>
            <p className="mb-4">It took you {moves} moves.</p>
            <button
              type="button"
              className="nes-btn is-primary"
              onClick={initializeGame}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}