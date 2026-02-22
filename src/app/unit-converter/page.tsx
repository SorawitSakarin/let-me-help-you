'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, ArrowRightLeft, ChevronDown } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 px-8 py-6 text-white">
                <div className="flex items-center gap-3">
                    <Scale className="w-6 h-6" />
                    <h1 className="text-2xl font-bold">Unit Converter</h1>
                </div>
                <p className="text-blue-100 mt-2">Convert between common units of measurement.</p>
            </div>
        </div>

        {categories.map((category) => (
          <div key={category} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">{category}</h3>
            </div>

            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                {/* Left Side (A) */}
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor={`${category}-from`} className="sr-only">From Unit</label>
                    <div className="relative">
                        <select
                            id={`${category}-from`}
                            value={state[category].from}
                            onChange={(e) => handleUnitChange(category, 'from', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow cursor-pointer"
                        >
                            {Object.entries(UNIT_LABELS[category]).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    <input
                    id={`${category}-valueA`}
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-lg"
                    value={state[category].valueA}
                    onChange={(e) => handleInputChange(category, 'A', e.target.value)}
                    placeholder="0"
                    />
                </div>

                {/* Swap Button */}
                <button
                    type="button"
                    className="shrink-0 p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => handleSwap(category)}
                    aria-label="Swap Units"
                >
                    <ArrowRightLeft className="w-5 h-5" />
                </button>

                {/* Right Side (B) */}
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor={`${category}-to`} className="sr-only">To Unit</label>
                    <div className="relative">
                        <select
                            id={`${category}-to`}
                            value={state[category].to}
                            onChange={(e) => handleUnitChange(category, 'to', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow cursor-pointer"
                        >
                            {Object.entries(UNIT_LABELS[category]).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <input
                    id={`${category}-valueB`}
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-lg bg-gray-50"
                    value={state[category].valueB}
                    onChange={(e) => handleInputChange(category, 'B', e.target.value)}
                    placeholder="0"
                    />
                </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
