import { test, describe, expect } from 'vitest';
import { virtualFixturesApi } from './virtual-fixture-api.effect';
import { checkIsMock } from '@__tests__/libs/check-is-mock';

describe.skipIf(!checkIsMock())('virtualFixturesApi', () => {
  describe('reset', () => {
    test('if ok, status 201', async () => {
      const response = await virtualFixturesApi.reset();

      expect(response.status).toEqual(201);
    });
  });
});
