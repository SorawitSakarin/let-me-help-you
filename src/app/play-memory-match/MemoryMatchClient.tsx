'use client';

import React, { useState, useEffect, useRef } from 'react';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatchClient() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
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
    setMatches(0);
    setMoves(0);
    setIsGameWon(false);
  };

  useEffect(() => {
    initializeGame();
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
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
        newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
        setCards(newCards);
        setFlippedIndices([]);
        setMatches(matches + 1);
        if (matches + 1 === EMOJIS.length) {
          setIsGameWon(true);
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

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="nes-container with-title is-rounded">
        <h2 className="title">Memory Match</h2>
        <div className="mb-4 flex justify-between items-center">
          <p>Moves: {moves}</p>
          <p>Matches: {matches} / {EMOJIS.length}</p>
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-4">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`nes-btn w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-2xl md:text-3xl ${card.isFlipped || card.isMatched ? 'is-success' : 'is-primary'}`}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '?'}
            </button>
          ))}
        </div>
        {isGameWon && (
          <div className="nes-container is-rounded is-dark mt-4 text-center">
            <p className="mb-2">You Won in {moves} moves!</p>
            <button className="nes-btn is-primary" onClick={initializeGame}>
              Play Again
            </button>
          </div>
        )}
        {!isGameWon && (
           <div className="mt-4 text-center">
             <button className="nes-btn is-warning" onClick={initializeGame}>Restart Game</button>
           </div>
        )}
      </div>
    </div>
  );
}