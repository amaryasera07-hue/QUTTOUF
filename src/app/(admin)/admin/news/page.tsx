import Link from 'next/link';
import { getNews, deleteNews } from '@/app/actions/news';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Link as LinkIcon } from 'lucide-react';

export default async function NewsPage() {
    const newsList = await getNews();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">News</h1>
                <Link href="/admin/news/new">
                    <Button className="gap-2">
                        <Plus size={16} />
                        Add News
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {newsList.map((news) => (
                    <Card key={news.id}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium line-clamp-1">
                                {news.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground mb-2">
                                {new Date(news.publishedAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {news.content}
                            </p>
                            {news.project && (
                                <div className="flex items-center gap-1 text-xs text-emerald-600 mb-4 bg-emerald-50 w-fit px-2 py-1 rounded">
                                    <LinkIcon size={12} />
                                    {news.project.title}
                                </div>
                            )}
                            <div className="flex items-center justify-end gap-2">
                                <Link href={`/admin/news/${news.id}/edit`}>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                        <Pencil size={14} />
                                    </Button>
                                </Link>
                                <form action={deleteNews.bind(null, news.id)}>
                                    <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                                        <Trash2 size={14} />
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {newsList.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No news found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
