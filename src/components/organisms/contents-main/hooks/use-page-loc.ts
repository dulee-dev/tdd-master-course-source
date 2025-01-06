import { useState } from 'react';

const pageInit = 1;

export const usePageLoc = () => {
  const [pageLoc, setPageLoc] = useState(pageInit);

  const onClickPage = (page: number) => {
    setPageLoc(page);
  };

  const onSumbit = () => {
    setPageLoc(pageInit);
  };

  return {
    pageLoc,
    onClickPage,
    onSumbit,
  };
};
