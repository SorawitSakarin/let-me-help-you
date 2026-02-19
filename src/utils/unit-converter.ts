export type UnitCategory = 'weight' | 'length' | 'temperature';

export type WeightUnit = 'kg' | 'g' | 'lbs' | 'oz';
export type LengthUnit = 'm' | 'km' | 'cm' | 'mm' | 'ft' | 'in' | 'mi' | 'yd';
export type TempUnit = 'C' | 'F' | 'K';

export type Unit = WeightUnit | LengthUnit | TempUnit;

export const UNIT_LABELS: Record<UnitCategory, Record<string, string>> = {
  weight: {
    kg: 'Kilograms (kg)',
    g: 'Grams (g)',
    lbs: 'Pounds (lbs)',
    oz: 'Ounces (oz)',
  },
  length: {
    m: 'Meters (m)',
    km: 'Kilometers (km)',
    cm: 'Centimeters (cm)',
    mm: 'Millimeters (mm)',
    ft: 'Feet (ft)',
    in: 'Inches (in)',
    mi: 'Miles (mi)',
    yd: 'Yards (yd)',
  },
  temperature: {
    C: 'Celsius (°C)',
    F: 'Fahrenheit (°F)',
    K: 'Kelvin (K)',
  },
};

// Conversion Rates to Base Unit
// Weight Base: kg
const WEIGHT_TO_KG: Record<WeightUnit, number> = {
  kg: 1,
  g: 0.001,
  lbs: 0.45359237,
  oz: 0.02834952,
};

// Length Base: m
const LENGTH_TO_M: Record<LengthUnit, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  ft: 0.3048,
  in: 0.0254,
  mi: 1609.344,
  yd: 0.9144,
};

function roundToTwo(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function convertValue(
  value: number,
  fromUnit: Unit,
  toUnit: Unit,
  category: UnitCategory
): string {
  if (isNaN(value)) return '';

  // Handle same unit
  if (fromUnit === toUnit) return roundToTwo(value).toString();

  let result: number;

  if (category === 'weight') {
    const from = fromUnit as WeightUnit;
    const to = toUnit as WeightUnit;
    const baseKg = value * WEIGHT_TO_KG[from];
    result = baseKg / WEIGHT_TO_KG[to];
  } else if (category === 'length') {
    const from = fromUnit as LengthUnit;
    const to = toUnit as LengthUnit;
    const baseM = value * LENGTH_TO_M[from];
    result = baseM / LENGTH_TO_M[to];
  } else if (category === 'temperature') {
    const from = fromUnit as TempUnit;
    const to = toUnit as TempUnit;

    // Convert to Celsius first
    let celsius: number;
    if (from === 'C') celsius = value;
    else if (from === 'F') celsius = (value - 32) * (5 / 9);
    else if (from === 'K') celsius = value - 273.15;
    else celsius = value; // Should not happen

    // Convert from Celsius to Target
    if (to === 'C') result = celsius;
    else if (to === 'F') result = celsius * (9 / 5) + 32;
    else if (to === 'K') result = celsius + 273.15;
    else result = celsius; // Should not happen
  } else {
    return '';
  }

  return roundToTwo(result).toString();
}
