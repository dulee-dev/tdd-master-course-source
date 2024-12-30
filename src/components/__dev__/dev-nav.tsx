import Link from 'next/link';

interface LinkItem {
  tag: string;
  href: string;
}

const links: LinkItem[] = [
  {
    tag: '컨텐츠 상세페이지',
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
    href: '/contents/3bb796cf-a7c4-46c1-a0c2-4250ab75a34d/edit',
  },
];

export const DevNav = () => {
  return (
    <div className={'fixed right-10 bottom-10'}>
      {links.map((c) => (
        <div key={c.tag}>
          <Link href={c.href}>{c.tag}</Link>
        </div>
      ))}
    </div>
  );
};
