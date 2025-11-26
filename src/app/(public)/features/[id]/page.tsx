import { getFeature } from '@/app/actions/features';
import { notFound } from 'next/navigation';
import { Leaf, TrendingUp, Users, Sun, Droplets, Sprout, Tractor, Wheat, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function FeatureDetailsPage({ params }: { params: { id: string } }) {
    const feature = await getFeature(params.id);

    if (!feature) {
        notFound();
    }

    const IconComponent = {
        Leaf, TrendingUp, Users, Sun, Droplets, Sprout, Tractor, Wheat
    }[feature.icon || 'Leaf'] || Leaf;

    return (
        <div className="container py-12 md:py-24">
            <div className="max-w-3xl mx-auto">
                <Link href="/">
                    <Button variant="ghost" className="mb-8 gap-2 pl-0 hover:pl-2 transition-all">
                        <ArrowRight size={16} />
                        العودة للرئيسية
                    </Button>
                </Link>

                <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-emerald-100 rounded-full text-emerald-600">
                        <IconComponent size={32} />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-emerald-950">{feature.title}</h1>
                </div>

                {feature.image && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-8 shadow-lg">
                        <img
                            src={feature.image}
                            alt={feature.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}

                <div className="prose prose-lg prose-emerald max-w-none">
                    <p className="lead text-xl text-muted-foreground mb-8">
                        {feature.description}
                    </p>
                    <div className="whitespace-pre-wrap">
                        {feature.content || 'لا يوجد محتوى إضافي.'}
                    </div>
                </div>
            </div>
        </div>
    );
}
