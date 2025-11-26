'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/app/actions/auth';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '';

    return (
        <form action={login} className="space-y-4">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف / اسم المستخدم</Label>
                <Input id="phone" name="phone" required placeholder="05xxxxxxxx" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input id="password" name="password" type="password" required />
            </div>

            <div className="pt-4">
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">دخول</Button>
            </div>

            <div className="text-center text-sm text-muted-foreground mt-4">
                ليس لديك حساب؟ <Link href="/register" className="text-emerald-600 hover:underline">سجل الآن</Link>
            </div>
        </form>
    );
}

export default function LoginPage() {
    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div>Loading...</div>}>
                        <LoginForm />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}
