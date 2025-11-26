'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createContactMessage } from '@/app/actions/messages';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(formData: FormData) {
        setStatus('loading');
        try {
            await createContactMessage(formData);
            setStatus('success');
        } catch (error) {
            setStatus('error');
            setErrorMessage('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
        }
    }

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-emerald-900">تم إرسال رسالتك بنجاح!</h3>
                <p className="text-emerald-700">شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.</p>
                <Button variant="outline" onClick={() => setStatus('idle')} className="mt-4">
                    إرسال رسالة أخرى
                </Button>
            </div>
        );
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">الاسم الكامل</label>
                <Input id="name" name="name" required placeholder="الاسم الكامل" disabled={status === 'loading'} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">البريد الإلكتروني</label>
                    <Input id="email" name="email" type="email" placeholder="example@domain.com" disabled={status === 'loading'} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">رقم الهاتف <span className="text-red-500">*</span></label>
                    <Input id="phone" name="phone" type="tel" placeholder="مطلوب" required disabled={status === 'loading'} />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="whatsapp" className="text-sm font-medium">رقم الواتساب</label>
                <Input id="whatsapp" name="whatsapp" type="tel" placeholder="اختياري" disabled={status === 'loading'} />
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">الموضوع</label>
                <Input id="subject" name="subject" placeholder="موضوع الرسالة" disabled={status === 'loading'} />
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">الرسالة</label>
                <Textarea id="message" name="message" required placeholder="اكتب رسالتك هنا..." rows={5} disabled={status === 'loading'} />
            </div>

            {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md text-sm">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                </div>
            )}

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={status === 'loading'}>
                {status === 'loading' ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الإرسال...
                    </>
                ) : (
                    'إرسال الرسالة'
                )}
            </Button>
        </form>
    );
}
