// src/components/CurrencySelect.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CURRENCY_FLAGS } from '@/utils/currency';

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
    <div className="relative inline-block w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        className="nes-btn is-normal w-full flex items-center justify-between px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {getFlagUrl(value) ? (
            <div className="relative w-6 h-4 shrink-0 overflow-hidden border border-black">
              <Image
                src={getFlagUrl(value)!}
                alt={`${value} flag`}
                fill
                className="object-cover"
                unoptimized // External image
              />
            </div>
          ) : (
            <span className="w-6 text-center">🪙</span>
          )}
          <span>{value}</span>
        </div>
        <i className="nes-icon is-small arrow-down ml-2 opacity-50"></i>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 w-full mt-2 bg-white border-4 border-black p-2 shadow-xl max-h-80 flex flex-col">
          {/* Search Input */}
          <div className="mb-2">
            <input
              ref={searchInputRef}
              type="text"
              className="nes-input is-small w-full"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking input
            />
          </div>

          {/* Options List */}
          <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`w-full text-left px-2 py-2 hover:bg-gray-200 flex items-center gap-3 ${
                    value === code ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => {
                    onChange(code);
                    setIsOpen(false);
                    setSearch('');
                  }}
                >
                  {getFlagUrl(code) ? (
                    <div className="relative w-6 h-4 shrink-0 overflow-hidden border border-black">
                      <Image
                        src={getFlagUrl(code)!}
                        alt={`${code} flag`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <span className="w-6 text-center text-xs">🪙</span>
                  )}
                  <span>{code}</span>
                </button>
              ))
            ) : (
              <div className="p-2 text-gray-500 text-sm text-center">No results</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
