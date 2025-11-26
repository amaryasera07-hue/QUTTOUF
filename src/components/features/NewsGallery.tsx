'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsGalleryProps {
    images: string[];
    title: string;
}

export function NewsGallery({ images, title }: NewsGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    if (!images || images.length === 0) return null;

    return (
        <div className="space-y-4">
            {/* Main Image Area */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl group bg-muted">
                <img
                    src={images[selectedIndex]}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white backdrop-blur-sm">
                                <Maximize2 size={20} className="text-emerald-900" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl w-full h-[90vh] p-0 bg-black/95 border-none">
                            <div className="relative w-full h-full flex items-center justify-center p-4">
                                <img
                                    src={images[selectedIndex]}
                                    alt={title}
                                    className="max-w-full max-h-full object-contain"
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 text-white hover:text-emerald-400 transition-colors"
                                >
                                    <X size={32} />
                                </button>

                                {/* Lightbox Thumbnails */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full p-2 bg-black/50 backdrop-blur-md rounded-full">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedIndex(idx)}
                                            className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${selectedIndex === idx ? 'border-emerald-500 scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Thumbnails Strip */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all duration-300 ${selectedIndex === idx
                                    ? 'ring-2 ring-emerald-600 ring-offset-2 scale-105 shadow-md'
                                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                                }`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
