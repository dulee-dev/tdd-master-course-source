import { faker } from '@faker-js/faker';
import { test, describe, expect } from 'vitest';
import { uploadImg } from './image.effect';

describe('uploadImg', () => {
  test('if ok, return type string', async () => {
    const imageFile = new File([], faker.string.alpha() + '.png');

    const result = await uploadImg(imageFile);

    expect(typeof result).toEqual('string');
  });
});
