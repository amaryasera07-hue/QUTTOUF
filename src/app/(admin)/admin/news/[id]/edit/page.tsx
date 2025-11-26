import { NewsForm } from '@/components/features/NewsForm';
import { getNewsItem } from '@/app/actions/news';
import { getProjects } from '@/app/actions/projects';
import { notFound } from 'next/navigation';

interface EditNewsPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: EditNewsPageProps) {
    const { id } = await params;
    const [news, projects] = await Promise.all([
        getNewsItem(id),
        getProjects(),
    ]);

    if (!news) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Edit News Article</h1>
            <NewsForm news={news} projects={projects} />
        </div>
    );
}
