import { getNewsItem } from '@/app/actions/news';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NewsGallery } from '@/components/features/NewsGallery';
import { Amiri } from 'next/font/google';

const amiri = Amiri({
    subsets: ['arabic'],
    weight: ['400', '700'],
    variable: '--font-amiri',
});

interface NewsDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function NewsDetailsPage({ params }: NewsDetailsPageProps) {
    const { id } = await params;
    const news = await getNewsItem(id);

    if (!news) {
        notFound();
    }

    let images: string[] = [];
    try {
        images = JSON.parse(news.imageUrls);
    } catch (e) {
        images = [];
    }

    return (
        <div className={`container py-12 md:py-24 ${amiri.variable}`}>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* 1. Date (Top) */}
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Calendar size={16} />
                    <span>{new Date(news.publishedAt).toLocaleDateString('ar-SA')}</span>
                </div>

                {/* 2. Title (Large, Distinct Font) */}
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-emerald-950 font-amiri leading-tight text-center">
                    {news.title}
                </h1>

                {/* 3. Gallery (Full Width) */}
                <div className="w-full">
                    <NewsGallery images={images} title={news.title} />
                </div>

                {/* 4. Content (Below Gallery) */}
                <div className="prose prose-lg prose-emerald max-w-none mx-auto">
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700 text-lg">
                        {news.content}
                    </p>
                </div>

                <div className="border-t border-emerald-100 pt-8 mt-12 flex justify-between items-center">
                    <Link href="/news" className="text-emerald-600 hover:underline flex items-center gap-1">
                        <ArrowRight size={16} /> العودة للأخبار
                    </Link>
{/* احذف هذا الجزء لأنه غير موجود */}
{/* 
{news.project && (
    <Link href={/projects/${news.project.id}}>
        <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
            مشروع المرتبط
        </Button>
    </Link>
)}
*/}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
