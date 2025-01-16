export const virtualFixturesApi = {
  async reset(): Promise<{
    status: 201;
  }> {
    const relative = '/virtual/reset';
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + relative;

    const data = await fetch(url, {
      method: 'POST',
    });
    const json = await data.json();

    return json;
  },
};
