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
        {/* العنوان */}
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          {news.title}
        </h1>

        {/* لو عندك حقل imageUrls في الجدول */}
        {'imageUrls' in news &&
          Array.isArray((news as any).imageUrls) &&
          (news as any).imageUrls.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {(news as any).imageUrls.map(
                (url: string, index: number) => (
                  <img
                    key={index}
                    src={url}
                    alt={news.title}
                    className="w-full rounded-lg object-cover"
                  />
                ),
              )}
            </div>
          )}

        {/* المحتوى */}
        <div className="prose prose-lg max-w-none leading-relaxed">
          {news.content}
        </div>
      </div>
    </div>
  );
}
