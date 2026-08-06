declare module 'cronstrue' {
  interface Options {
    throwExceptionOnParseError?: boolean;
    verbose?: boolean;
    dayOfWeekStartIndexZero?: boolean;
    use24HourTimeFormat?: boolean;
    locale?: string;
  }

  export function toString(expression: string, options?: Options): string;
  const cronstrue = { toString };
  export default cronstrue;
}
