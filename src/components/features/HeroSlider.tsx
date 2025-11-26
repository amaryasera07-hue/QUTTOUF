'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HeroSlide {
    id: string;
    imageUrl: string;
    title: string | null;
    description: string | null;
}

interface HeroSliderProps {
    slides: HeroSlide[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    if (slides.length === 0) {
        return (
            <div className="relative h-[600px] w-full overflow-hidden bg-emerald-900 flex items-center justify-center text-white">
                <div className="text-center space-y-4 p-4">
                    <h1 className="text-4xl md:text-6xl font-bold">مرحباً بكم في قطوف</h1>
                    <p className="text-xl md:text-2xl text-emerald-100">الاستثمار الزراعي المستدام للمستقبل</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-[600px] w-full overflow-hidden group">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                        src={slide.imageUrl}
                        alt={slide.title || 'Hero Image'}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white p-4">
                        <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                {slide.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-emerald-50/90 max-w-2xl mx-auto">
                                {slide.description}
                            </p>
                            <div className="flex gap-4 justify-center pt-4">
                                <Link href="/projects">
                                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8">
                                        تصفح المشاريع
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 text-lg px-8">
                                        تواصل معنا
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
                <ArrowLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
                <ArrowRight size={32} />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-emerald-500 w-8' : 'bg-white/50 hover:bg-white'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
