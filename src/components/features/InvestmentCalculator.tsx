'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calculator, AlertCircle } from 'lucide-react';

interface InvestmentCalculatorProps {
    profits: { year: number; percentage: number }[];
    projectTitle: string;
}

export function InvestmentCalculator({ profits, projectTitle }: InvestmentCalculatorProps) {
    const [amount, setAmount] = useState<number>(500000);
    const [error, setError] = useState<string>('');

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setAmount(value);

        if (value < 500000) {
            setError('الحد الأدنى للاستثمار هو 500,000 جنيه');
        } else if (value % 500000 !== 0) {
            setError('المبلغ يجب أن يكون من مضاعفات 500,000 جنيه');
        } else {
            setError('');
        }
    };

    const data = useMemo(() => {
        if (!amount || error) return [];
        return profits.map((p) => ({
            year: `السنة ${p.year}`,
            profit: Math.round(amount * (p.percentage / 100)),
            percentage: p.percentage,
        }));
    }, [amount, profits, error]);

    const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calculator className="text-emerald-600" />
                        حاسبة الأرباح - {projectTitle}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="amount">مبلغ الاستثمار (جنيه)</Label>
                        <Input
                            id="amount"
                            type="number"
                            min="500000"
                            step="500000"
                            value={amount}
                            onChange={handleAmountChange}
                            className={error ? 'border-red-500' : ''}
                        />
                        {error ? (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} /> {error}
                            </p>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                الحد الأدنى 500,000 جنيه ومضاعفاتها
                            </p>
                        )}
                    </div>

                    {!error && amount >= 500000 && (
                        <div className="h-[400px] w-full mt-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value: number) => [`${value.toLocaleString()} جنيه`, 'الأرباح المتوقعة']}
                                        labelStyle={{ color: '#10b981' }}
                                    />
                                    <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#34d399'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {!error && amount >= 500000 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                            <div className="bg-emerald-50 p-4 rounded-lg">
                                <p className="text-sm text-emerald-800 mb-1">إجمالي الأرباح المتوقعة (8 سنوات)</p>
                                <p className="text-2xl font-bold text-emerald-600">{totalProfit.toLocaleString()} جنيه</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-800 mb-1">متوسط العائد السنوي</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {((totalProfit / amount / 8) * 100).toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
