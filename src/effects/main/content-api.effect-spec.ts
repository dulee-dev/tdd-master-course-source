import { contentFixtures } from '@__tests__/fixtures/content-fixture';
import { test, describe, expect } from 'vitest';
import { contentApi } from './content-api.effect';
import { ContentView } from '@/domains/content/content.type';
import { omit } from 'radashi';
import { userFixtures } from '@__tests__/fixtures/user-fixture';

describe('contentApi', () => {
  test('findOne', async () => {
    const content = contentFixtures[0];
    const author = userFixtures[0];

    const id = content.id;
    const expected: ContentView = {
      ...omit(content, ['authorId']),
      author,
    };

    const response = await contentApi.findOne(id);

    expect(response.status).toEqual(200);
    if (response.status !== 200) throw new Error();
    expect(response.data.content).toEqual(expected);
  });
});
