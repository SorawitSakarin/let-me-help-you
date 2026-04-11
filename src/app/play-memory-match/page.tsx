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
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [isChecking, setIsChecking] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initializeGame = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji, isFlipped: false, isMatched: false }));
    setCards(shuffled);
    setFlippedIndices([]);
    setMatches(0);
    setIsChecking(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    initializeGame();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = newFlipped;
      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        timerRef.current = setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[firstIndex] = { ...matchedCards[firstIndex], isMatched: true };
          matchedCards[secondIndex] = { ...matchedCards[secondIndex], isMatched: true };
          setCards(matchedCards);
          setFlippedIndices([]);
          setMatches(prev => prev + 1);
          setIsChecking(false);
        }, 500);
      } else {
        timerRef.current = setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIndex] = { ...resetCards[firstIndex], isFlipped: false };
          resetCards[secondIndex] = { ...resetCards[secondIndex], isFlipped: false };
          setCards(resetCards);
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
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="text-xl md:text-2xl text-blue-500">
            Matches: {matches} / {EMOJIS.length}
          </div>
          {matches === EMOJIS.length && (
            <div className="text-2xl text-green-500 animate-bounce">
              <i className="nes-icon trophy is-medium"></i> You Win!
            </div>
          )}
          <div className="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-lg border-4 border-black">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={`nes-btn w-16 h-16 sm:w-20 sm:h-20 text-2xl sm:text-4xl flex items-center justify-center p-0 ${
                  card.isFlipped || card.isMatched ? 'is-primary' : 'is-warning'
                } ${card.isMatched ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleCardClick(index)}
                aria-label={`Card ${index}`}
              >
                {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
              </button>
            ))}
          </div>
          <button type="button" className="nes-btn is-error mt-4" onClick={initializeGame}>
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
