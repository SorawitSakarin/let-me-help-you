'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Dices, Trophy, X } from 'lucide-react';

const Wheel = dynamic(() => import('react-custom-roulette').then((mod) => mod.Wheel), { ssr: false });

// Modern Vibrant Palette
const WHEEL_COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6'];

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
    .map((option, index) => {
        const bgColor = WHEEL_COLORS[index % WHEEL_COLORS.length];
        return {
          option,
          style: { backgroundColor: bgColor, textColor: '#ffffff' }
        };
    });

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
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-rose-500 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
             <Dices className="w-6 h-6" />
             <h1 className="text-2xl font-bold">Random Slot Machine</h1>
          </div>
          <p className="text-rose-100 mt-2">Spin the wheel to make a fair decision.</p>
        </div>

        <div className="p-8 flex flex-col lg:flex-row gap-12">
          {/* Input Section */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div>
              <label htmlFor="options_field" className="block text-sm font-medium text-gray-700 mb-2">
                Options (one per line)
              </label>
              <textarea
                id="options_field"
                className="w-full h-64 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all resize-none font-sans text-gray-700"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your options here..."
              ></textarea>
              <div className="flex justify-between mt-2">
                <p className="text-xs text-gray-500">Add at least 2 options.</p>
                <p className="text-xs text-gray-500">{data.length} options</p>
              </div>
            </div>
          </div>

          {/* Wheel Section */}
          <div className="w-full lg:w-2/3 flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8 border border-gray-100 min-h-[400px]">
            {data.length > 0 ? (
              <div className="transform-gpu scale-75 md:scale-90 lg:scale-100 transition-transform duration-300">
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={data}
                  onStopSpinning={handleStopSpinning}
                  outerBorderColor={'#e5e7eb'}
                  outerBorderWidth={4}
                  innerRadius={0}
                  innerBorderColor={'#e5e7eb'}
                  innerBorderWidth={0}
                  radiusLineColor={'rgba(255, 255, 255, 0.2)'}
                  radiusLineWidth={1}
                  fontSize={16}
                  perpendicularText={true}
                  textDistance={60}
                />
              </div>
            ) : (
              <div className="text-center p-12 text-gray-400 border-2 border-dashed border-gray-300 rounded-xl w-full max-w-md">
                <p>Add some options to see the wheel!</p>
              </div>
            )}

            <button
              type="button"
              className={`mt-8 px-12 py-4 bg-rose-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-rose-600 focus:ring-4 focus:ring-rose-200 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-lg tracking-wide ${mustSpin ? 'cursor-wait' : ''}`}
              onClick={handleSpinClick}
              disabled={mustSpin || data.length < 2}
            >
              {mustSpin ? 'Spinning...' : 'SPIN!'}
            </button>
          </div>
        </div>
      </div>

      {/* Winner Modal */}
      {showWinner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative transform scale-100 transition-transform">
            <button
                onClick={() => setShowWinner(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X className="w-6 h-6" />
            </button>

            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 text-center text-white">
                <Trophy className="w-16 h-16 mx-auto mb-4 drop-shadow-md animate-bounce" />
                <h3 className="text-2xl font-bold drop-shadow-sm">We have a winner!</h3>
            </div>

            <div className="p-8 text-center">
              <p className="text-gray-500 mb-2 font-medium uppercase tracking-wider text-sm">The result is</p>
              <p className="text-4xl font-black text-gray-900 break-words leading-tight">{winner}</p>

              <button
                onClick={() => setShowWinner(false)}
                className="mt-8 w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
