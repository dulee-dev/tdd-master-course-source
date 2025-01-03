import { ContentView } from '@/domains/content/content.type';
import { contentFixtures } from '@__tests__/fixtures/content-fixture';
import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { http, HttpResponse } from 'msw';
import { omit } from 'radashi';

export const contentHandlers = [
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
