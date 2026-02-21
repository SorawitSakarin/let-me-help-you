import test from 'node:test';
import assert from 'node:assert';
import { convertValue } from './unit-converter.ts';

test('Weight Conversion: Basic units', async (t) => {
  await t.test('converts 1 kg to 1000 g', () => {
    assert.strictEqual(convertValue(1, 'kg', 'g', 'weight'), '1000');
  });

  await t.test('converts 1000 g to 1 kg', () => {
    assert.strictEqual(convertValue(1000, 'g', 'kg', 'weight'), '1');
  });

  await t.test('converts 1 kg to 2.2 lbs', () => {
    assert.strictEqual(convertValue(1, 'kg', 'lbs', 'weight'), '2.2');
  });

  await t.test('converts 1 lb to 0.45 kg', () => {
    assert.strictEqual(convertValue(1, 'lbs', 'kg', 'weight'), '0.45');
  });

  await t.test('converts 1 kg to 35.27 oz', () => {
    assert.strictEqual(convertValue(1, 'kg', 'oz', 'weight'), '35.27');
  });

  await t.test('converts 1 oz to 0.03 kg', () => {
    assert.strictEqual(convertValue(1, 'oz', 'kg', 'weight'), '0.03');
  });
});

test('Weight Conversion: Edge cases', async (t) => {
  await t.test('handles 0 value correctly', () => {
    assert.strictEqual(convertValue(0, 'kg', 'g', 'weight'), '0');
  });

  await t.test('handles same unit conversion (kg to kg)', () => {
    assert.strictEqual(convertValue(5.5, 'kg', 'kg', 'weight'), '5.5');
  });

  await t.test('handles same unit conversion (lbs to lbs)', () => {
    assert.strictEqual(convertValue(10, 'lbs', 'lbs', 'weight'), '10');
  });
});

test('Weight Conversion: Precision and Error Handling', async (t) => {
  await t.test('rounds results to two decimal places', () => {
    // 1.2345 kg to lbs: 1.2345 / 0.45359237 = 2.7216... -> should be 2.72
    assert.strictEqual(convertValue(1.2345, 'kg', 'lbs', 'weight'), '2.72');
  });

  await t.test('returns empty string for NaN input', () => {
    assert.strictEqual(convertValue(NaN, 'kg', 'g', 'weight'), '');
  });

  await t.test('handles large values', () => {
    assert.strictEqual(convertValue(1000000, 'g', 'kg', 'weight'), '1000');
  });
});
