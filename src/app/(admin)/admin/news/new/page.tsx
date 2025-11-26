import { NewsForm } from '@/components/features/NewsForm';
import { getProjects } from '@/app/actions/projects';

export default async function NewNewsPage() {
    const projects = await getProjects();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">New News Article</h1>
            <NewsForm projects={projects} />
        </div>
    );
}
