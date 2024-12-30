import { ContentItem } from '@/components/molecules/content-item';
import { layoutStyles } from '@/styles/layout-styles';
import clsx from 'clsx';
import { list } from 'radashi';
import { HiSearch } from 'react-icons/hi';

interface Props {
  className?: string;
}

export const ContentsMain = (props: Props) => {
  return (
    <div className={clsx(layoutStyles.mx, props.className)}>
      <div className="flex items-center mx-auto max-w-96">
        <select
          name="sort"
          id="sort"
          className="bg-neutral-800 px-2 py-1 rounded"
        >
          <option value="created-at-desc">최신순</option>
          <option value="title-asc">제목순</option>
        </select>
        <div className="flex items-center border-b-2 grow ml-4">
          <input
            type="text"
            className="bg-transparent outline-none grow px-4 py-1"
          />
          <button>
            <HiSearch className="text-xl" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {list(0, 11).map((c) => (
          <ContentItem className="mt-8" key={c} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-4">
        {list(0, 1).map((c) => (
          <button
            key={c + 1}
            className={clsx(
              'mr-2 px-2 py-2 rounded',
              c === 0 && 'bg-neutral-800'
            )}
          >
            {c + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
