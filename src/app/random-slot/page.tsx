'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Wheel = dynamic(() => import('react-custom-roulette').then((mod) => mod.Wheel), { ssr: false });

// Shades of green for the spy theme
const SPY_COLORS = ['#003300', '#004400', '#005500', '#006600', '#007700', '#008800'];
const SPY_TEXT_COLOR = '#00ff00';

export default function RandomSlotPage() {
  const [text, setText] = useState('Yes\nNo\nMaybe');
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showWinner, setShowWinner] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  // Convert text to data array
  const data = text
    .split('\n')
    .map(t => t.trim())
    .filter(t => t.length > 0)
    .map((option, index) => ({
      option,
      style: { backgroundColor: SPY_COLORS[index % SPY_COLORS.length], textColor: SPY_TEXT_COLOR }
    }));

  const handleSpinClick = () => {
    if (data.length < 2) {
      alert('Please enter at least 2 options!');
      return;
    }
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setShowWinner(false);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setWinner(data[prizeNumber].option);
    setShowWinner(true);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-6xl mx-auto px-4">
      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Random Slot Machine</h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full">
          {/* Input Section */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <label htmlFor="options_field" className="nes-text is-primary">Options (one per line):</label>
            <textarea
              id="options_field"
              className="nes-textarea min-h-[300px] w-full"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your options here..."
            ></textarea>
            <p className="text-xs text-gray-500 text-right">{data.length} options</p>
          </div>

          {/* Wheel Section */}
          <div className="w-full lg:w-2/3 flex flex-col items-center justify-center min-h-[400px]">
            {data.length > 0 ? (
              <div className="transform-gpu scale-75 md:scale-90">
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={data}
                  onStopSpinning={handleStopSpinning}
                  outerBorderColor={'#00ff00'}
                  outerBorderWidth={10}
                  innerRadius={10}
                  innerBorderColor={'#00ff00'}
                  innerBorderWidth={0}
                  radiusLineColor={'#00ff00'}
                  radiusLineWidth={1}
                  fontSize={16}
                  perpendicularText={true}
                  textColors={[SPY_TEXT_COLOR]}
                  backgroundColors={SPY_COLORS}
                />
              </div>
            ) : (
              <div className="nes-container is-rounded is-dark">
                <p>Add some options to see the wheel!</p>
              </div>
            )}

            <button
              type="button"
              className={`nes-btn is-error mt-8 w-full max-w-xs ${mustSpin || data.length < 2 ? 'is-disabled' : ''}`}
              onClick={handleSpinClick}
              disabled={mustSpin || data.length < 2}
            >
              SPIN!
            </button>
          </div>
        </div>
      </div>

      {/* Winner Modal */}
      {showWinner && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="nes-dialog is-rounded relative animate-bounce-in max-w-md w-full border-4 border-green-500 bg-black text-green-500">
            <form method="dialog" onSubmit={(e) => { e.preventDefault(); setShowWinner(false); }}>
              <h3 className="title border-b-4 border-green-500 pb-2 mb-4">Winner!</h3>
              <div className="text-center my-8">
                <i className="nes-icon trophy is-large mb-4 filter hue-rotate-90"></i>
                <p className="text-2xl font-bold break-words">{winner}</p>
              </div>
              <menu className="dialog-menu flex justify-end border-t-4 border-green-500 pt-4">
                <button className="nes-btn is-primary">OK</button>
              </menu>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
