"use client";

import React, { useState } from "react";

export default function BMICalculatorPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      setBmi(parseFloat(bmiValue.toFixed(1)));

      if (bmiValue < 18.5) {
        setCategory("Underweight");
      } else if (bmiValue < 25) {
        setCategory("Normal weight");
      } else if (bmiValue < 30) {
        setCategory("Overweight");
      } else {
        setCategory("Obesity");
      }
    } else {
      setBmi(null);
      setCategory("");
    }
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="title mb-6">BMI Calculator</h2>
      <p className="mb-8">Calculate your Body Mass Index (BMI) to understand your weight category.</p>

      <div className="nes-container with-title is-centered mb-8">
        <p className="title">Input</p>
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
          <div className="nes-field">
            <label htmlFor="height_field">Height (cm)</label>
            <input
              type="number"
              id="height_field"
              className="nes-input"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 175"
            />
          </div>
          <div className="nes-field">
            <label htmlFor="weight_field">Weight (kg)</label>
            <input
              type="number"
              id="weight_field"
              className="nes-input"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 70"
            />
          </div>
          <div className="flex gap-4 justify-center mt-4">
            <button type="button" className="nes-btn is-primary" onClick={calculateBMI}>
              Calculate
            </button>
            <button type="button" className="nes-btn" onClick={reset}>
              Clear
            </button>
          </div>
        </div>
      </div>

      {bmi !== null && (
        <div className="nes-container is-dark with-title is-centered">
          <p className="title">Result</p>
          <p className="text-2xl mb-2">Your BMI is <strong>{bmi}</strong></p>
          <p className="text-xl text-yellow-400">Category: {category}</p>
        </div>
      )}
    </div>
  );
}
