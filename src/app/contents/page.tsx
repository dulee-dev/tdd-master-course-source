import { ContentsMain } from '@/components/organisms/contents-main';
import { Footer } from '@/components/organisms/footer';
import { Header } from '@/components/organisms/header';

export default function Contents() {
  return (
    <>
      <Header />
      <ContentsMain className="mb-20" />
      <Footer />
    </>
  );
}
