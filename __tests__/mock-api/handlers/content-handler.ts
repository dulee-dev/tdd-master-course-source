import { Content } from '@/domains/content/content.entity';
import { ContentView } from '@/domains/content/content.type';
import { castNullableStrToNum } from '@__tests__/libs/cast-nullable-str-to-num';
import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';
import { omit } from 'radashi';

export const contentHandlers = [
  http.get(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/contents',
    async ({ request }) => {
      const url = new URL(request.url);

      const pageTake = castNullableStrToNum(url.searchParams.get('pageTake'));
      const pageNum = castNullableStrToNum(url.searchParams.get('pageNum'));
      const sort = url.searchParams.get('sort');
      const search = url.searchParams.get('search');
      if (pageTake === null || pageNum === null)
        return HttpResponse.json({
          status: 400,
        });

      const startAt = (pageNum - 1) * pageTake;
      const endAt = pageNum * pageTake;

      let inter = globalThis.virtual.contents;
      if (search !== null) {
        inter = inter.filter((c) => c.title.includes(search));
      }
      if (sort !== null) {
        inter = inter.toSorted((a, b) => {
          if (sort === 'title-asc') {
            return a.title > b.title ? 1 : -1;
          }

          return a.createdAt > b.createdAt ? -1 : 1;
        });
      }

      const contents: (ContentView | undefined)[] = inter
        .slice(startAt, endAt)
        .map((c) => {
          const author = globalThis.virtual.users.find(
            (d) => c.authorId === d.id
          );
          if (!author) return undefined;

          const content: ContentView = {
            ...omit(c, ['authorId']),
            author,
          };
          return content;
        });
      const someError = contents.some((c) => c === undefined);
      if (someError)
        return HttpResponse.json({
          status: 500,
        });

      return HttpResponse.json({
        data: { contents },
        status: 200,
      });
    }
  ),

  http.get(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/contents/count',
    ({ request }) => {
      const url = new URL(request.url);

      const search = url.searchParams.get('search');

      const filtered = search
        ? globalThis.virtual.contents.filter((c) => c.title.includes(search))
        : globalThis.virtual.contents;

      const count = filtered.length;

      return HttpResponse.json({
        data: { count },
        status: 200,
      });
    }
  ),

  http.get(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/contents/:id',
    ({ params }) => {
      const { id } = params;
      if (typeof id !== 'string')
        return HttpResponse.json({
          status: 400,
        });

      const found = globalThis.virtual.contents.find((c) => c.id === id);

      if (!found)
        return HttpResponse.json({
          status: 404,
        });

      const author = globalThis.virtual.users.find(
        (c) => c.id === found.authorId
      );

      if (!author) throw new Error();

      const content: ContentView = {
        ...omit(found, ['authorId']),
        author,
      };

      return HttpResponse.json({
        data: { content },
        status: 200,
      });
    }
  ),

  http.get(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/users/me/contents/:id',
    ({ params, request }) => {
      const auth = request.headers.get('authorization');
      const user = globalThis.virtual.users.find((c) => c.nickname === auth);
      if (user === undefined)
        return HttpResponse.json({
          status: 401,
        });

      const { id } = params;
      if (typeof id !== 'string')
        return HttpResponse.json({
          status: 400,
        });

      const found = globalThis.virtual.contents.find(
        (c) => c.id === id && c.authorId === user.id
      );
      if (!found)
        return HttpResponse.json({
          status: 404,
        });

      const content: ContentView = {
        ...omit(found, ['authorId']),
        author: user,
      };

      return HttpResponse.json({
        data: { content },
        status: 200,
      });
    }
  ),

  http.post(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/contents',
    async ({ request }) => {
      const { headers } = request;
      const data = (await request.json()) as Pick<
        Content,
        'title' | 'body' | 'thumbnail'
      >;

      const auth = headers.get('authorization');
      const user = globalThis.virtual.users.find((c) => c.nickname === auth);

      if (user === undefined)
        return HttpResponse.json({
          status: 401,
        });

      const content: Content = {
        ...data,
        id: faker.string.uuid(),
        authorId: user.id,
        createdAt: new Date(),
      };
      globalThis.virtual.contents.push(content);

      return HttpResponse.json({
        data: { content },
        status: 201,
      });
    }
  ),
];
