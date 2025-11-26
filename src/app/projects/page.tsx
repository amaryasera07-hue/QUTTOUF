import Link from 'next/link';
import { getProjects } from '@/app/actions/projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="container py-12 md:py-24">
            <div className="flex flex-col items-center text-center mb-12 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Our Projects</h1>
                <p className="text-muted-foreground max-w-2xl">
                    Discover our diverse portfolio of agricultural investments, from large-scale palm plantations to innovative farming initiatives.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                        <div className="h-56 bg-muted flex items-center justify-center text-muted-foreground relative">
                            {project.logoUrl ? (
                                <img
                                    src={project.logoUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Leaf size={64} className="opacity-20" />
                            )}
                        </div>
                        <CardHeader>
                            <CardTitle className="text-xl">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                                {project.description}
                            </p>
                            <Link href={`/projects/${project.id}`}>
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">View Project Details</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
                {projects.length === 0 && (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        No projects found.
                    </div>
                )}
            </div>
        </div>
    );
}
