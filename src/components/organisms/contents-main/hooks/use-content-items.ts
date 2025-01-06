import { ContentSortOption, ContentView } from '@/domains/content/content.type';
import { useEffect, useState } from 'react';
import { loadContentItems } from '../server-side';
import { pageTake } from '../constant';

export const useContentItems = (pageLoc: number, sort: ContentSortOption) => {
  const [items, setItems] = useState<ContentView[]>([]);

  useEffect(() => {
    (async () => {
      const next = await loadContentItems({ pageNum: pageLoc, pageTake, sort });

      setItems(next);
    })();
  }, [pageLoc, sort]);

  const onSubmit = async ({
    search,
    pageLoc,
    pageTake,
    sort,
  }: {
    search: string;
    pageLoc: number;
    pageTake: number;
    sort: ContentSortOption;
  }) => {
    const next = await loadContentItems({
      pageNum: pageLoc,
      pageTake,
      sort,
      search,
    });

    setItems(next);
  };

  return {
    items,
    onSubmit,
  };
};
