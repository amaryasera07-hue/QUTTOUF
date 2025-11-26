import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { amiri } from '@/lib/fonts';

type NewsPageProps = {
  params: { id: string };
};

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = params;

  const news = await prisma.news.findUnique({
    where: { id },
  });

  if (!news) {
    notFound();
  }

  return (
    <div className={container py-12 md:py-24 ${amiri.variable}}>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          {news.title}
        </h1>

        <div className="prose prose-lg max-w-none leading-relaxed">
          {news.content}
        </div>
      </div>
    </div>
  );
}
