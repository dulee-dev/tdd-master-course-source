import { ContentDetailAuthorAside } from '@/components/organisms/content-detail-author-aside';
import { ContentDetailCommentSection } from '@/components/organisms/content-detail-comment-section';
import { ContentDetailMain } from '@/components/organisms/content-detail-main';
import { Footer } from '@/components/organisms/footer';
import { Header } from '@/components/organisms/header';
import { getAuthUser } from '@/effects/authorization';
import { cookies } from 'next/headers';

export default async function ContentsDetail() {
  const user = await getAuthUser(cookies);

  return (
    <>
      <Header user={user} />
      <ContentDetailMain />
      <ContentDetailAuthorAside />
      <ContentDetailCommentSection />
      <Footer />
    </>
  );
}
