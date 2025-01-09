import { ContentView } from '@/domains/content/content.type';
import {
  contentCreated,
  contentFixtures,
} from '@__tests__/fixtures/content-fixture';
import { userFixtures } from '@__tests__/fixtures/user-fixture';
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

      let inter = contentFixtures;
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

      const contents: ContentView[] = inter.slice(startAt, endAt).map((c) => {
        const author = userFixtures.find((d) => c.authorId === d.id);
        if (!author) throw new Error();

        const content: ContentView = {
          ...omit(c, ['authorId']),
          author,
        };
        return content;
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
        ? contentFixtures.filter((c) => c.title.includes(search))
        : contentFixtures;

      const count = filtered.length;

      return HttpResponse.json({
        data: { count },
        status: 200,
      });
    }
  ),

  http.get(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/contents/${contentCreated.id}`,
    () => {
      const author = userFixtures.find((c) => c.id === contentCreated.authorId);

      if (!author) throw new Error();

      const content: ContentView = {
        ...omit(contentCreated, ['authorId']),
        author,
      };

      return HttpResponse.json({
        data: { content },
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

      const found = contentFixtures.find((c) => c.id === id);

      if (!found)
        return HttpResponse.json({
          status: 404,
        });

      const author = userFixtures.find((c) => c.id === found.authorId);

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

  http.post(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/contents',
    ({ request }) => {
      const { body, headers } = request;

      const auth = headers.get('authorization');

      if (auth === null)
        return HttpResponse.json({
          status: 401,
        });

      const content = {
        ...contentCreated,
        createdAt: new Date(),
      };

      return HttpResponse.json({
        data: { content },
        status: 201,
      });
    }
  ),
];
