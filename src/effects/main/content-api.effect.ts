import { Content } from '@/domains/content/content.entity';
import { ContentSortOption, ContentView } from '@/domains/content/content.type';
import { jsonDateParser } from 'json-date-parser';
import qs from 'qs';

export const contentApi = {
  async findAll(query: {
    pageTake: number;
    pageNum: number;
    sort?: ContentSortOption;
    search?: string;
  }): Promise<{
    data: {
      contents: ContentView[];
    };
    status: 200;
  }> {
    const relative = `/contents?` + qs.stringify(query);
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + relative;
    const data = await fetch(url);
    const text = await data.text();

    const json = JSON.parse(text, jsonDateParser);

    return json;
  },

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

  async findMyOne(
    id: string,
    authorization: string
  ): Promise<
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
    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL + `/users/me/contents/${id}`;
    const data = await fetch(url, {
      headers: {
        authorization: authorization,
      },
    });
    const text = await data.text();

    const json = JSON.parse(text, jsonDateParser);

    return json;
  },

  async create({
    authorization,
    ...body
  }: Pick<Content, 'title' | 'body' | 'thumbnail'> & {
    authorization: string;
  }): Promise<
    | {
        data: {
          content: Content;
        };
        status: 201;
      }
    | {
        status: 400;
      }
    | {
        status: 401;
      }
  > {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/contents';
    const strBody = JSON.stringify(body);

    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: authorization,
      },
      body: strBody,
    });
    const text = await data.text();
    const json = JSON.parse(text, jsonDateParser);

    return json;
  },

  async edit({
    authorization,
    id,
    ...body
  }: Partial<Pick<Content, 'title' | 'body' | 'thumbnail'>> & {
    id: string;
    authorization: string;
  }): Promise<
    | {
        data: {
          content: Content;
        };
        status: 200;
      }
    | {
        status: 401;
      }
    | {
        status: 404;
      }
  > {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/contents/' + id;
    const strBody = JSON.stringify(body);

    const data = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: authorization,
      },
      body: strBody,
    });
    const text = await data.text();
    const json = JSON.parse(text, jsonDateParser);

    return json;
  },

  async delete({
    authorization,
    id,
  }: {
    id: string;
    authorization: string;
  }): Promise<
    | {
        status: 200;
      }
    | {
        status: 401;
      }
    | {
        status: 404;
      }
  > {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/contents/' + id;

    const data = await fetch(url, {
      method: 'DELETE',
      headers: {
        authorization: authorization,
      },
    });
    const text = await data.text();
    const json = JSON.parse(text, jsonDateParser);

    return json;
  },
};
