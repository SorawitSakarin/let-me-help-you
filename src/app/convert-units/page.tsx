'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  UnitCategory,
  Unit,
  UNIT_LABELS,
  convertValue,
} from '@/utils/unit-converter';

type ConverterState = {
  from: string;
  to: string;
  valueA: string;
  valueB: string;
};

type State = Record<UnitCategory, ConverterState>;

const INITIAL_STATE: State = {
  weight: { from: 'kg', to: 'lbs', valueA: '', valueB: '' },
  length: { from: 'm', to: 'ft', valueA: '', valueB: '' },
  temperature: { from: 'C', to: 'F', valueA: '', valueB: '' },
};

export default function UnitConverterPage() {
  const [state, setState] = useState<State>(INITIAL_STATE);

  const handleInputChange = (category: UnitCategory, side: 'A' | 'B', value: string) => {
    // Prevent negative values for Weight and Length
    if (category !== 'temperature' && value.trim().startsWith('-')) {
        return;
    }

    setState((prev) => {
      const current = prev[category];
      const updates: Partial<ConverterState> = {};

      if (side === 'A') {
        updates.valueA = value;
        updates.valueB = value === '' ? '' : convertValue(parseFloat(value), current.from as Unit, current.to as Unit, category);
      } else {
        updates.valueB = value;
        updates.valueA = value === '' ? '' : convertValue(parseFloat(value), current.to as Unit, current.from as Unit, category);
      }

      return {
        ...prev,
        [category]: { ...current, ...updates },
      };
    });
  };

  const handleUnitChange = (category: UnitCategory, side: 'from' | 'to', unit: string) => {
    setState((prev) => {
      const current = prev[category];
      const updates: Partial<ConverterState> = {};

      // Determine new units
      const fromUnit = side === 'from' ? unit : current.from;
      const toUnit = side === 'to' ? unit : current.to;

      if (side === 'from') updates.from = unit;
      else updates.to = unit;

      // Recalculate B based on A with new units
      if (current.valueA) {
        updates.valueB = convertValue(parseFloat(current.valueA), fromUnit as Unit, toUnit as Unit, category);
      }

      return {
        ...prev,
        [category]: { ...current, ...updates },
      };
    });
  };

  const handleSwap = (category: UnitCategory) => {
    setState((prev) => {
      const current = prev[category];
      return {
        ...prev,
        [category]: {
          ...current,
          from: current.to,
          to: current.from,
          valueA: current.valueB,
          valueB: current.valueA,
        },
      };
    });
  };

  const categories: UnitCategory[] = ['weight', 'length', 'temperature'];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="w-full flex flex-col gap-8">
        {categories.map((category) => (
          <div key={category} className="nes-container with-title is-centered">
            <h3 className="title capitalize">{category}</h3>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              {/* Left Side (A) */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor={`${category}-from`} className="sr-only">From Unit</label>
                <div className="nes-select">
                  <select
                    id={`${category}-from`}
                    value={state[category].from}
                    onChange={(e) => handleUnitChange(category, 'from', e.target.value)}
                  >
                    {Object.entries(UNIT_LABELS[category]).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <label htmlFor={`${category}-valueA`} className="sr-only">Value A</label>
                <input
                  id={`${category}-valueA`}
                  type="number"
                  className="nes-input"
                  value={state[category].valueA}
                  onChange={(e) => handleInputChange(category, 'A', e.target.value)}
                  placeholder="0"
                />
              </div>

              {/* Swap Button */}
              <button
                type="button"
                className="nes-btn is-primary shrink-0 mt-4 md:mt-0"
                onClick={() => handleSwap(category)}
                aria-label="Swap Units"
              >
                <i className="nes-icon coin is-small"></i>
              </button>

              {/* Right Side (B) */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor={`${category}-to`} className="sr-only">To Unit</label>
                <div className="nes-select">
                  <select
                    id={`${category}-to`}
                    value={state[category].to}
                    onChange={(e) => handleUnitChange(category, 'to', e.target.value)}
                  >
                    {Object.entries(UNIT_LABELS[category]).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <label htmlFor={`${category}-valueB`} className="sr-only">Value B</label>
                <input
                  id={`${category}-valueB`}
                  type="number"
                  className="nes-input"
                  value={state[category].valueB}
                  onChange={(e) => handleInputChange(category, 'B', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
