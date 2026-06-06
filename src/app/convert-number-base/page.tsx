'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function NumberBaseConverter() {
  const [values, setValues] = useState({
    dec: '',
    bin: '',
    oct: '',
    hex: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (base: 'dec' | 'bin' | 'oct' | 'hex', value: string) => {
    if (value === '') {
      setValues({ dec: '', bin: '', oct: '', hex: '' });
      setError(null);
      return;
    }

    try {
      let decimalValue: number;

      switch (base) {
        case 'dec':
          if (!/^-?\d+$/.test(value)) throw new Error('Invalid decimal number');
          decimalValue = parseInt(value, 10);
          break;
        case 'bin':
          if (!/^-?[01]+$/.test(value)) throw new Error('Invalid binary number');
          decimalValue = parseInt(value, 2);
          break;
        case 'oct':
          if (!/^-?[0-7]+$/.test(value)) throw new Error('Invalid octal number');
          decimalValue = parseInt(value, 8);
          break;
        case 'hex':
          if (!/^-?[0-9A-Fa-f]+$/.test(value)) throw new Error('Invalid hexadecimal number');
          decimalValue = parseInt(value, 16);
          break;
      }

      if (isNaN(decimalValue)) {
         throw new Error(`Invalid ${base} number`);
      }

      setValues({
        dec: decimalValue.toString(10),
        bin: decimalValue.toString(2),
        oct: decimalValue.toString(8),
        hex: decimalValue.toString(16).toUpperCase(),
      });
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setValues({ ...values, [base]: value }); // Allow typing but don't convert if invalid
    }
  };

  const handleClear = () => {
    setValues({ dec: '', bin: '', oct: '', hex: '' });
    setError(null);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-2xl mx-auto w-full">
      <div className="w-full flex justify-start">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">Base Converter</h3>

        <p className="mb-6 text-sm">Convert numbers between decimal, binary, octal, and hex bases.</p>

        <div className="flex flex-col gap-4">
          <div className="nes-field">
            <label htmlFor="dec_field" className="text-left text-sm block">Decimal (Base 10)</label>
            <input
              type="text"
              id="dec_field"
              className={`nes-input w-full ${error && values.dec && isNaN(parseInt(values.dec, 10)) ? 'is-error' : ''}`}
              value={values.dec}
              onChange={(e) => handleInputChange('dec', e.target.value)}
              placeholder="e.g. 42"
            />
          </div>

          <div className="nes-field">
            <label htmlFor="bin_field" className="text-left text-sm block">Binary (Base 2)</label>
            <input
              type="text"
              id="bin_field"
              className={`nes-input w-full ${error && values.bin && isNaN(parseInt(values.bin, 2)) ? 'is-error' : ''}`}
              value={values.bin}
              onChange={(e) => handleInputChange('bin', e.target.value)}
              placeholder="e.g. 101010"
            />
          </div>

          <div className="nes-field">
            <label htmlFor="oct_field" className="text-left text-sm block">Octal (Base 8)</label>
            <input
              type="text"
              id="oct_field"
              className={`nes-input w-full ${error && values.oct && isNaN(parseInt(values.oct, 8)) ? 'is-error' : ''}`}
              value={values.oct}
              onChange={(e) => handleInputChange('oct', e.target.value)}
              placeholder="e.g. 52"
            />
          </div>

          <div className="nes-field">
            <label htmlFor="hex_field" className="text-left text-sm block">Hexadecimal (Base 16)</label>
            <input
              type="text"
              id="hex_field"
              className={`nes-input w-full ${error && values.hex && isNaN(parseInt(values.hex, 16)) ? 'is-error' : ''}`}
              value={values.hex}
              onChange={(e) => handleInputChange('hex', e.target.value)}
              placeholder="e.g. 2A"
            />
          </div>

          {error && (
            <p className="nes-text is-error text-xs mt-2">{error}</p>
          )}

          <div className="mt-4 flex justify-end">
             <button type="button" className="nes-btn is-error text-sm" onClick={handleClear}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}
