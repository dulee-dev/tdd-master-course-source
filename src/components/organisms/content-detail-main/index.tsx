import { ContentView } from '@/domains/content/content.type';
import { localizeDate } from '@/libs/sub-string';
import { layoutStyles } from '@/styles/layout-styles';
import { middleDot } from '@/utils/string';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  className?: string;
  content: ContentView;
}

export const ContentDetailMain = (props: Props) => {
  return (
    <main className={clsx('mt-8', layoutStyles.px, props.className)}>
      <header>
        <h1 className="text-4xl font-bold leading-normal">
          {props.content.title}
        </h1>
        <div>
          <span>{props.content.author.nickname}</span>
          <span>
            {` `}
            {middleDot}
            {` `}
          </span>
          <span>{localizeDate(props.content.createAt)}</span>
        </div>
        {false && (
          <div className="flex justify-end">
            <Link href={`/contents/${'id'}/edit`} className="mr-4">
              수정
            </Link>
            <button>삭제</button>
          </div>
        )}
      </header>
      <div>{props.content.body}</div>
    </main>
  );
};
