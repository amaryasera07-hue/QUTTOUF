import { FeatureForm } from '../feature-form';

export default function NewFeaturePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">إضافة ميزة جديدة</h1>
            <FeatureForm />
        </div>
    );
}
