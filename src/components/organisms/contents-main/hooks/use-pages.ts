import { useEffect, useState } from 'react';
import { loadCount } from '../server-side';
import { list } from 'radashi';
import { pageTake } from '../constant';

const pageStart = 1;

export const usePages = () => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const count = await loadCount();

      const pageMax = Math.ceil(count / pageTake);
      const pagesNext = pageMax === 0 ? [] : list(pageStart, pageMax);

      setPages(pagesNext);
    })();
  }, []);

  const onSubmit = async (search: string) => {
    const count = await loadCount(search);

    const pageMax = Math.ceil(count / pageTake);
    const pagesNext = pageMax === 0 ? [] : list(pageStart, pageMax);

    setPages(pagesNext);
  };

  return {
    pages,
    onSubmit,
  };
};
