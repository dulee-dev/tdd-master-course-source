'use client';

import { ContentItem } from '@/components/molecules/content-item';
import { useInputText } from '@/hooks/use-input-text';
import { layoutStyles } from '@/styles/layout-styles';
import clsx from 'clsx';
import { HiSearch } from 'react-icons/hi';
import { usePages } from './hooks/use-pages';
import { FormEventHandler } from 'react';
import { usePageLoc } from './hooks/use-page-loc';
import { useContentItems } from './hooks/use-content-items';
import { useSelect } from '@/hooks/use-select';
import { contentSortOption } from '@/domains/content/content.constant';
import { pageTake } from './constant';

interface Props {
  className?: string;
}

export const ContentsMain = (props: Props) => {
  const { select: sort, onChange: onChangeSort } = useSelect({
    options: contentSortOption,
    init: contentSortOption.createdAtDesc,
    base: contentSortOption.createdAtDesc,
  });
  const { text: search, onChange: onChangeSearch } = useInputText('');
  const { pages, onSubmit: onSubmitPage } = usePages();
  const { pageLoc, onClickPage, onSumbit: onSubmitPageLoc } = usePageLoc();
  const { items, onSubmit: onSubmitContentItems } = useContentItems(
    pageLoc,
    sort
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    await onSubmitPage(search);
    await onSubmitContentItems({
      search,
      pageLoc,
      pageTake,
      sort,
    });
    onSubmitPageLoc();
  };
  return (
    <div className={clsx(layoutStyles.mx, props.className)}>
      <form className="flex items-center mx-auto max-w-96" onSubmit={onSubmit}>
        <select
          aria-label="sort"
          name="sort"
          id="sort"
          className="bg-neutral-800 px-2 py-1 rounded"
          onChange={onChangeSort}
          value={sort}
        >
          <option value={contentSortOption.createdAtDesc}>최신순</option>
          <option value={contentSortOption.titleAsc}>제목순</option>
        </select>
        <div className="flex items-center border-b-2 grow ml-4">
          <input
            type="text"
            className="bg-transparent outline-none grow px-4 py-1"
            onChange={onChangeSearch}
            value={search}
            aria-label="search"
          />
          <button>
            <HiSearch className="text-xl" />
          </button>
        </div>
      </form>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.map((c) => (
          <ContentItem key={c.id} className="mt-8" {...c} />
        ))}
      </div>
      <div
        className="flex justify-center items-center mt-8"
        data-testid="pagination"
      >
        {pages.map((c) => (
          <button
            key={c}
            className={clsx(
              'px-2 py-2 mr-2 last:mr-0 rounded data-[selected=true]:bg-neutral-800'
            )}
            onClick={() => {
              onClickPage(c);
            }}
            data-selected={c === pageLoc}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};
