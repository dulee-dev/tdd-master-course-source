import { ContentView } from '@/domains/content/content.type';
import { jsonDateParser } from 'json-date-parser';
import qs from 'qs';

export const contentApi = {
  async countAll(search?: string): Promise<{
    data: {
      count: number;
    };
    status: 200;
  }> {
    const relative = search
      ? `/contents/count?` + qs.stringify({ search })
      : `/contents/count`;
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + relative;
    const data = await fetch(url);
    const text = await data.text();

    const json = JSON.parse(text, jsonDateParser);

    return json;
  },

  async findOne(id: string): Promise<
    | {
        data: {
          content: ContentView;
        };
        status: 200;
      }
    | {
        status: 404;
      }
  > {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/contents/${id}`;
    const data = await fetch(url);
    const text = await data.text();

    const json = JSON.parse(text, jsonDateParser);

    return json;
  },
};
