import { contentFixtures } from '@__tests__/fixtures/content-fixture';
import { test, describe, expect } from 'vitest';
import { contentApi } from './content-api.effect';
import { ContentView } from '@/domains/content/content.type';
import { omit } from 'radashi';
import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { contentSortOption } from '@/domains/content/content.constant';
import { reset } from '@__tests__/mock-api/virtual/setup';
import { gen } from '@__tests__/generator';
import { Content } from '@/domains/content/content.entity';

describe('contentApi', () => {
  test('findAll', async () => {
    const pageTake = 12;
    const pageNum = 1;
    // const sort = contentSortOption.titleAsc;
    const content = contentFixtures[3];
    const search = content.title.slice(0, 10);

    const response = await contentApi.findAll({
      pageNum,
      pageTake,
      search,
    });
    expect(response.status).toEqual(200);
    expect(response.data.contents[0].title).toEqual(content.title);
    expect(response.data.contents).toHaveLength(1);
  });

  test('countAll', async () => {
    const search = contentFixtures[0].title;

    const response = await contentApi.countAll(search);

    expect(response.status).toEqual(200);
    expect(response.data.count).toEqual(1);
  });

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

  test('findMyOne', async () => {
    const content = contentFixtures[0];
    const author = userFixtures[0];

    const id = content.id;

    const response = await contentApi.findMyOne(id, author.nickname);

    expect(response.status).toEqual(200);
    expect(response).toHaveProperty('data.content');
  });

  test('create', async () => {
    const user = gen.user.instance();

    const authorization = user.nickname;
    const title = gen.content.title();
    const body = gen.content.body();
    const thumbnail = gen.img();

    const response = await contentApi.create({
      authorization,
      title,
      body,
      thumbnail,
    });

    expect(response.status).toEqual(401);
  });

  test('edit', async () => {
    const user = userFixtures[1];
    const content = contentFixtures[0];

    const authorization = user.nickname;
    const title = gen.content.title();
    const body = gen.content.body();
    const thumbnail = gen.img();

    const response = await contentApi.edit({
      authorization,
      id: content.id,
      title,
      body,
      thumbnail,
    });

    expect(response.status).toEqual(404);
  });

  test('delete', async () => {
    const user = userFixtures[1];
    const content = contentFixtures[0];

    const authorization = user.nickname;

    const response = await contentApi.delete({
      authorization,
      id: content.id,
    });

    expect(response.status).toEqual(404);
  });
});
