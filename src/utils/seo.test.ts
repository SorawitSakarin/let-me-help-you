import { normalizeHost } from './seo';

describe('normalizeHost', () => {
  it('should return undefined when host is undefined', () => {
    expect(normalizeHost(undefined)).toBeUndefined();
  });

  it('should return undefined when host is an empty string', () => {
    expect(normalizeHost('')).toBeUndefined();
  });

  it('should return the host as is if it starts with http://', () => {
    const host = 'http://example.com';
    expect(normalizeHost(host)).toBe(host);
  });

  it('should return the host as is if it starts with https://', () => {
    const host = 'https://example.com';
    expect(normalizeHost(host)).toBe(host);
  });

  it('should prepend https:// if the host does not have a protocol', () => {
    const host = 'example.com';
    expect(normalizeHost(host)).toBe(`https://${host}`);
  });

  it('should prepend https:// to localhost if no protocol is provided', () => {
    const host = 'localhost:3000';
    expect(normalizeHost(host)).toBe(`https://${host}`);
  });

  it('should handle subdomains correctly', () => {
    const host = 'sub.example.com';
    expect(normalizeHost(host)).toBe(`https://${host}`);
  });
});
