"use client";

import React, { useState, useEffect, useRef } from "react";

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
    initializeGame();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeGame = () => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    const initialCards: Card[] = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleCardClick = (index: number) => {
    if (!isClient) return;
    if (flippedIndices.length === 2) return; // Prevent clicking while two are flipped
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[index] = { ...newCards[index], isFlipped: true };
      return newCards;
    });

    if (newFlippedIndices.length === 2) {
      setMoves((m) => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (cards[firstIndex].emoji === cards[index].emoji) {
        // Match found
        setCards((prevCards) => {
          const newCards = [...prevCards];
          newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
          newCards[index] = { ...newCards[index], isMatched: true };
          return newCards;
        });
        setMatches((m) => m + 1);
        setFlippedIndices([]);
      } else {
        // No match
        timeoutRef.current = setTimeout(() => {
          setCards((prevCards) => {
            const newCards = [...prevCards];
            newCards[firstIndex] = { ...newCards[firstIndex], isFlipped: false };
            newCards[index] = { ...newCards[index], isFlipped: false };
            return newCards;
          });
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  if (!isClient) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 text-gray-900">
        <div className="w-full max-w-2xl bg-white p-8 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <h1 className="text-3xl font-bold mb-8 text-center uppercase tracking-widest break-words">
            Memory Match
          </h1>
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gray-50 text-gray-900">
      <div className="w-full max-w-2xl bg-white p-4 sm:p-8 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center uppercase tracking-widest break-words">
          Memory Match
        </h1>

        <div className="flex justify-between w-full mb-6 text-sm sm:text-base font-bold">
          <div>Moves: {moves}</div>
          <div>Matches: {matches}/8</div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8 w-full aspect-square max-w-[400px]">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`w-full h-full flex items-center justify-center text-2xl sm:text-4xl border-4 border-black transition-all ${
                card.isFlipped || card.isMatched
                  ? "bg-white"
                  : "bg-blue-500 hover:bg-blue-400 text-white"
              }`}
              style={{
                boxShadow: card.isFlipped || card.isMatched ? "inset 4px 4px 0 0 rgba(0,0,0,0.2)" : "4px 4px 0 0 rgba(0,0,0,1)"
              }}
              aria-label={`Card ${index + 1}`}
            >
              {card.isFlipped || card.isMatched ? card.emoji : "?"}
            </button>
          ))}
        </div>

        {matches === 8 && (
          <div className="mb-6 text-center text-green-600 font-bold animate-bounce text-xl">
            You Win!
          </div>
        )}

        <button
          onClick={initializeGame}
          className="nes-btn is-primary w-full sm:w-auto"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}
