'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const EMOJIS = ['🍎', '🍌', '🍒', '🍉', '🍇', '🍓', '🥝', '🥑'];

export default function MemoryMatchPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initializeGame = () => {
    const duplicatedEmojis = [...EMOJIS, ...EMOJIS];
    const shuffledEmojis = duplicatedEmojis.sort(() => Math.random() - 0.5);
    const newCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(newCards);
    setFlippedIndices([]);
    setMatches(0);
    setMoves(0);
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    initializeGame();
    return () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    setCards(prevCards => {
        const newCards = [...prevCards];
        newCards[index] = { ...newCards[index], isFlipped: true };
        return newCards;
    });

    if (newFlippedIndices.length === 2) {
      setMoves(m => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (cards[firstIndex].emoji === cards[index].emoji) {
        setMatches(m => m + 1);
        setCards(prevCards => {
            const newCards = [...prevCards];
            newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
            newCards[index] = { ...newCards[index], isMatched: true };
            return newCards;
        });
        setFlippedIndices([]);
      } else {
        timeoutRef.current = setTimeout(() => {
          setCards(prevCards => {
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

  const isWin = matches === EMOJIS.length;

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
              <span>Matches: {matches}/{EMOJIS.length}</span>
          </div>

          {isWin && (
              <div className="text-green-500 text-xl md:text-2xl flex items-center gap-4">
                  <i className="nes-icon trophy is-medium animate-bounce"></i>
                  <span>You Win!</span>
              </div>
          )}

          <div className="grid grid-cols-4 gap-2 md:gap-4 bg-gray-100 p-4 rounded-lg border-4 border-black">
             {cards.map((card, index) => (
                <button
                    key={card.id}
                    type="button"
                    className={`nes-btn w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-2xl sm:text-3xl flex items-center justify-center p-0 m-0 ${card.isFlipped || card.isMatched ? 'is-success' : 'is-primary'} ${card.isMatched ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleCardClick(index)}
                    aria-label={`Card ${index}`}
                >
                    {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
                </button>
             ))}
          </div>

          <button
            type="button"
            className="nes-btn is-warning mt-4"
            onClick={initializeGame}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
