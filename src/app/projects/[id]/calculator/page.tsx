import { getProject } from '@/app/actions/projects';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { InvestmentCalculator } from '@/components/features/InvestmentCalculator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function CalculatorPage({ params }: { params: { id: string } }) {
    const session = await getSession();
    if (!session) {
        redirect(`/login?callbackUrl=/projects/${params.id}/calculator`);
    }

    const project = await getProject(params.id);
    if (!project) {
        return <div>Project not found</div>;
    }

    // Extract profit percentages
    const profits = [];
    for (let i = 3; i <= 10; i++) {
        const key = `profitYear${i}` as keyof typeof project;
        const percentage = project[key] as number | null;
        if (percentage !== null && percentage !== undefined) {
            profits.push({ year: i, percentage });
        }
    }

    // If no profits defined, show message
    if (profits.length === 0) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">عفواً، الحاسبة غير متاحة لهذا المشروع حالياً</h1>
                <Link href={`/projects/${params.id}`}>
                    <Button>العودة للمشروع</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-12 max-w-4xl">
            <div className="mb-8">
                <Link href={`/projects/${params.id}`} className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
                    <ArrowRight size={16} className="ml-2" />
                    العودة لتفاصيل المشروع
                </Link>
                <h1 className="text-3xl font-bold text-emerald-900">حاسبة الاستثمار</h1>
                <p className="text-muted-foreground mt-2">
                    احسب أرباحك المتوقعة لمشروع {project.title}
                </p>
            </div>

            <InvestmentCalculator profits={profits} projectTitle={project.title} />
        </div>
    );
}
