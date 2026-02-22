import { convertValue } from './unit-converter';

describe('Weight Conversion: Basic units', () => {
  it('converts 1 kg to 1000 g', () => {
    expect(convertValue(1, 'kg', 'g', 'weight')).toBe('1000');
  });

  it('converts 1000 g to 1 kg', () => {
    expect(convertValue(1000, 'g', 'kg', 'weight')).toBe('1');
  });

  it('converts 1 kg to 2.2 lbs', () => {
    expect(convertValue(1, 'kg', 'lbs', 'weight')).toBe('2.2');
  });

  it('converts 1 lb to 0.45 kg', () => {
    expect(convertValue(1, 'lbs', 'kg', 'weight')).toBe('0.45');
  });

  it('converts 1 kg to 35.27 oz', () => {
    expect(convertValue(1, 'kg', 'oz', 'weight')).toBe('35.27');
  });

  it('converts 1 oz to 0.03 kg', () => {
    expect(convertValue(1, 'oz', 'kg', 'weight')).toBe('0.03');
  });
});

describe('Weight Conversion: Edge cases', () => {
  it('handles 0 value correctly', () => {
    expect(convertValue(0, 'kg', 'g', 'weight')).toBe('0');
  });

  it('handles same unit conversion (kg to kg)', () => {
    expect(convertValue(5.5, 'kg', 'kg', 'weight')).toBe('5.5');
  });

  it('handles same unit conversion (lbs to lbs)', () => {
    expect(convertValue(10, 'lbs', 'lbs', 'weight')).toBe('10');
  });
});

describe('Weight Conversion: Precision and Error Handling', () => {
  it('rounds results to two decimal places', () => {
    // 1.2345 kg to lbs: 1.2345 / 0.45359237 = 2.7216... -> should be 2.72
    expect(convertValue(1.2345, 'kg', 'lbs', 'weight')).toBe('2.72');
  });

  it('returns empty string for NaN input', () => {
    expect(convertValue(NaN, 'kg', 'g', 'weight')).toBe('');
  });

  it('handles large values', () => {
    expect(convertValue(1000000, 'g', 'kg', 'weight')).toBe('1000');
  });
});
