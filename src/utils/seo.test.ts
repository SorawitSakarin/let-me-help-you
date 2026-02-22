import { normalizeHost, getSiteUrl, buildCanonical } from './seo';

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

describe('getSiteUrl', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should return the configured site URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    expect(getSiteUrl()).toBe('https://example.com');
  });

  it('should fall back to localhost when site URL is not configured', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl()).toBe('http://localhost:3000');
  });

  it('should normalize the configured site URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'example.com';
    expect(getSiteUrl()).toBe('https://example.com');
  });
});

describe('buildCanonical', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should return the canonical URL for the root path by default', () => {
    expect(buildCanonical()).toBe('https://example.com/');
  });

  it('should return the canonical URL for a given path with a leading slash', () => {
    expect(buildCanonical('/path')).toBe('https://example.com/path');
  });

  it('should return the canonical URL for a given path without a leading slash', () => {
    expect(buildCanonical('path')).toBe('https://example.com/path');
  });

  it('should handle query parameters correctly', () => {
    expect(buildCanonical('/path?query=param')).toBe('https://example.com/path?query=param');
  });

  it('should handle hash fragments correctly', () => {
    expect(buildCanonical('/path#hash')).toBe('https://example.com/path#hash');
  });

  it('should use the correct site URL when it changes', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://another-example.com';
    expect(buildCanonical('/path')).toBe('https://another-example.com/path');
  });
});
