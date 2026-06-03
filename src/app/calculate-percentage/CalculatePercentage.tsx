"use client";

import { useState } from "react";
import Link from "next/link";

export default function CalculatePercentage() {
  const [val1A, setVal1A] = useState("");
  const [val1B, setVal1B] = useState("");
  const [res1, setRes1] = useState<number | null>(null);

  const [val2A, setVal2A] = useState("");
  const [val2B, setVal2B] = useState("");
  const [res2, setRes2] = useState<number | null>(null);

  const [val3A, setVal3A] = useState("");
  const [val3B, setVal3B] = useState("");
  const [res3, setRes3] = useState<number | null>(null);

  const calc1 = () => {
    const x = parseFloat(val1A);
    const y = parseFloat(val1B);
    if (!isNaN(x) && !isNaN(y)) {
      setRes1((x / 100) * y);
    } else {
      setRes1(null);
    }
  };

  const calc2 = () => {
    const x = parseFloat(val2A);
    const y = parseFloat(val2B);
    if (!isNaN(x) && !isNaN(y) && y !== 0) {
      setRes2((x / y) * 100);
    } else {
      setRes2(null);
    }
  };

  const calc3 = () => {
    const x = parseFloat(val3A);
    const y = parseFloat(val3B);
    if (!isNaN(x) && !isNaN(y) && x !== 0) {
      setRes3(((y - x) / Math.abs(x)) * 100);
    } else {
      setRes3(null);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-6">
        <Link href="/" className="nes-btn">
          &lt; Back
        </Link>
      </div>

      <h1 className="title mb-8 text-2xl">Percentage Calculator</h1>

      <div className="nes-container with-title mb-8">
        <p className="title">What is X% of Y?</p>
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
          <label className="whitespace-nowrap">What is</label>
          <input
            type="number"
            className="nes-input"
            value={val1A}
            onChange={(e) => setVal1A(e.target.value)}
            placeholder="X"
          />
          <label className="whitespace-nowrap">% of</label>
          <input
            type="number"
            className="nes-input"
            value={val1B}
            onChange={(e) => setVal1B(e.target.value)}
            placeholder="Y"
          />
        </div>
        <button className="nes-btn is-primary mb-4" onClick={calc1}>
          Calculate
        </button>
        {res1 !== null && (
          <div className="nes-container is-rounded is-dark">
            <p>Result: {res1}</p>
          </div>
        )}
      </div>

      <div className="nes-container with-title mb-8">
        <p className="title">X is what percent of Y?</p>
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
          <input
            type="number"
            className="nes-input"
            value={val2A}
            onChange={(e) => setVal2A(e.target.value)}
            placeholder="X"
          />
          <label className="whitespace-nowrap">is what % of</label>
          <input
            type="number"
            className="nes-input"
            value={val2B}
            onChange={(e) => setVal2B(e.target.value)}
            placeholder="Y"
          />
        </div>
        <button className="nes-btn is-success mb-4" onClick={calc2}>
          Calculate
        </button>
        {res2 !== null && (
          <div className="nes-container is-rounded is-dark">
            <p>Result: {res2}%</p>
          </div>
        )}
      </div>

      <div className="nes-container with-title mb-8">
        <p className="title">Percentage change</p>
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
          <label className="whitespace-nowrap">From</label>
          <input
            type="number"
            className="nes-input"
            value={val3A}
            onChange={(e) => setVal3A(e.target.value)}
            placeholder="X"
          />
          <label className="whitespace-nowrap">to</label>
          <input
            type="number"
            className="nes-input"
            value={val3B}
            onChange={(e) => setVal3B(e.target.value)}
            placeholder="Y"
          />
        </div>
        <button className="nes-btn is-warning mb-4" onClick={calc3}>
          Calculate
        </button>
        {res3 !== null && (
          <div className="nes-container is-rounded is-dark">
            <p>
              Result: {res3 > 0 ? "+" : ""}
              {res3}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}