import { getSettings } from '@/app/actions/settings';
import { Phone, MapPin, Clock } from 'lucide-react';
import { WorkingHoursStatus } from '@/components/features/WorkingHoursStatus';

export async function TopBar() {
    const settings = await getSettings();

    if (!settings) return null;

    return (
        <div className="bg-emerald-900 text-emerald-50 py-2 text-xs md:text-sm">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-4 md:gap-6">
                    {settings.phoneNumber && (
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="text-emerald-400" />
                            <span dir="ltr">{settings.phoneNumber}</span>
                            <WorkingHoursStatus
                                workStartTime={settings.workStartTime}
                                workEndTime={settings.workEndTime}
                            />
                        </div>
                    )}
                    {settings.address && (
                        <div className="flex items-center gap-2 hidden sm:flex">
                            <MapPin size={14} className="text-emerald-400" />
                            <span>{settings.address}</span>
                        </div>
                    )}
                </div>

                {settings.workingHours && (
                    <div className="flex items-center gap-2 hidden md:flex">
                        <Clock size={14} className="text-emerald-400" />
                        <span>{settings.workingHours}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
