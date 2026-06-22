"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function CalculateDateDifference() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [difference, setDifference] = useState<{ days: number, months: number, years: number } | null>(null);
  const [error, setError] = useState('');

  const calculateDifference = () => {
    if (!startDate || !endDate) {
      setError('Please select both dates.');
      setDifference(null);
      return;
    }

    const startParts = startDate.split('-');
    const start = new Date(parseInt(startParts[0]), parseInt(startParts[1]) - 1, parseInt(startParts[2]));

    const endParts = endDate.split('-');
    const end = new Date(parseInt(endParts[0]), parseInt(endParts[1]) - 1, parseInt(endParts[2]));

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError('Invalid dates.');
      setDifference(null);
      return;
    }

    if (start > end) {
      setError('Start date cannot be after end date.');
      setDifference(null);
      return;
    }

    setError('');

    // Calculate difference
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      // Get the number of days in the previous month of the end date
      const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      // Ensure days doesn't go negative if previous month is shorter than the start date's day
      days += previousMonth.getDate();
      if (days < 0) {
        days = 0;
      }
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setDifference({ years, months, days });
  };

  const clearInputs = () => {
    setStartDate('');
    setEndDate('');
    setDifference(null);
    setError('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Date Difference Calculator
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Select Dates</h3>
        <div className="flex flex-col gap-4 mt-4">
          <div className="nes-field">
            <label htmlFor="start_date">Start Date</label>
            <input type="date" id="start_date" className="nes-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="nes-field">
            <label htmlFor="end_date">End Date</label>
            <input type="date" id="end_date" className="nes-input" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-4">
          <button type="button" className="nes-btn is-primary" onClick={calculateDifference}>Calculate</button>
          <button type="button" className="nes-btn" onClick={clearInputs}>Clear</button>
        </div>

        {error && (
          <div className="nes-text is-error text-center mb-4 mt-4">
            {error}
          </div>
        )}
      </div>

      {difference && (
        <div className="nes-container with-title is-rounded bg-white">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Result</h3>
          <div className="text-center mt-4 mb-4">
             <p className="text-xl">
                <strong>{difference.years}</strong> years, <strong>{difference.months}</strong> months, and <strong>{difference.days}</strong> days.
             </p>
          </div>
        </div>
      )}
    </div>
  );
}