import { User } from '@/domains/user/user.entity';
import { layoutStyles } from '@/styles/layout-styles';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className?: string;
  author: User;
}

export const ContentDetailAuthorAside = (props: Props) => {
  return (
    <aside
      className={clsx('mt-8', layoutStyles.px, props.className)}
      data-testid="author-aside"
    >
      <Image
        width={64}
        height={64}
        alt={props.author.nickname}
        src={props.author.imgUrl}
        className="mb-4"
      />
      <Link href={`/users/${props.author.id}`}>{props.author.nickname}</Link>
    </aside>
  );
};
