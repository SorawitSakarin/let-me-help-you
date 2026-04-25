'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function MemoryMatchClient() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [matches, setMatches] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    setFlippedCards([]);
    setMatches(0);
    setIsLocked(false);
  };

  useEffect(() => {
    initializeGame();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsLocked(true);
      const [firstIndex, secondIndex] = newFlippedCards;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
        newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
        setCards(newCards);
        setFlippedCards([]);
        setMatches((prev) => prev + 1);
        setIsLocked(false);
      } else {
        timeoutRef.current = setTimeout(() => {
          newCards[firstIndex] = { ...newCards[firstIndex], isFlipped: false };
          newCards[secondIndex] = { ...newCards[secondIndex], isFlipped: false };
          setCards(newCards);
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4 pb-10">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Memory Match</h2>
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="text-xl">
            Matches: {matches} / {EMOJIS.length}
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={`nes-btn w-16 h-16 md:w-24 md:h-24 p-0 flex items-center justify-center text-2xl md:text-4xl ${
                  card.isFlipped || card.isMatched ? 'is-success' : 'is-primary'
                }`}
                onClick={() => handleCardClick(index)}
                disabled={card.isFlipped || card.isMatched || isLocked}
              >
                {card.isFlipped || card.isMatched ? card.emoji : '?'}
              </button>
            ))}
          </div>

          {matches === EMOJIS.length && (
            <div className="text-green-500 font-bold text-xl animate-bounce">
              You Win!
            </div>
          )}

          <button type="button" className="nes-btn is-warning mt-4" onClick={initializeGame}>
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
