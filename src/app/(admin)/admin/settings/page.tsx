import { getSettings } from '@/app/actions/settings';
import { SettingsForm } from './settings-form';

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">إعدادات الموقع</h1>
            <SettingsForm settings={settings} />
        </div>
    );
}
