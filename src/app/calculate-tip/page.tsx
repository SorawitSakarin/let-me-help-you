"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function TipCalculatorPage() {
  const [bill, setBill] = useState("");
  const [tipPercentage, setTipPercentage] = useState("15");
  const [people, setPeople] = useState("1");
  const [tipAmount, setTipAmount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const calculateTip = () => {
    const b = parseFloat(bill);
    const t = parseFloat(tipPercentage);
    const p = parseInt(people);
    if (b > 0 && t >= 0 && p > 0) {
      const tip = (b * (t / 100)) / p;
      const total = (b / p) + tip;
      setTipAmount(parseFloat(tip.toFixed(2)));
      setTotalAmount(parseFloat(total.toFixed(2)));
    } else {
      setTipAmount(null);
      setTotalAmount(null);
    }
  };

  const reset = () => {
    setBill("");
    setTipPercentage("15");
    setPeople("1");
    setTipAmount(null);
    setTotalAmount(null);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="title text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon coin"></i>
          Tip Calculator
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>
      <p className="mb-8">Calculate tips and split bills easily.</p>

      <div className="nes-container with-title is-centered mb-8 bg-white">
        <p className="title bg-white text-sm" style={{ marginBottom: 0 }}>Input</p>
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto mt-4">
          <div className="nes-field">
            <label htmlFor="bill_field">Bill Amount</label>
            <input
              type="number"
              id="bill_field"
              className="nes-input"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="e.g. 50.00"
            />
          </div>
          <div className="nes-field">
            <label htmlFor="tip_field">Tip Percentage (%)</label>
            <input
              type="number"
              id="tip_field"
              className="nes-input"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              placeholder="e.g. 15"
            />
          </div>
          <div className="nes-field">
            <label htmlFor="people_field">Number of People</label>
            <input
              type="number"
              id="people_field"
              className="nes-input"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder="e.g. 1"
            />
          </div>
          <div className="flex gap-4 justify-center mt-4">
            <button type="button" className="nes-btn is-primary" onClick={calculateTip}>
              Calculate
            </button>
            <button type="button" className="nes-btn" onClick={reset}>
              Clear
            </button>
          </div>
        </div>
      </div>

      {tipAmount !== null && totalAmount !== null && (
        <div className="nes-container is-dark with-title is-centered">
          <p className="title text-sm" style={{ marginBottom: 0 }}>Result</p>
          <div className="mt-4 flex flex-col gap-4">
            <p className="text-xl">Tip Per Person: <strong>${tipAmount.toFixed(2)}</strong></p>
            <p className="text-xl text-yellow-400">Total Per Person: <strong>${totalAmount.toFixed(2)}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}