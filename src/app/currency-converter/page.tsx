// src/app/currency-converter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Coins, RefreshCw } from 'lucide-react';
import { fetchRates, convertCurrency } from '@/utils/currency';
import { CurrencySelect } from '@/components/CurrencySelect';

export default function CurrencyConverterPage() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amountA, setAmountA] = useState<string>('1');
  const [amountB, setAmountB] = useState<string>('');

  // Fetch rates on mount
  useEffect(() => {
    async function loadRates() {
      setLoading(true);
      const data = await fetchRates();
      if (data && data.rates) {
        setRates(data.rates);
        setLastUpdate(new Date(data.time_last_update_unix * 1000).toLocaleDateString());
        // Initial conversion
        const initialRateFrom = data.rates['USD'];
        const initialRateTo = data.rates['EUR'];
        if (initialRateFrom && initialRateTo) {
             const converted = convertCurrency(1, initialRateFrom, initialRateTo);
             setAmountB(converted.toFixed(2));
        }
      } else {
        setError('Failed to load exchange rates. Please try again later.');
      }
      setLoading(false);
    }
    loadRates();
  }, []);

  // Update calculation when inputs change
  const handleAmountChange = (side: 'A' | 'B', value: string) => {
    if (!rates) return;

    // Allow empty input
    if (value === '') {
        if (side === 'A') {
            setAmountA('');
            setAmountB('');
        } else {
            setAmountB('');
            setAmountA('');
        }
        return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return; // Or handle invalid input better

    const rateFrom = rates[fromCurrency];
    const rateTo = rates[toCurrency];

    if (side === 'A') {
      setAmountA(value);
      const converted = convertCurrency(numValue, rateFrom, rateTo);
      setAmountB(converted.toFixed(2));
    } else {
      setAmountB(value);
      const converted = convertCurrency(numValue, rateTo, rateFrom);
      setAmountA(converted.toFixed(2));
    }
  };

  const handleCurrencyChange = (side: 'from' | 'to', code: string) => {
    if (!rates) return;

    if (side === 'from') {
      setFromCurrency(code);
      // Recalculate B
      if (amountA) {
         const converted = convertCurrency(parseFloat(amountA), rates[code], rates[toCurrency]);
         setAmountB(converted.toFixed(2));
      }
    } else {
      setToCurrency(code);
      // Recalculate B based on A (keep A constant usually)
      if (amountA) {
         const converted = convertCurrency(parseFloat(amountA), rates[fromCurrency], rates[code]);
         setAmountB(converted.toFixed(2));
      }
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmountA(amountB);
    setAmountB(amountA);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading Exchange Rates...</p>
      </div>
    );
  }

  if (error || !rates) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-red-500 font-medium">{error || 'Unknown error occurred.'}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">Retry</button>
        <Link href="/" className="text-gray-500 hover:text-indigo-600">Back to Home</Link>
      </div>
    );
  }

  const currencyOptions = Object.keys(rates).sort();

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-yellow-500 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
             <Coins className="w-6 h-6" />
             <h1 className="text-2xl font-bold">Currency Exchange</h1>
          </div>
          <p className="text-yellow-100 mt-2">Convert over 150 currencies with real-time rates.</p>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between w-full bg-gray-50 p-6 rounded-xl border border-gray-100">
            {/* Left Side (From) */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-left text-sm font-medium text-gray-700">From</label>
              <CurrencySelect
                value={fromCurrency}
                onChange={(code) => handleCurrencyChange('from', code)}
                options={currencyOptions}
              />
              <input
                type="number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all text-lg font-mono"
                value={amountA}
                onChange={(e) => handleAmountChange('A', e.target.value)}
                placeholder="0.00"
              />
            </div>

            {/* Swap Button */}
            <button
              type="button"
              className="shrink-0 mt-6 p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-gray-500 hover:text-yellow-600"
              onClick={handleSwap}
              aria-label="Swap Currencies"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Right Side (To) */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-left text-sm font-medium text-gray-700">To</label>
              <CurrencySelect
                value={toCurrency}
                onChange={(code) => handleCurrencyChange('to', code)}
                options={currencyOptions}
              />
              <input
                type="number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all text-lg font-mono bg-white"
                value={amountB}
                onChange={(e) => handleAmountChange('B', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 text-center text-sm text-gray-500">
             <p className="font-medium">1 {fromCurrency} = {convertCurrency(1, rates[fromCurrency], rates[toCurrency]).toFixed(4)} {toCurrency}</p>
             <p className="text-xs mt-1 text-gray-400">Last updated: {lastUpdate}</p>
          </div>
        </div>
      </div>

      {/* Attribution */}
      <div className="text-center text-xs mt-8 text-gray-400">
        <p>Exchange rates provided by <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 underline">ExchangeRate-API</a></p>
      </div>
    </div>
  );
}
