import { getNews } from '@/app/actions/news';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function NewsPage() {
    const news = await getNews();

    return (
        <div className="container py-12 md:py-24">
            <div className="flex flex-col items-center text-center mb-12 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-emerald-950">أخبارنا ومقالاتنا</h1>
                <p className="text-muted-foreground max-w-2xl">
                    تابع آخر أخبار قطوف ومستجدات الاستثمار الزراعي في المملكة.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => {
                    let imageUrl = '/placeholder-news.jpg';
                    try {
                        const images = JSON.parse(item.imageUrls);
                        if (images.length > 0) imageUrl = images[0];
                    } catch (e) {
                        // fallback
                    }

                    return (
                        <Link key={item.id} href={`/news/${item.id}`} className="group block h-full">
                            <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${imageUrl})` }}
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="flex items-center gap-2 text-emerald-300 text-sm mb-2">
                                        <Calendar size={14} />
                                        <span>{new Date(item.publishedAt).toLocaleDateString('ar-SA')}</span>
                                    </div>

                                    <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors">
                                        {item.title}
                                    </h3>

                                    <div className="flex items-center text-sm font-medium text-emerald-200 mt-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                        اقرأ المزيد <ArrowRight size={16} className="mr-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {news.length === 0 && (
                <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-lg">
                    لا توجد أخبار حالياً.
                </div>
            )}
        </div>
    );
}
