"use client";
import { useState, useEffect, useRef } from "react";

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
  const [isChecking, setIsChecking] = useState(false);
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
    setIsChecking(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    initializeGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsChecking(true);
      setMoves((m) => m + 1);
      timeoutRef.current = setTimeout(() => checkMatch(newFlippedIndices, newCards), 1000);
    }
  };

  const checkMatch = (indices: number[], currentCards: Card[]) => {
    const [firstIndex, secondIndex] = indices;
    const newCards = [...currentCards];

    if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
      newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
      newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
    } else {
      newCards[firstIndex] = { ...newCards[firstIndex], isFlipped: false };
      newCards[secondIndex] = { ...newCards[secondIndex], isFlipped: false };
    }

    setCards(newCards);
    setFlippedIndices([]);
    setIsChecking(false);
  };

  const isWon = cards.length > 0 && cards.every((card) => card.isMatched);

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div className="nes-container with-title is-rounded">
        <p className="title">Memory Match</p>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span>Moves: {moves}</span>
            <button onClick={initializeGame} className="nes-btn is-primary">Reset</button>
          </div>
          {isWon && <div className="text-center text-green-500 font-bold mb-4">You Won! 🎉</div>}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mx-auto w-full max-w-sm">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`nes-btn flex items-center justify-center h-16 sm:h-20 text-2xl sm:text-3xl transition-transform ${card.isFlipped || card.isMatched ? 'is-success' : 'is-error'}`}
                disabled={card.isMatched}
                style={{ opacity: card.isMatched ? 0.5 : 1, transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0)', pointerEvents: isChecking || card.isFlipped || card.isMatched ? 'none' : 'auto' }}
              >
                 <div style={{ transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                     {card.isFlipped || card.isMatched ? card.emoji : '?'}
                 </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}