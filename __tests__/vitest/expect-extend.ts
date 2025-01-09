import { uuidRegExp } from '@__tests__/libs/reg-exp';
import { expect } from 'vitest';

expect.extend({
  toBeUuid(received) {
    const { isNot } = this;

    const pass = uuidRegExp.test(received);
    const message = () =>
      `expected ${received} to${isNot ? ' not' : ''} be uuid`;
    return {
      pass,
      message,
    };
  },

  toBeCloseDate(received, expected: Date) {
    const { isNot } = this;

    const min = 1;
    const range = min * 60 * 1000;

    const pass = (() => {
      if (!(received instanceof Date)) return false;
      const diff = received.getTime() - expected.getTime();
      const absDiff = Math.abs(diff);
      if (absDiff > range) return false;
      return true;
    })();

    const message = () =>
      `expected ${received} to${
        isNot ? ' not' : ''
      } be close date ${min}min diff from ${expected}`;
    return {
      pass,
      message,
    };
  },
});
