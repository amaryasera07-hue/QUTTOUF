import Link from 'next/link';
import { getProjects, deleteProject } from '@/app/actions/projects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <Link href="/admin/projects/new">
                    <Button className="gap-2">
                        <Plus size={16} />
                        Add Project
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.id}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium line-clamp-1">
                                {project.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {project.description}
                            </p>
                            <div className="flex items-center justify-end gap-2">
                                <Link href={`/admin/projects/${project.id}/edit`}>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                        <Pencil size={14} />
                                    </Button>
                                </Link>
                                <form action={deleteProject.bind(null, project.id)}>
                                    <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                                        <Trash2 size={14} />
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {projects.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No projects found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
