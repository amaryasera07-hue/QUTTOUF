import { FeatureForm } from '../../feature-form';
import { getFeature } from '@/app/actions/features';
import { notFound } from 'next/navigation';

export default async function EditFeaturePage({ params }: { params: { id: string } }) {
    const feature = await getFeature(params.id);

    if (!feature) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">تعديل الميزة</h1>
            <FeatureForm feature={feature} />
        </div>
    );
}
