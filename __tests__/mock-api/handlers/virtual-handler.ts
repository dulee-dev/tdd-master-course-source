import { http, HttpResponse } from 'msw';
import { reset } from '../virtual/setup';

export const virtualHandlers = [
  http.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/virtual/reset', () => {
    reset();

    return HttpResponse.json({
      status: 201,
    });
  }),
];
