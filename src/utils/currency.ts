// src/utils/currency.ts

import { CURRENCY_FLAGS } from './currency-flags';

export { CURRENCY_FLAGS };

export interface ExchangeRates {
  result: string;
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  time_eol_unix: number;
  base_code: string;
  rates: Record<string, number>;
}

export interface CachedRates {
  timestamp: number;
  data: ExchangeRates;
}

const CACHE_KEY = 'currency_rates_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function fetchRates(): Promise<ExchangeRates | null> {
  // Check Cache
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed: CachedRates = JSON.parse(cached);
        const now = Date.now();
        if (now - parsed.timestamp < CACHE_DURATION) {
          return parsed.data;
        }
      } catch (e) {
        console.error('Error parsing cached rates', e);
        localStorage.removeItem(CACHE_KEY);
      }
    }
  }

  // Fetch New Data
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ExchangeRates = await response.json();

    // Cache Data
    if (typeof window !== 'undefined') {
      const cacheData: CachedRates = {
        timestamp: Date.now(),
        data: data,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return null;
  }
}

export function convertCurrency(
  amount: number,
  fromRate: number, // Rate relative to USD (base)
  toRate: number    // Rate relative to USD (base)
): number {
  if (isNaN(amount) || isNaN(fromRate) || isNaN(toRate)) return 0;

  // Convert Amount to USD first: amount / fromRate
  // Then USD to Target: usd * toRate
  // Formula: amount * (toRate / fromRate)

  return amount * (toRate / fromRate);
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
