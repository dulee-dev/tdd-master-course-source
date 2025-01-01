import { ContentView } from '@/domains/content/content.type';
import { contentFixtures } from '@__tests__/fixtures/content-fixture';
import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { http, HttpResponse } from 'msw';
import { omit } from 'radashi';

export const contentHandlers = [
  http.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/contents', () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),

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
