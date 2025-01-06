import { ContentView } from '@/domains/content/content.type';
import { contentFixtures } from '@__tests__/fixtures/content-fixture';
import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { castNullableStrToNum } from '@__tests__/libs/cast-nullable-str-to-num';
import { http, HttpResponse, delay } from 'msw';
import { omit } from 'radashi';

export const contentHandlers = [
  http.get(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/contents',
    async ({ request }) => {
      const url = new URL(request.url);
      // await delay(1000);

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

          return a.createAt > b.createAt ? -1 : 1;
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
];
