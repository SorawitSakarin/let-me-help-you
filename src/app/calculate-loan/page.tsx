"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [result, setResult] = useState<{ monthly: string, totalInterest: string, totalPayment: string } | null>(null);

  const calculateLoan = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term) * 12;
    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r < 0 || n <= 0) {
      alert("Please enter valid numbers.");
      return;
    }
    let monthly = 0;
    if (r === 0) {
      monthly = p / n;
    } else {
      monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const totalPayment = monthly * n;
    const totalInterest = totalPayment - p;
    setResult({
      monthly: monthly.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3 title">
          <i className="nes-icon coin is-medium"></i>
          Loan Calculator
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>
      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Input</h3>
        <div className="flex flex-col gap-4">
          <div className="nes-field">
            <label htmlFor="amount">Loan Amount ($)</label>
            <input type="number" id="amount" className="nes-input" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="nes-field">
            <label htmlFor="rate">Annual Interest Rate (%)</label>
            <input type="number" id="rate" className="nes-input" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
          <div className="nes-field">
            <label htmlFor="term">Loan Term (Years)</label>
            <input type="number" id="term" className="nes-input" value={term} onChange={(e) => setTerm(e.target.value)} />
          </div>
          <button type="button" className="nes-btn is-primary w-full mt-2" onClick={calculateLoan}>Calculate</button>
        </div>
      </div>
      {result && (
        <div className="nes-container with-title is-rounded bg-white">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Result</h3>
          <div className="flex flex-col gap-2">
            <p><strong>Monthly Payment:</strong> ${result.monthly}</p>
            <p><strong>Total Interest:</strong> ${result.totalInterest}</p>
            <p><strong>Total Payment:</strong> ${result.totalPayment}</p>
          </div>
        </div>
      )}
    </div>
  );
}
