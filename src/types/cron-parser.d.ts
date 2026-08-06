declare module 'cron-parser' {
  interface CronExpression {
    next(): { toString(): string };
    prev(): { toString(): string };
  }

  interface ParserOptions {
    currentDate?: Date | string;
    endDate?: Date | string;
    iterator?: boolean;
    utc?: boolean;
    tz?: string;
  }

  export class CronExpressionParser {
    static parse(expression: string, options?: ParserOptions): CronExpression;
  }
}
