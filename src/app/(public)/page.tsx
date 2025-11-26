import { HeroSlider } from '@/components/features/HeroSlider';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProjects } from '@/app/actions/projects';
import { getNews } from '@/app/actions/news';
import { getHeroSlides } from '@/app/actions/hero';
import { getSettings } from '@/app/actions/settings';
import { getFeatures } from '@/app/actions/features';
import { WorkingHoursStatus } from '@/components/features/WorkingHoursStatus';
import { ArrowLeft, Leaf, TrendingUp, Users, Calendar, MessageCircle, Sun, Droplets, Sprout, Tractor, Wheat } from 'lucide-react';

export default async function HomePage() {
    const projects = await getProjects();
    const newsList = await getNews();
    const slides = await getHeroSlides();
    const settings = await getSettings();
    const features = await getFeatures();

    const featuredProjects = projects.slice(0, 3);
    const latestNews = newsList.slice(0, 3);


    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <HeroSlider slides={slides} />



            {/* Featured Projects */}
            <section className="py-12 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold tracking-tight">مشاريع مميزة</h2>
                        <Link href="/projects" className="text-emerald-600 hover:underline flex items-center gap-1">
                            عرض الكل <ArrowLeft size={16} />
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {featuredProjects.map((project) => (
                            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-muted flex items-center justify-center text-muted-foreground relative">
                                    {project.logoUrl ? (
                                        <img
                                            src={project.logoUrl}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Leaf size={48} className="opacity-20" />
                                    )}
                                </div>
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground line-clamp-3 mb-4 text-sm">
                                        {project.description}
                                    </p>
                                    <Link href={`/projects/${project.id}`}>
                                        <Button variant="outline" className="w-full">عرض التفاصيل</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                        {featuredProjects.length === 0 && (
                            <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/30 rounded-lg">
                                لا توجد مشاريع متاحة حالياً.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Latest News */}
            <section className="py-12 md:py-24 bg-muted/30">
                <div className="container px-4 md:px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold tracking-tight">آخر الأخبار</h2>
                        <Link href="/news" className="text-emerald-600 hover:underline flex items-center gap-1">
                            اقرأ المزيد <ArrowLeft size={16} />
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {latestNews.map((news) => {
                            let imageUrl = '/placeholder-news.jpg';
                            try {
                                const images = JSON.parse(news.imageUrls);
                                if (images.length > 0) imageUrl = images[0];
                            } catch (e) {
                                // fallback
                            }

                            return (
                                <Link key={news.id} href={`/news/${news.id}`} className="group block h-full">
                                    <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
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
                                                <span>{new Date(news.publishedAt).toLocaleDateString('ar-SA')}</span>
                                            </div>

                                            <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors">
                                                {news.title}
                                            </h3>

                                            <div className="flex items-center text-sm font-medium text-emerald-200 mt-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                                اقرأ المزيد <ArrowLeft size={16} className="mr-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                        {latestNews.length === 0 && (
                            <div className="col-span-full text-center py-12 text-muted-foreground bg-background rounded-lg border border-dashed">
                                لا توجد تحديثات إخبارية بعد.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-8 bg-muted/50">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-8 md:grid-cols-3">
                        {features.map((feature) => {
                            // Dynamic Icon Component
                            const IconComponent = {
                                Leaf, TrendingUp, Users, Sun, Droplets, Sprout, Tractor, Wheat
                            }[feature.icon || 'Leaf'] || Leaf;

                            return (
                                <Link key={feature.id} href={`/features/${feature.id}`} className="block group h-full">
                                    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-md h-full">
                                        <div className="p-4 bg-emerald-100 rounded-full text-emerald-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white">
                                            <IconComponent size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-700 transition-colors">{feature.title}</h3>
                                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                            <div className="overflow-hidden">
                                                <p className="text-muted-foreground text-sm leading-relaxed pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                        {features.length === 0 && (
                            <div className="col-span-full text-center py-8 text-muted-foreground">
                                جاري إضافة المميزات...
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* WhatsApp Section */}
            <section className="py-4 bg-emerald-50 border-t border-emerald-100">
                <div className="container flex flex-col items-center justify-center text-center space-y-2">
                    <h3 className="text-lg font-bold text-emerald-900">تواصل معنا عبر الواتساب</h3>
                    <p className="text-sm text-emerald-700 max-w-lg">
                        هل لديك استفسار؟ تواصل معنا مباشرة للحصول على رد سريع.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                        <Link href="https://wa.me/966501234567" target="_blank" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-bold transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 text-sm">
                            <MessageCircle size={18} />
                            تواصل عبر الواتساب
                        </Link>
                        <WorkingHoursStatus
                            workStartTime={settings?.workStartTime}
                            workEndTime={settings?.workEndTime}
                            mode="badge"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
