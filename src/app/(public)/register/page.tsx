'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { register } from '@/app/actions/auth';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export default function RegisterPage() {
    // const [state, formAction] = useFormState(register, null);

    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">تسجيل عضوية جديدة</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={register} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">الاسم الكامل *</Label>
                            <Input id="name" name="name" required placeholder="الاسم الثلاثي" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">رقم الهاتف *</Label>
                            <Input id="phone" name="phone" required placeholder="05xxxxxxxx" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">كلمة المرور *</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
                            <Input id="email" name="email" type="email" />
                        </div>

                        <div className="border-t pt-4 mt-4">
                            <h3 className="font-semibold mb-3 text-emerald-800">استبيان المستثمر</h3>

                            <div className="space-y-2 mb-3">
                                <Label htmlFor="investmentAmount">مبلغ الاستثمار المتوقع</Label>
                                <select
                                    id="investmentAmount"
                                    name="investmentAmount"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">اختر المبلغ</option>
                                    <option value="50k-100k">50,000 - 100,000 ريال</option>
                                    <option value="100k-500k">100,000 - 500,000 ريال</option>
                                    <option value="500k-1m">500,000 - 1,000,000 ريال</option>
                                    <option value="1m+">أكثر من 1,000,000 ريال</option>
                                </select>
                            </div>

                            <div className="space-y-2 mb-3">
                                <Label htmlFor="preferredLocation">المنطقة المفضلة للاستثمار</Label>
                                <Input id="preferredLocation" name="preferredLocation" placeholder="مثال: الرياض، القصيم..." />
                            </div>

                            <div className="space-y-2 mb-3">
                                <Label htmlFor="referralSource">كيف سمعت عنا؟</Label>
                                <select
                                    id="referralSource"
                                    name="referralSource"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">اختر المصدر</option>
                                    <option value="social_media">وسائل التواصل الاجتماعي</option>
                                    <option value="friend">صديق / قريب</option>
                                    <option value="advertisement">إعلان</option>
                                    <option value="search">بحث جوجل</option>
                                    <option value="other">أخرى</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="questions">أسئلة أو استفسارات أخرى</Label>
                                <Textarea id="questions" name="questions" placeholder="اكتب استفسارك هنا..." />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">تسجيل</Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground mt-4">
                            لديك حساب بالفعل؟ <Link href="/login" className="text-emerald-600 hover:underline">تسجيل الدخول</Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
