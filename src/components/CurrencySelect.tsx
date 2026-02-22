// src/components/CurrencySelect.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CURRENCY_FLAGS } from '@/utils/currency';
import { ChevronDown } from 'lucide-react';

interface CurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[]; // List of currency codes (e.g., ['USD', 'EUR'])
}

export function CurrencySelect({ value, onChange, options }: CurrencySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opening
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter((code) =>
    code.toLowerCase().includes(search.toLowerCase())
  );

  const getFlagUrl = (code: string) => {
    const countryCode = CURRENCY_FLAGS[code];
    if (countryCode) {
      return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
    }
    return null;
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {getFlagUrl(value) ? (
            <div className="relative w-6 h-4 shrink-0 overflow-hidden rounded-sm shadow-sm">
              <Image
                src={getFlagUrl(value)!}
                alt={`${value} flag`}
                fill
                className="object-cover"
                unoptimized // External image
              />
            </div>
          ) : (
            <span className="w-6 text-center text-gray-400">🪙</span>
          )}
          <span className="font-medium text-gray-900">{value}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-100 bg-gray-50">
            <input
              ref={searchInputRef}
              type="text"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking input
            />
          </div>

          {/* Options List */}
          <div className="overflow-y-auto flex-1 custom-scrollbar max-h-60">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`w-full text-left px-4 py-2.5 hover:bg-indigo-50 flex items-center gap-3 transition-colors ${
                    value === code ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'
                  }`}
                  onClick={() => {
                    onChange(code);
                    setIsOpen(false);
                    setSearch('');
                  }}
                >
                  {getFlagUrl(code) ? (
                    <div className="relative w-6 h-4 shrink-0 overflow-hidden rounded-sm shadow-sm">
                      <Image
                        src={getFlagUrl(code)!}
                        alt={`${code} flag`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <span className="w-6 text-center text-xs text-gray-400">🪙</span>
                  )}
                  <span>{code}</span>
                </button>
              ))
            ) : (
              <div className="p-4 text-gray-500 text-sm text-center italic">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
