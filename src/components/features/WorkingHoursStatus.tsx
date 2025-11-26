'use client';

import { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface WorkingHoursStatusProps {
    workStartTime?: string | null;
    workEndTime?: string | null;
    mode?: 'icon' | 'badge' | 'text';
}

export function WorkingHoursStatus({ workStartTime, workEndTime, mode = 'icon' }: WorkingHoursStatusProps) {
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        if (!workStartTime || !workEndTime) return;

        const checkTime = () => {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            const [startHour, startMinute] = workStartTime.split(':').map(Number);
            const [endHour, endMinute] = workEndTime.split(':').map(Number);

            const startTotalMinutes = startHour * 60 + startMinute;
            const endTotalMinutes = endHour * 60 + endMinute;

            if (currentMinutes < startTotalMinutes || currentMinutes > endTotalMinutes) {
                setIsClosed(true);
            } else {
                setIsClosed(false);
            }
        };

        checkTime();
        const interval = setInterval(checkTime, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [workStartTime, workEndTime]);

    if (!isClosed) return null;

    if (mode === 'badge') {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium border border-amber-200 animate-pulse cursor-help">
                            <AlertCircle size={14} />
                            <span>توقع تأخير الرد (وقت راحة)</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/80 backdrop-blur-sm text-white border-none">
                        <p>نحن حالياً خارج ساعات العمل. قد يتأخر الرد قليلاً.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    if (mode === 'text') {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="text-amber-600 text-xs flex items-center gap-1 cursor-help">
                            <AlertCircle size={12} />
                            توقع تأخير الرد
                        </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/80 backdrop-blur-sm text-white border-none">
                        <p>نحن حالياً خارج ساعات العمل. قد يتأخر الرد قليلاً.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-amber-300 bg-amber-900/30 px-2 py-0.5 rounded-full text-[10px] animate-pulse cursor-help">
                        <AlertCircle size={12} />
                        <span>وقت الراحة</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black/80 backdrop-blur-sm text-white border-none">
                    <p>نحن حالياً خارج ساعات العمل. قد يتأخر الرد قليلاً.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
