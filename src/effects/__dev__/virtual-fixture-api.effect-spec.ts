import { test, describe, expect } from 'vitest';
import { virtualFixturesApi } from './virtual-fixture-api.effect';

describe('virtualFixturesApi', () => {
  describe('reset', () => {
    test('if ok, status 201', async () => {
      const response = await virtualFixturesApi.reset();

      expect(response.status).toEqual(201);
    });
  });
});
