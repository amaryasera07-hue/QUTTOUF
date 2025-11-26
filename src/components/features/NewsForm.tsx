'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createNews, updateNews } from '@/app/actions/news';
import { News, Project } from '@prisma/client';

interface NewsFormProps {
    news?: News;
    projects: Project[];
}

export function NewsForm({ news, projects }: NewsFormProps) {
    const isEditing = !!news;
    const action = isEditing ? updateNews.bind(null, news.id) : createNews;

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{isEditing ? 'Edit News' : 'Create News'}</CardTitle>
            </CardHeader>
            <form action={action}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="News headline"
                            defaultValue={news?.title}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            name="content"
                            placeholder="Full content of the news..."
                            defaultValue={news?.content}
                            required
                            rows={8}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="images">Images (Max 3)</Label>
                        <Input
                            id="images"
                            name="images"
                            type="file"
                            accept="image/*"
                            multiple
                        />
                        {news?.imageUrls && (
                            <div className="flex gap-2 mt-2">
                                {(() => {
                                    try {
                                        const urls = JSON.parse(news.imageUrls);
                                        return Array.isArray(urls) ? urls.map((url: string, index: number) => (
                                            <img key={index} src={url} alt={`News image ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
                                        )) : null;
                                    } catch {
                                        return null;
                                    }
                                })()}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="projectId">Related Project (Optional)</Label>
                        <select
                            id="projectId"
                            name="projectId"
                            defaultValue={news?.projectId || ''}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">-- Select a Project --</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.title}
                                </option>
                            ))}
                        </select>
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {isEditing ? 'Update News' : 'Publish News'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
