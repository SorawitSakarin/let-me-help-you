'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreditCardValidator() {
  const [cardNumber, setCardNumber] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateLuhn = (number: string) => {
    const sanitized = number.replace(/\D/g, '');
    if (!sanitized) return false;

    let sum = 0;
    let isEven = false;

    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCardNumber(val);
    if (val.replace(/\D/g, '').length > 0) {
      setIsValid(validateLuhn(val));
    } else {
      setIsValid(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon coin is-medium"></i>
          CC Validator
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Input</h3>
        <p className="mb-6 text-sm">Validate credit card numbers using the Luhn algorithm.</p>
        <div className="flex flex-col gap-4">
          <div className="nes-field">
            <label htmlFor="cc_input">Card Number</label>
            <input
              type="text"
              id="cc_input"
              className={`nes-input ${isValid === true ? 'is-success' : isValid === false ? 'is-error' : ''}`}
              value={cardNumber}
              onChange={handleChange}
              placeholder="Enter card number..."
            />
          </div>

          {isValid !== null && (
            <div className={`nes-text mt-2 ${isValid ? 'is-success' : 'is-error'}`}>
              {isValid ? 'Valid Card Number' : 'Invalid Card Number'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
