'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';

interface VideoModalProps {
    videoUrl: string;
    trigger: React.ReactNode;
}

export function VideoModal({ videoUrl, trigger }: VideoModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && videoUrl) {
            // Simple helper to convert YouTube URLs to embed URLs
            let url = videoUrl;
            if (url.includes('youtube.com/watch?v=')) {
                url = url.replace('watch?v=', 'embed/');
            } else if (url.includes('youtu.be/')) {
                url = url.replace('youtu.be/', 'youtube.com/embed/');
            }
            // Add autoplay
            if (url.includes('?')) {
                url += '&autoplay=1';
            } else {
                url += '?autoplay=1';
            }
            setEmbedUrl(url);
        } else {
            setEmbedUrl(null);
        }
    }, [isOpen, videoUrl]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] p-0 bg-black border-none overflow-hidden">
                <div className="aspect-video w-full relative">
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                            Loading...
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
