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

export default function MemoryMatchPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
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
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    initializeGame();
    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
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
      setMoves((m) => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        setMatches((m) => m + 1);
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
            const unflippedCards = [...prevCards];
            unflippedCards[firstIndex] = { ...unflippedCards[firstIndex], isFlipped: false };
            unflippedCards[secondIndex] = { ...unflippedCards[secondIndex], isFlipped: false };
            return unflippedCards;
          });
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
          <div className="flex justify-between w-full px-8 text-sm md:text-base">
            <p>Moves: {moves}</p>
            <p>Matches: {matches} / 8</p>
          </div>

          {matches === 8 && (
            <div className="text-green-500 animate-bounce font-bold text-xl flex items-center gap-2">
               <i className="nes-icon trophy is-medium"></i> You Win!
            </div>
          )}

          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg border-4 border-black">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={`nes-btn h-16 sm:h-20 md:h-24 text-2xl sm:text-4xl p-0 flex items-center justify-center transition-all duration-300 ${
                  card.isFlipped || card.isMatched ? 'is-primary' : ''
                }`}
                onClick={() => handleCardClick(index)}
                disabled={card.isFlipped || card.isMatched}
                aria-label={`Card ${index + 1}`}
              >
                <span className={card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}>
                  {card.emoji}
                </span>
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
