'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateSettings } from '@/app/actions/settings';
import { useState, useTransition } from 'react';

interface SettingsFormProps {
    settings: any;
}

export function SettingsForm({ settings }: SettingsFormProps) {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    async function handleSubmit(formData: FormData) {
        setMessage(null);
        startTransition(async () => {
            try {
                const result = await updateSettings(formData);
                if (result.success) {
                    setMessage({ type: 'success', text: 'تم حفظ الإعدادات بنجاح' });
                } else {
                    setMessage({ type: 'error', text: 'حدث خطأ أثناء حفظ الإعدادات' });
                }
            } catch (error) {
                setMessage({ type: 'error', text: 'حدث خطأ غير متوقع' });
            }
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>معلومات التواصل والتواصل الاجتماعي</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                defaultValue={settings?.phoneNumber || ''}
                                placeholder="+966 50 000 0000"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">العنوان</Label>
                            <Input
                                id="address"
                                name="address"
                                defaultValue={settings?.address || ''}
                                placeholder="الرياض، المملكة العربية السعودية"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="facebookUrl">رابط فيسبوك</Label>
                            <Input
                                id="facebookUrl"
                                name="facebookUrl"
                                defaultValue={settings?.facebookUrl || ''}
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="twitterUrl">رابط تويتر (X)</Label>
                            <Input
                                id="twitterUrl"
                                name="twitterUrl"
                                defaultValue={settings?.twitterUrl || ''}
                                placeholder="https://twitter.com/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="instagramUrl">رابط انستغرام</Label>
                            <Input
                                id="instagramUrl"
                                name="instagramUrl"
                                defaultValue={settings?.instagramUrl || ''}
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedinUrl">رابط لينكد إن</Label>
                            <Input
                                id="linkedinUrl"
                                name="linkedinUrl"
                                defaultValue={settings?.linkedinUrl || ''}
                                placeholder="https://linkedin.com/..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="whatsappNumber">رقم الواتساب (مع مفتاح الدولة)</Label>
                        <Input
                            id="whatsappNumber"
                            name="whatsappNumber"
                            defaultValue={settings?.whatsappNumber || ''}
                            placeholder="966500000000"
                        />
                        <p className="text-xs text-muted-foreground">أدخل الرقم بدون علامة + أو مسافات (مثال: 966501234567)</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="workingHours">ساعات العمل</Label>
                            <Input
                                id="workingHours"
                                name="workingHours"
                                defaultValue={settings?.workingHours || ''}
                                placeholder="الأحد - الخميس: 9:00 ص - 5:00 م"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="holidays">أيام العطلة</Label>
                            <Input
                                id="holidays"
                                name="holidays"
                                defaultValue={settings?.holidays || ''}
                                placeholder="الجمعة والسبت"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="workStartTime">وقت بدء العمل</Label>
                            <Input
                                id="workStartTime"
                                name="workStartTime"
                                type="time"
                                defaultValue={settings?.workStartTime || ''}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="workEndTime">وقت انتهاء العمل</Label>
                            <Input
                                id="workEndTime"
                                name="workEndTime"
                                type="time"
                                defaultValue={settings?.workEndTime || ''}
                            />
                        </div>
                    </div>

                    {message && (
                        <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="pt-4">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
