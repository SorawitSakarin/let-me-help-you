"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOpClick = (op: string) => {
    if (operator && !waitingForNewValue) {
      const result = calculate(previousValue!, parseFloat(display), operator);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(parseFloat(display));
    }
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b === 0 ? 0 : a / b;
      default:
        return b;
    }
  };

  const handleEqual = () => {
    if (operator && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operator);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3 title">
          <i className="nes-icon coin is-medium"></i>
          Calculator
        </h2>
        <Link href="/" className="nes-btn">
          Back
        </Link>
      </div>

      <div className="nes-container is-rounded bg-white">
        <div className="nes-container is-dark mb-4 text-right text-2xl overflow-hidden">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "/"].map((btn) => (
            <button
              key={btn}
              className={`nes-btn ${
                ["/", "*", "-", "+"].includes(btn) ? "is-warning" : ""
              }`}
              onClick={() =>
                ["/", "*", "-", "+"].includes(btn)
                  ? handleOpClick(btn)
                  : handleNumClick(btn)
              }
            >
              {btn}
            </button>
          ))}
          {["4", "5", "6", "*"].map((btn) => (
            <button
              key={btn}
              className={`nes-btn ${
                ["/", "*", "-", "+"].includes(btn) ? "is-warning" : ""
              }`}
              onClick={() =>
                ["/", "*", "-", "+"].includes(btn)
                  ? handleOpClick(btn)
                  : handleNumClick(btn)
              }
            >
              {btn}
            </button>
          ))}
          {["1", "2", "3", "-"].map((btn) => (
            <button
              key={btn}
              className={`nes-btn ${
                ["/", "*", "-", "+"].includes(btn) ? "is-warning" : ""
              }`}
              onClick={() =>
                ["/", "*", "-", "+"].includes(btn)
                  ? handleOpClick(btn)
                  : handleNumClick(btn)
              }
            >
              {btn}
            </button>
          ))}
          <button className="nes-btn is-error" onClick={handleClear}>
            C
          </button>
          <button className="nes-btn" onClick={() => handleNumClick("0")}>
            0
          </button>
          <button className="nes-btn is-success" onClick={handleEqual}>
            =
          </button>
          <button className="nes-btn is-warning" onClick={() => handleOpClick("+")}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
