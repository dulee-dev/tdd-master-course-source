'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { deleteContentAction } from './server-side';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
  contentId: string;
}

export const ContentDetailActionBtns = (props: Props) => {
  const router = useRouter();

  const onClickDeleteBtn = async () => {
    const response = await deleteContentAction(props.contentId);
    if (response === undefined) return;

    router.push('/contents');
  };

  return (
    <div className={clsx('flex items-center', props.className)}>
      <Link href={`/contents/${props.contentId}/edit`} className="mr-4">
        수정
      </Link>
      <button onClick={onClickDeleteBtn}>삭제</button>
    </div>
  );
};
