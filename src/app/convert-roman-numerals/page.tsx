"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function RomanNumeralConverterPage() {
  const [numberInput, setNumberInput] = useState("");
  const [romanInput, setRomanInput] = useState("");
  const [error, setError] = useState("");

  const convertToRoman = (num: number) => {
    const lookup: Record<string, number> = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let roman = '';
    let i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  };

  const convertToNumber = (roman: string) => {
    const romanVals: Record<string, number> = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
    let sum = 0;
    for (let i = 0; i < roman.length; i++) {
        const curr = romanVals[roman[i]];
        const next = romanVals[roman[i + 1]];
        if (next && curr < next) {
            sum -= curr;
        } else {
            sum += curr;
        }
    }
    return sum;
  };

  const isValidRoman = (str: string) => {
    return /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(str);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNumberInput(val);
    setError("");
    if (val === "") {
      setRomanInput("");
      return;
    }
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 1 || num > 3999) {
      setError("Number must be between 1 and 3999");
      setRomanInput("");
    } else {
      setRomanInput(convertToRoman(num));
    }
  };

  const handleRomanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setRomanInput(val);
    setError("");
    if (val === "") {
      setNumberInput("");
      return;
    }
    if (!isValidRoman(val)) {
      setError("Invalid Roman Numeral");
      setNumberInput("");
    } else {
      setNumberInput(convertToNumber(val).toString());
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-4">
        <Link href="/" className="nes-btn text-xs">
          &lt; Back to Home
        </Link>
      </div>
      <h2 className="title mb-6">Roman Numeral Converter</h2>
      <p className="mb-8">Convert between decimal numbers and Roman numerals instantly.</p>

      <div className="nes-container with-title is-centered mb-8">
        <p className="title">Decimal Number</p>
        <div className="nes-field">
          <input
            type="number"
            className="nes-input"
            value={numberInput}
            onChange={handleNumberChange}
            placeholder="Enter number (1-3999)"
          />
        </div>
      </div>

      <div className="nes-container with-title is-centered mb-8">
        <p className="title">Roman Numeral</p>
        <div className="nes-field">
          <input
            type="text"
            className="nes-input"
            value={romanInput}
            onChange={handleRomanChange}
            placeholder="Enter Roman Numeral"
          />
        </div>
      </div>

      {error && (
        <div className="nes-text is-error text-center mb-4">
          {error}
        </div>
      )}
    </div>
  );
}
