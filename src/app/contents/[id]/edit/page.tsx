import { ContentEditForm } from '@/components/molecules/content-edit-form';
import { ContentDetailHeader } from '@/components/organisms/content-detail-header';
import { Footer } from '@/components/organisms/footer';
import { getAuthUser } from '@/effects/authorization';
import { contentApi } from '@/effects/main/content-api.effect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ContentsEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getAuthUser(cookies);
  if (user === undefined) redirect('/users/sign-in');

  const { id } = await params;
  const response = await contentApi.findMyOne(id, user.nickname);
  if (response.status !== 200) redirect('/contents');
  return (
    <>
      <ContentDetailHeader
        contentAuthorNickname={response.data.content.author.nickname}
        user={user}
      />
      <ContentEditForm
        content={response.data.content}
        userNickname={user.nickname}
      />
      <Footer />
    </>
  );
}
