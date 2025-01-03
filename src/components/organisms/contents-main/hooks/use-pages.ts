import { useEffect, useState } from 'react';

export const usePages = (search: string) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    (async () => {})();
  }, []);

  const onSubmit = () => {};

  return {
    pages,
    onSubmit,
  };
};
