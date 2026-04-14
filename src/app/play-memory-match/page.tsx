'use client';
import { useState, useEffect, useRef } from 'react';

const EMOJIS = ['🍄', '🌟', '👻', '🐙', '👾', '🚀', '🐢', '🐉'];

interface CardType {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
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
    setMoves(0);
    setMatches(0);
    setFlippedIndices([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    if (newFlippedIndices.length === 2) {
      setMoves(m => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
        newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
        setCards(newCards);
        setMatches(m => m + 1);
        setFlippedIndices([]);
      } else {
        timeoutRef.current = setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex] = { ...resetCards[firstIndex], isFlipped: false };
          resetCards[secondIndex] = { ...resetCards[secondIndex], isFlipped: false };
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="max-w-md mx-auto flex flex-col gap-6">
      <div className="nes-container with-title is-centered">
        <p className="title">Memory Match</p>
        <div className="flex justify-between mb-4 text-sm">
          <span>Moves: {moves}</span>
          <span>Matches: {matches}/8</span>
        </div>

        {matches === 8 ? (
           <div className="text-center py-4">
             <p className="text-success mb-4">You Won!</p>
             <button onClick={initializeGame} className="nes-btn is-success">Play Again</button>
           </div>
        ) : (
           <div className="grid grid-cols-4 gap-2">
             {cards.map((card, index) => (
               <button
                 key={card.id}
                 onClick={() => handleCardClick(index)}
                 className={`nes-btn ${card.isFlipped || card.isMatched ? 'is-warning' : 'is-primary'} h-16 w-full flex items-center justify-center p-0 text-2xl`}
                 style={{ cursor: card.isFlipped || card.isMatched ? 'default' : 'pointer' }}
               >
                 {card.isFlipped || card.isMatched ? card.emoji : '?'}
               </button>
             ))}
           </div>
        )}
      </div>
    </div>
  );
}
