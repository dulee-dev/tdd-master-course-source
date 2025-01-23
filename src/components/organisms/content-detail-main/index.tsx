import { ContentDetailActionBtns } from '@/components/molecules/content-detail-action-btns';
import { ContentView } from '@/domains/content/content.type';
import { localizeDate } from '@/libs/sub-string';
import { layoutStyles } from '@/styles/layout-styles';
import { middleDot } from '@/utils/string';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  className?: string;
  content: ContentView;
  isAuthor: boolean;
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
          <span>{localizeDate(props.content.createdAt)}</span>
        </div>
        {props.isAuthor && (
          <div className="flex justify-end">
            <ContentDetailActionBtns contentId={props.content.id} />
          </div>
        )}
      </header>
      <div>{props.content.body}</div>
    </main>
  );
};
