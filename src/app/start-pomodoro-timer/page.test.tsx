// @ts-nocheck
import {
  ALARM_FREQUENCY_A4,
  ALARM_FREQUENCY_A5,
  ALARM_NOTE_DURATION,
  ALARM_SEQUENCE_DURATION,
  ALARM_GAIN_VALUE,
} from "./page";

describe("Pomodoro Timer Constants", () => {
  it("should have correct frequency for A4", () => {
    expect(ALARM_FREQUENCY_A4).toBe(440);
  });

  it("should have correct frequency for A5", () => {
    expect(ALARM_FREQUENCY_A5).toBe(880);
  });

  it("should have correct note duration", () => {
    expect(ALARM_NOTE_DURATION).toBe(0.1);
  });

  it("should have correct sequence duration", () => {
    expect(ALARM_SEQUENCE_DURATION).toBe(0.5);
  });

  it("should have correct gain value", () => {
    expect(ALARM_GAIN_VALUE).toBe(0.1);
  });
});
