import { ContentDetailAuthorAside } from '@/components/organisms/content-detail-author-aside';
import { ContentDetailCommentSection } from '@/components/organisms/content-detail-comment-section';
import { ContentDetailHeader } from '@/components/organisms/content-detail-header';
import { ContentDetailMain } from '@/components/organisms/content-detail-main';
import { Footer } from '@/components/organisms/footer';
import { getAuthUser } from '@/effects/authorization';
import { contentApi } from '@/effects/main/content-api.effect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ContentsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getAuthUser(cookies);
  const { id } = await params;
  const response = await contentApi.findOne(id);
  if (response.status !== 200) redirect('/contents');

  return (
    <>
      <ContentDetailHeader
        contentAuthorNickname={response.data.content.author.nickname}
        user={user}
      />
      <ContentDetailMain content={response.data.content} />
      <ContentDetailAuthorAside author={response.data.content.author} />
      <ContentDetailCommentSection isAuthorized={!!user} />
      <Footer />
    </>
  );
}
