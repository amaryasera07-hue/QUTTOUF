import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { getFeatures, deleteFeature } from '@/app/actions/features';
import { revalidatePath } from 'next/cache';

export default async function AdminFeaturesPage() {
    const features = await getFeatures();

    async function handleDelete(formData: FormData) {
        'use server';
        const id = formData.get('id') as string;
        await deleteFeature(id);
        revalidatePath('/admin/features');
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">المميزات (Features)</h1>
                <Link href="/admin/features/new">
                    <Button className="gap-2">
                        <Plus size={16} />
                        إضافة ميزة جديدة
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                    <Card key={feature.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {feature.title}
                            </CardTitle>
                            {feature.icon && (
                                <div className="text-muted-foreground">
                                    {/* We'll handle dynamic icons later or just show text */}
                                    {feature.icon}
                                </div>
                            )}
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                                {feature.description}
                            </p>
                            <div className="flex items-center gap-2">
                                <Link href={`/admin/features/${feature.id}/edit`} className="w-full">
                                    <Button variant="outline" size="sm" className="w-full gap-2">
                                        <Pencil size={14} />
                                        تعديل
                                    </Button>
                                </Link>
                                <form action={handleDelete}>
                                    <input type="hidden" name="id" value={feature.id} />
                                    <Button variant="destructive" size="sm" type="submit">
                                        <Trash2 size={14} />
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {features.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/30 rounded-lg border border-dashed">
                        لا توجد مميزات مضافة بعد.
                    </div>
                )}
            </div>
        </div>
    );
}
