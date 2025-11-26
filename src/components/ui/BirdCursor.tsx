'use client';

import { useEffect, useState } from 'react';

interface Point {
    x: number;
    y: number;
    id: number;
}

export function BirdCursor() {
    const [trail, setTrail] = useState<Point[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
            setTrail((prev) => [...prev.slice(-15), newPoint]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTrail((prev) => prev.slice(1));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {trail.map((point, index) => (
                <div
                    key={point.id}
                    className="absolute transition-all duration-500 ease-out"
                    style={{
                        left: point.x,
                        top: point.y,
                        transform: `translate(-50%, -50%) scale(${1 - (trail.length - index) * 0.05})`,
                        opacity: (index + 1) / trail.length,
                    }}
                >
                    {/* Simple Green Bird SVG */}
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-emerald-500 drop-shadow-sm"
                    >
                        <path
                            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            fill="currentColor"
                            opacity="0.2"
                        />
                        <path
                            d="M16.5 8.5C16.5 8.5 14 11 11 11C8 11 7.5 13.5 7.5 13.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M11 11L9 16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M16.5 8.5L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            ))}
        </div>
    );
}
