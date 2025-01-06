import { test, describe, expect } from 'vitest';
import { castNullableStrToNum } from './cast-nullable-str-to-num';

describe('castNullableStrToNum', () => {
  test.each([
    {
      str: null,
      expected: null,
    },
    {
      str: 'abc',
      expected: null,
    },
    {
      str: '123',
      expected: 123,
    },
  ])('$str -> $expected', ({ str, expected }) => {
    const result = castNullableStrToNum(str);

    expect(result).toEqual(expected);
  });
});
