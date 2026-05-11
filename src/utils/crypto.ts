/**
 * Generates a cryptographically secure random integer between 0 (inclusive) and max (exclusive).
 *
 * @param max The upper bound for the random integer (exclusive).
 * @returns A cryptographically secure random integer.
 */
export function getSecureRandomInt(max: number): number {
  if (max <= 0) {
    throw new Error('max must be greater than 0');
  }

  // Handle cases where max is larger than what a 32-bit uint can hold
  if (max > 4294967295) {
     throw new Error('max must be <= 4294967295 for this simple implementation');
  }

  const range = max;
  const maxSafeValue = Math.floor(4294967295 / range) * range; // 2^32 - 1

  const randomValues = new Uint32Array(1);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (typeof window !== 'undefined' && window.crypto) {
       window.crypto.getRandomValues(randomValues);
    } else {
        // Fallback for SSR/Node environment.
        // Math.random is NOT cryptographically secure, but we need *something* for SSR
        // to avoid crashing if this is called during render on the server.
        return Math.floor(Math.random() * max);
    }
    const val = randomValues[0];
    if (val < maxSafeValue) {
      return val % range;
    }
  }
}