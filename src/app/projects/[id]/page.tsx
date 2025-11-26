import { getProject } from '@/app/actions/projects';
import { getSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Leaf, Calendar, Calculator } from 'lucide-react';
import Link from 'next/link';

interface ProjectDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
    const { id } = await params;
    const project = await getProject(id);
    const session = await getSession();

    if (!project) {
        notFound();
    }

    // Parse specifications JSON safely
    let specs: Record<string, string> = {};
    try {
        specs = JSON.parse(project.specifications);
    } catch (e) {
        // console.error("Failed to parse specifications", e);
    }

    return (

        <div className="min-h-screen bg-background">
            {/* Hero Banner */}
            <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
                {project.logoUrl ? (
                    <>
                        <img
                            src={project.logoUrl}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-emerald-900/10 flex items-center justify-center">
                        <Leaf size={120} className="text-emerald-900/20" />
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 container pb-12">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4 drop-shadow-sm">
                        {project.title}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                        {project.description}
                    </p>
                </div>
            </div>

            <div className="container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Specifications */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                    <FileText size={24} />
                                </div>
                                <h2 className="text-2xl font-bold">تفاصيل المشروع</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {Object.entries(specs).map(([key, value]) => (
                                    <div key={key} className="bg-card hover:bg-accent/50 transition-colors p-4 rounded-xl border shadow-sm group">
                                        <dt className="text-sm font-medium text-muted-foreground mb-1 capitalize group-hover:text-emerald-600 transition-colors">
                                            {key.replace(/_/g, ' ')}
                                        </dt>
                                        <dd className="text-lg font-semibold text-foreground">{value}</dd>
                                    </div>
                                ))}
                                {Object.keys(specs).length === 0 && (
                                    <div className="col-span-full p-8 text-center bg-muted/30 rounded-xl border border-dashed text-muted-foreground">
                                        لا توجد تفاصيل إضافية متاحة حالياً.
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Project Updates */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <Calendar size={24} />
                                </div>
                                <h2 className="text-2xl font-bold">آخر التحديثات</h2>
                            </div>

                            <div className="space-y-6 relative border-r border-border pr-8 mr-4">
                                {project.news && project.news.length > 0 ? (
                                    project.news.map((news) => (
                                        <div key={news.id} className="relative">
                                            {/* Timeline Dot */}
                                            <div className="absolute -right-[41px] top-1 w-5 h-5 rounded-full border-4 border-background bg-emerald-500" />

                                            <Card className="hover:shadow-md transition-shadow duration-300">
                                                <CardHeader>
                                                    <div className="text-xs font-medium text-emerald-600 mb-2">
                                                        {new Date(news.publishedAt).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </div>
                                                    <CardTitle className="text-xl">
                                                        <Link href={`/news`} className="hover:text-emerald-600 transition-colors">
                                                            {news.title}
                                                        </Link>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {news.content}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-muted-foreground text-center py-8 bg-muted/30 rounded-xl">
                                        لا توجد تحديثات متاحة لهذا المشروع حتى الآن.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-900 to-emerald-800 text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <CardContent className="p-6 space-y-4 relative z-10">
                                    <h3 className="text-xl font-bold mb-4">إجراءات سريعة</h3>

                                    {project.pdfUrl ? (
                                        session ? (
                                            <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" className="block">
                                                <Button className="w-full h-12 bg-white/10 hover:bg-white/20 text-white border-none justify-start gap-3 text-lg font-normal backdrop-blur-sm">
                                                    <div className="p-1.5 bg-white/20 rounded-full">
                                                        <Download size={18} />
                                                    </div>
                                                    تحميل الكتيب (PDF)
                                                </Button>
                                            </a>
                                        ) : (
                                            <Link href={`/login?callbackUrl=/projects/${id}`} className="block">
                                                <Button className="w-full h-12 bg-white/10 hover:bg-white/20 text-white border-none justify-start gap-3 text-lg font-normal backdrop-blur-sm">
                                                    <div className="p-1.5 bg-white/20 rounded-full">
                                                        <Download size={18} />
                                                    </div>
                                                    سجل لتحميل الكتيب
                                                </Button>
                                            </Link>
                                        )
                                    ) : (
                                        <Button disabled className="w-full h-12 bg-white/5 text-white/50 border-none justify-start gap-3 text-lg font-normal">
                                            <div className="p-1.5 bg-white/10 rounded-full">
                                                <Download size={18} />
                                            </div>
                                            الكتيب غير متاح
                                        </Button>
                                    )}

                                    {(project as any).profitYear3 && (
                                        session ? (
                                            <Link href={`/projects/${id}/calculator`} className="block">
                                                <Button className="w-full h-12 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 border-none justify-start gap-3 text-lg font-bold shadow-lg shadow-emerald-900/20">
                                                    <div className="p-1.5 bg-emerald-950/10 rounded-full">
                                                        <Calculator size={18} />
                                                    </div>
                                                    حاسبة الاستثمار
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Link href={`/login?callbackUrl=/projects/${id}/calculator`} className="block">
                                                <Button className="w-full h-12 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 border-none justify-start gap-3 text-lg font-bold shadow-lg shadow-emerald-900/20">
                                                    <div className="p-1.5 bg-emerald-950/10 rounded-full">
                                                        <Calculator size={18} />
                                                    </div>
                                                    سجل لاستخدام الحاسبة
                                                </Button>
                                            </Link>
                                        )
                                    )}

                                    <Link href="/contact" className="block pt-4 border-t border-white/10">
                                        <Button variant="outline" className="w-full h-12 bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white justify-center gap-2">
                                            تواصل معنا للاستفسار
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            {project.news && project.news.length > 0 && (
                                <div className="bg-muted/50 rounded-xl p-4 border border-dashed space-y-3 text-right">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-sm text-emerald-800">آخر الأخبار</h4>
                                        <Link href="/news" className="text-xs text-emerald-600 hover:underline">
                                            المزيد
                                        </Link>
                                    </div>

                                    {(() => {
                                        const latestNews = [...project.news].sort((a, b) =>
                                            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
                                        )[0];

                                        return (
                                            <div className="space-y-2">
                                                <div className="text-xs text-muted-foreground">
                                                    {new Date(latestNews.publishedAt).toLocaleDateString('ar-SA')}
                                                </div>
                                                <Link href={`/news`} className="block font-medium text-sm hover:text-emerald-600 transition-colors line-clamp-2">
                                                    {latestNews.title}
                                                </Link>
                                            </div>
                                        );
                                    })()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
