'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Rates {
  [key: string]: number;
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [rates, setRates] = useState<Rates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) {
            throw new Error('Failed to fetch rates');
        }
        const data = await response.json();
        setRates(data.rates);
        setLastUpdated(new Date(data.time_last_update_utc).toLocaleString());
        setLoading(false);
      } catch (err) {
        setError('Failed to load exchange rates. Please try again later.');
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const convert = (amount: string, from: string, to: string) => {
    const valAmount = parseFloat(amount);
    if (isNaN(valAmount)) return 0;
    if (!rates[from] || !rates[to]) return 0;

    // Base is USD.
    // Amount in USD = valAmount / rates[from]
    // Amount in Target = (valAmount / rates[from]) * rates[to]
    const val = (valAmount / rates[from]) * rates[to];
    return val;
  };

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const result = convert(amount, fromCurrency, toCurrency);

  const currencyOptions = Object.keys(rates).sort();

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Currency Converter</h2>

        {loading ? (
           <div className="flex justify-center items-center h-32">
             <progress className="nes-progress is-pattern w-full" value="0" max="100"></progress>
           </div>
        ) : error ? (
           <div className="nes-text is-error">{error}</div>
        ) : (
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                    {/* From */}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="amount-input">Amount</label>
                        <input
                            type="number"
                            id="amount-input"
                            className="nes-input"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="0"
                            step="any"
                        />
                    </div>
                     <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="from-currency">From</label>
                        <div className="nes-select">
                            <select
                                id="from-currency"
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                            >
                                {currencyOptions.map((currency) => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Swap */}
                    <button type="button" className="nes-btn is-warning mt-8" onClick={handleSwap} aria-label="Swap Currencies">
                        <i className="nes-icon coin is-small"></i>
                    </button>

                     {/* To */}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="to-currency">To</label>
                         <div className="nes-select">
                            <select
                                id="to-currency"
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                            >
                                {currencyOptions.map((currency) => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Result */}
                <div className="nes-container is-rounded is-dark text-center mt-4">
                    <p className="text-xl">
                        {amount || '0'} {fromCurrency} = <span>{result.toFixed(2)} {toCurrency}</span>
                    </p>
                </div>

                <div className="text-xs text-center mt-4 nes-text is-disabled">
                    <p>Last updated: {lastUpdated}</p>
                    <p>Data provided by <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer">ExchangeRate-API.com</a></p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
