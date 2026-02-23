import { generateLoremIpsum } from './lorem';

describe('generateLoremIpsum', () => {
  it('should generate words', () => {
    const result = generateLoremIpsum(5, 'words');
    const words = result.split(' ');
    expect(words.length).toBe(5);
  });

  it('should generate sentences', () => {
    const result = generateLoremIpsum(3, 'sentences');
    const periodCount = (result.match(/\./g) || []).length;
    expect(periodCount).toBe(3);
  });

  it('should generate paragraphs', () => {
    const result = generateLoremIpsum(2, 'paragraphs');
    const paragraphs = result.split('\n\n');
    expect(paragraphs.length).toBe(2);
  });

  it('should return empty string for 0 or negative count', () => {
    expect(generateLoremIpsum(0, 'words')).toBe('');
    expect(generateLoremIpsum(-1, 'sentences')).toBe('');
  });
});
