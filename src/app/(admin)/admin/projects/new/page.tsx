import { ProjectForm } from '@/components/features/ProjectForm';

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
            <ProjectForm />
        </div>
    );
}
