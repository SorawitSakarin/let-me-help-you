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

export default function MemoryMatchPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Store indices of currently flipped cards that haven't been matched yet
  const flippedIndicesRef = useRef<number[]>([]);

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
    setMoves(0);
    setIsLocked(false);
    flippedIndicesRef.current = [];
  };

  useEffect(() => {
    setIsClient(true);
    initializeGame();
  }, []);

  const handleCardClick = (index: number) => {
    // Prevent clicking if locked, already flipped, or matched
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlippedIndices = [...flippedIndicesRef.current, index];
    flippedIndicesRef.current = newFlippedIndices;

    if (newFlippedIndices.length === 2) {
      setIsLocked(true);
      setMoves(moves + 1);

      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        // Match found
        setTimeout(() => {
            setCards(prev => {
                const matchedCards = [...prev];
                matchedCards[firstIndex] = { ...matchedCards[firstIndex], isMatched: true };
                matchedCards[secondIndex] = { ...matchedCards[secondIndex], isMatched: true };
                return matchedCards;
            });
            flippedIndicesRef.current = [];
            setIsLocked(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
            setCards(prev => {
                const resetCards = [...prev];
                resetCards[firstIndex] = { ...resetCards[firstIndex], isFlipped: false };
                resetCards[secondIndex] = { ...resetCards[secondIndex], isFlipped: false };
                return resetCards;
            });
            flippedIndicesRef.current = [];
            setIsLocked(false);
        }, 1000);
      }
    }
  };

  if (!isClient) {
      return null;
  }

  const isGameOver = cards.length > 0 && cards.every(card => card.isMatched);

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
          <div className="flex justify-between w-full px-4 text-sm md:text-base">
            <p>Moves: {moves}</p>
            {isGameOver && <p className="text-green-500 animate-bounce">You Win!</p>}
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-4 bg-gray-100 p-4 rounded-lg border-4 border-black">
             {cards.map((card, index) => {
                 const isInteractive = !card.isFlipped && !card.isMatched && !isLocked;

                 return (
                    <button
                        key={card.id}
                        type="button"
                        className={`nes-btn flex items-center justify-center p-0 m-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-2xl sm:text-4xl ${
                            card.isFlipped || card.isMatched ? 'is-primary cursor-default' : ''
                        } ${!isInteractive ? 'opacity-90 cursor-not-allowed' : ''}`}
                        onClick={() => handleCardClick(index)}
                        aria-label={`Card ${index}`}
                    >
                        {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
                    </button>
                 );
             })}
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
