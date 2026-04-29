'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const EMOJIS = ['👾', '🎮', '🚀', '🌟', '🍕', '🍔', '🐶', '🐱'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function PlayMemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

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
    setIsLocked(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
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

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsLocked(true);
      setMoves((prev) => prev + 1);

      const [firstIndex, secondIndex] = newFlippedIndices;
      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        setMatches((prev) => prev + 1);
        const matchedCards = [...newCards];
        matchedCards[firstIndex] = { ...matchedCards[firstIndex], isMatched: true };
        matchedCards[secondIndex] = { ...matchedCards[secondIndex], isMatched: true };
        setCards(matchedCards);
        setFlippedIndices([]);
        setIsLocked(false);
      } else {
        timeoutRef.current = setTimeout(() => {
          const unflippedCards = [...newCards];
          unflippedCards[firstIndex] = { ...unflippedCards[firstIndex], isFlipped: false };
          unflippedCards[secondIndex] = { ...unflippedCards[secondIndex], isFlipped: false };
          setCards(unflippedCards);
          setFlippedIndices([]);
          setIsLocked(false);
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

        <div className="mb-4 flex justify-between px-4">
          <p>Moves: {moves}</p>
          <p>Matches: {matches} / 8</p>
        </div>

        {matches === 8 && (
          <div className="mb-4 text-green-500 animate-bounce">
            <i className="nes-icon trophy is-medium"></i>
            <p>You Win!</p>
          </div>
        )}

        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6 place-items-center">
          {cards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={`nes-btn p-0 m-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-2xl sm:text-4xl flex items-center justify-center ${
                card.isFlipped || card.isMatched ? 'is-primary' : ''
              }`}
              onClick={() => handleCardClick(index)}
              disabled={card.isFlipped || card.isMatched || isLocked}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '?'}
            </button>
          ))}
        </div>

        <button type="button" className="nes-btn is-warning" onClick={initializeGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}
