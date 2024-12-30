import { ContentCreateForm } from '@/components/molecules/content-create-form';
import { Footer } from '@/components/organisms/footer';
import { Header } from '@/components/organisms/header';

export default function ContentsPostPage() {
  return (
    <>
      <Header />
      <ContentCreateForm />
      <Footer />
    </>
  );
}
