'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  className?: string;
  contentId: string;
}

export const ContentDetailActionBtns = (props: Props) => {
  const onClickDeleteBtn = async () => {};

  return (
    <div className={clsx('flex items-center', props.className)}>
      <Link href={`/contents/${props.contentId}/edit`} className="mr-4">
        수정
      </Link>
      <button onClick={onClickDeleteBtn}>삭제</button>
    </div>
  );
};
