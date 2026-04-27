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

export default function MemoryMatchClient() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
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
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    initializeGame();
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    if (newFlippedIndices.length === 2) {
      setMoves((m) => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
        newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
        setCards(newCards);
        setFlippedIndices([]);
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
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">&lt; Back to Home</Link>
      </div>
      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Memory Match</h2>
        <div className="flex justify-between items-center w-full mb-4 px-4">
          <span className="text-xl">Moves: {moves}</span>
          <button type="button" className="nes-btn is-warning" onClick={initializeGame}>Restart</button>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-4 p-4 bg-gray-100 rounded-lg border-4 border-black">
          {cards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(index)}
              className={`nes-btn w-16 h-16 sm:w-24 sm:h-24 text-2xl sm:text-4xl flex items-center justify-center p-0 ${card.isFlipped || card.isMatched ? 'is-primary' : ''}`}
              disabled={card.isFlipped || card.isMatched}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '?'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
