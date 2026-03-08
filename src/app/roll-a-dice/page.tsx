'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RollADicePage() {
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setDiceValue(null);

    // Simulate rolling animation time
    const timeoutId = setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newValue);
      setIsRolling(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  const renderDiceFace = (value: number) => {
    // 8-bit style simple dot rendering
    const dots = [];
    switch (value) {
      case 1:
        dots.push(<div key="center" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full"></div>);
        break;
      case 2:
        dots.push(<div key="top-left" className="absolute top-4 left-4 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="bottom-right" className="absolute bottom-4 right-4 w-4 h-4 bg-black rounded-full"></div>);
        break;
      case 3:
        dots.push(<div key="top-left" className="absolute top-4 left-4 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="center" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="bottom-right" className="absolute bottom-4 right-4 w-4 h-4 bg-black rounded-full"></div>);
        break;
      case 4:
        dots.push(<div key="top-left" className="absolute top-4 left-4 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="top-right" className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="bottom-left" className="absolute bottom-4 left-4 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="bottom-right" className="absolute bottom-4 right-4 w-4 h-4 bg-black rounded-full"></div>);
        break;
      case 5:
        dots.push(<div key="top-left" className="absolute top-4 left-4 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="top-right" className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="center" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="bottom-left" className="absolute bottom-4 left-4 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="bottom-right" className="absolute bottom-4 right-4 w-4 h-4 bg-black rounded-full"></div>);
        break;
      case 6:
        dots.push(<div key="top-left" className="absolute top-4 left-4 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="middle-left" className="absolute top-1/2 left-4 transform -translate-y-1/2 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="bottom-left" className="absolute bottom-4 left-4 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="top-right" className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="middle-right" className="absolute top-1/2 right-4 transform -translate-y-1/2 w-4 h-4 bg-black rounded-full"></div>);
        dots.push(<div key="bottom-right" className="absolute bottom-4 right-4 w-4 h-4 bg-black rounded-full"></div>);
        break;
    }
    return dots;
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
          <Link href="/" className="nes-btn">
              &lt; Back to Home
          </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Roll a Dice</h2>

        <div className="flex flex-col items-center gap-8 py-8">

          <div
            className={`relative w-32 h-32 md:w-48 md:h-48 border-4 border-black bg-white rounded-xl flex items-center justify-center transition-transform duration-100 ${
              isRolling ? 'animate-spin' : ''
            }`}
            style={{
              boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
              // Add a bit of 3D effect based on rolling state
              transform: isRolling ? 'rotate(180deg) scale(0.9)' : 'rotate(0deg) scale(1)',
            }}
          >
            {isRolling ? (
              <span className="text-4xl text-gray-400">?</span>
            ) : diceValue ? (
              renderDiceFace(diceValue)
            ) : (
              <span className="text-sm md:text-base text-gray-500">Roll Me!</span>
            )}
          </div>

          <div className="h-8">
            {diceValue && !isRolling && (
              <p className="text-xl text-green-600 animate-bounce">
                You rolled a {diceValue}!
              </p>
            )}
            {isRolling && (
              <p className="text-xl text-blue-600 animate-pulse">
                Rolling...
              </p>
            )}
          </div>

          <button
            type="button"
            className={`nes-btn w-full max-w-xs ${isRolling ? 'is-disabled' : 'is-primary'}`}
            onClick={rollDice}
            disabled={isRolling}
          >
            {isRolling ? 'Wait...' : 'Roll Dice'}
          </button>
        </div>
      </div>
    </div>
  );
}
