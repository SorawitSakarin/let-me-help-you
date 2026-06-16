"use client";

import React, { useState } from "react";

export default function AgeCalculatorPage() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!dob) return;

    const [year, month, day] = dob.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    if (years < 0) {
      setAge(null);
      return;
    }

    setAge({ years, months, days });
  };

  const reset = () => {
    setDob("");
    setAge(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="title mb-6">Age Calculator</h2>
      <p className="mb-8">Calculate your exact age in years, months, and days.</p>

      <div className="nes-container with-title is-centered mb-8">
        <p className="title">Input</p>
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
          <div className="nes-field">
            <label htmlFor="dob_field">Date of Birth</label>
            <input
              type="date"
              id="dob_field"
              className="nes-input"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="flex gap-4 justify-center mt-4">
            <button type="button" className="nes-btn is-primary" onClick={calculateAge}>
              Calculate
            </button>
            <button type="button" className="nes-btn" onClick={reset}>
              Clear
            </button>
          </div>
        </div>
      </div>

      {age !== null && (
        <div className="nes-container is-dark with-title is-centered">
          <p className="title">Result</p>
          <p className="text-xl mb-2">
            You are <strong>{age.years}</strong> years, <strong>{age.months}</strong> months, and <strong>{age.days}</strong> days old.
          </p>
        </div>
      )}
    </div>
  );
}
