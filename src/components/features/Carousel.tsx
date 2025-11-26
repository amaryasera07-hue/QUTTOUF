'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselProps {
    children: React.ReactNode;
}

export function Carousel({ children }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', direction: 'rtl' });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative group">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4">
                    {React.Children.map(children, (child) => (
                        <div className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10 hidden md:flex rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white"
                onClick={scrollPrev}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10 hidden md:flex rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white"
                onClick={scrollNext}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
        </div>
    );
}
