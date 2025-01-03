import { cookies } from 'next/headers';
import { ContentsMain } from '@/components/organisms/contents-main';
import { Footer } from '@/components/organisms/footer';
import { Header } from '@/components/organisms/header';
import { getAuthUser } from '@/effects/authorization';

export default async function Contents() {
  const user = await getAuthUser(cookies);
  return (
    <>
      <Header user={user} />
      <ContentsMain className="mb-20" />
      <Footer />
    </>
  );
}
