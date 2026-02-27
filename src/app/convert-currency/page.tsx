// src/app/currency-converter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchRates, convertCurrency, formatCurrency } from '@/utils/currency';
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
        <p>Loading Exchange Rates...</p>
        <progress className="nes-progress is-primary w-64" value="50" max="100"></progress>
      </div>
    );
  }

  if (error || !rates) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="nes-text is-error">{error || 'Unknown error occurred.'}</p>
        <button onClick={() => window.location.reload()} className="nes-btn">Retry</button>
        <Link href="/" className="nes-btn">Back to Home</Link>
      </div>
    );
  }

  const currencyOptions = Object.keys(rates).sort();

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h3 className="title">Currency Exchange</h3>

        <div className="flex flex-col md:flex-row items-center gap-4 justify-between w-full">
          {/* Left Side (From) */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-left text-sm mb-1">From</label>
            <CurrencySelect
              value={fromCurrency}
              onChange={(code) => handleCurrencyChange('from', code)}
              options={currencyOptions}
            />
            <input
              type="number"
              className="nes-input"
              value={amountA}
              onChange={(e) => handleAmountChange('A', e.target.value)}
              placeholder="0.00"
            />
          </div>

          {/* Swap Button */}
          <button
            type="button"
            className="nes-btn is-warning shrink-0 mt-8 md:mt-6"
            onClick={handleSwap}
            aria-label="Swap Currencies"
          >
            <i className="nes-icon coin is-small"></i>
          </button>

          {/* Right Side (To) */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-left text-sm mb-1">To</label>
            <CurrencySelect
              value={toCurrency}
              onChange={(code) => handleCurrencyChange('to', code)}
              options={currencyOptions}
            />
            <input
              type="number"
              className="nes-input"
              value={amountB}
              onChange={(e) => handleAmountChange('B', e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 text-center text-xs text-gray-500">
           <p>1 {fromCurrency} = {convertCurrency(1, rates[fromCurrency], rates[toCurrency]).toFixed(4)} {toCurrency}</p>
           <p>Last updated: {lastUpdate}</p>
        </div>
      </div>

      {/* Attribution */}
      <div className="text-center text-xs mt-8 opacity-75">
        <p>Exchange rates provided by <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer">ExchangeRate-API</a></p>
      </div>
    </div>
  );
}
