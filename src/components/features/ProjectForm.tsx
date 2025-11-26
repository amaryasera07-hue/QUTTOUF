'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createProject, updateProject } from '@/app/actions/projects';
import { Project } from '@prisma/client';

interface ProjectFormProps {
    project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
    const isEditing = !!project;
    const action = isEditing ? updateProject.bind(null, project.id) : createProject;

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{isEditing ? 'Edit Project' : 'Create New Project'}</CardTitle>
            </CardHeader>
            <form action={action}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="e.g. Al-Nakhil Oasis"
                            defaultValue={project?.title}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Brief description of the project..."
                            defaultValue={project?.description}
                            required
                            rows={4}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="specifications">Specifications (JSON)</Label>
                        <Textarea
                            id="specifications"
                            name="specifications"
                            placeholder='{"area": "500 acres", "location": "Qassim"}'
                            defaultValue={project?.specifications}
                            rows={4}
                            className="font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                            Enter specifications as a valid JSON object.
                        </p>
                    </div>

                    {/* File uploads will be added later */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="logo">Project Logo</Label>
                            <Input
                                id="logo"
                                name="logo"
                                type="file"
                                accept="image/*"
                            />
                            {project?.logoUrl && (
                                <p className="text-xs text-muted-foreground">
                                    Current: <a href={project.logoUrl} target="_blank" rel="noreferrer" className="underline">View Logo</a>
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pdf">Project Brochure (PDF)</Label>
                            <Input
                                id="pdf"
                                name="pdf"
                                type="file"
                                accept="application/pdf"
                            />
                            {project?.pdfUrl && (
                                <p className="text-xs text-muted-foreground">
                                    Current: <a href={project.pdfUrl} target="_blank" rel="noreferrer" className="underline">View PDF</a>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-medium">Investment Calculator Settings (Profit %)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[3, 4, 5, 6, 7, 8, 9, 10].map((year) => (
                                <div key={year} className="space-y-2">
                                    <Label htmlFor={`profitYear${year}`}>Year {year} (%)</Label>
                                    <Input
                                        id={`profitYear${year}`}
                                        name={`profitYear${year}`}
                                        type="number"
                                        step="0.01"
                                        placeholder="e.g. 15"
                                        defaultValue={(project as any)?.[`profitYear${year}`]}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {isEditing ? 'Update Project' : 'Create Project'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
