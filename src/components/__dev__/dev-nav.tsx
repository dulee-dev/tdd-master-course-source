'use client';

import { contentFixtures } from '@__tests__/fixtures/content-fixture';
import Link from 'next/link';
import { resetVirtualFixturesAction } from './server-side';
import { toast } from 'react-toastify';
import { checkIsMock } from '@__tests__/libs/check-is-mock';

interface LinkItem {
  tag: string;
  href: string;
}

const links: LinkItem[] = [
  {
    tag: '컨텐츠 상세페이지',
    href: `/contents/${contentFixtures[0].id}`,
  },
  {
    tag: '컨텐츠 상세페이지 void',
    href: '/contents/3bb796cf-a7c4-46c1-a0c2-4250ab75a34d',
  },
  {
    tag: '컨텐츠 리스트 페이지',
    href: '/contents',
  },
  {
    tag: '컨텐츠 생성 페이지',
    href: '/contents/post',
  },
  {
    tag: '컨텐츠 수정 페이지',
    href: `/contents/${contentFixtures[0].id}/edit`,
  },
];

export const DevNav = () => {
  const onClick = async () => {
    await resetVirtualFixturesAction();
    toast('reset fixture success', { autoClose: 2000 });
  };

  return (
    <div className={'fixed right-10 bottom-10'}>
      {links.map((c) => (
        <div key={c.tag}>
          <Link href={c.href}>{c.tag}</Link>
        </div>
      ))}
      {checkIsMock() && <button onClick={onClick}>reset</button>}
    </div>
  );
};
