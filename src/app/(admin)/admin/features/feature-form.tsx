'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createFeature, updateFeature } from '@/app/actions/features';
import { Loader2, Save } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Available Lucide icons to choose from
const ICONS = [
    { value: 'Leaf', label: 'ورقة شجر (Leaf)' },
    { value: 'TrendingUp', label: 'سهم صاعد (TrendingUp)' },
    { value: 'Users', label: 'مستخدمين (Users)' },
    { value: 'Sun', label: 'شمس (Sun)' },
    { value: 'Droplets', label: 'قطرات (Droplets)' },
    { value: 'Sprout', label: 'نبتة (Sprout)' },
    { value: 'Tractor', label: 'جرار (Tractor)' },
    { value: 'Wheat', label: 'قمح (Wheat)' },
];

interface FeatureFormProps {
    feature?: {
        id: string;
        title: string;
        description: string;
        icon: string | null;
        image: string | null;
        content: string | null;
    };
}

export function FeatureForm({ feature }: FeatureFormProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        startTransition(async () => {
            const result = feature
                ? await updateFeature(feature.id, formData)
                : await createFeature(formData);

            if (result.success) {
                router.push('/admin/features');
                router.refresh();
            } else {
                setError(result.error || 'حدث خطأ ما');
            }
        });
    }

    return (
        <form action={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
                <Label htmlFor="title">العنوان</Label>
                <Input
                    id="title"
                    name="title"
                    defaultValue={feature?.title}
                    placeholder="مثال: زراعة مستدامة"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">الوصف المختصر</Label>
                <Textarea
                    id="description"
                    name="description"
                    defaultValue={feature?.description}
                    placeholder="وصف قصير يظهر في الصفحة الرئيسية"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="icon">الأيقونة</Label>
                <Select name="icon" defaultValue={feature?.icon || 'Leaf'}>
                    <SelectTrigger>
                        <SelectValue placeholder="اختر أيقونة" />
                    </SelectTrigger>
                    <SelectContent>
                        {ICONS.map((icon) => (
                            <SelectItem key={icon.value} value={icon.value}>
                                {icon.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">رابط الصورة (اختياري)</Label>
                <Input
                    id="image"
                    name="image"
                    defaultValue={feature?.image || ''}
                    placeholder="/images/example.jpg"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">المحتوى التفصيلي</Label>
                <Textarea
                    id="content"
                    name="content"
                    defaultValue={feature?.content || ''}
                    placeholder="شرح كامل للميزة يظهر في صفحة التفاصيل"
                    className="min-h-[200px]"
                />
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {error}
                </div>
            )}

            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الحفظ...
                    </>
                ) : (
                    <>
                        <Save className="mr-2 h-4 w-4" />
                        حفظ التغييرات
                    </>
                )}
            </Button>
        </form>
    );
}
