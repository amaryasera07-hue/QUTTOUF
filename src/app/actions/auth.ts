'use server';

import prisma from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;

    // Check if user is Admin
    const user = await prisma.user.findFirst({
        where: { username: phone }, // Using phone as username for admin login for simplicity
    });

    if (user && user.password === password) {
        await createSession({ id: user.id, role: user.role });
        redirect('/admin/dashboard');
    }

    // Check if user is Member
    const member = await prisma.member.findUnique({
        where: { phone },
    });

    if (member && member.password === password) {
        await createSession({ id: member.id, role: 'MEMBER', name: member.name });
        const callbackUrl = formData.get('callbackUrl') as string;
        redirect(callbackUrl || '/');
    }

    return { error: 'بيانات الدخول غير صحيحة' };
}

export async function register(formData: FormData) {
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const email = formData.get('email') as string;

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return { error: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل، وتحتوي على حرف كبير، حرف صغير، رقم، ورمز خاص.' };
    }

    if (password !== confirmPassword) {
        return { error: 'كلمات المرور غير متطابقة' };
    }

    // Survey Data
    const investmentAmount = formData.get('investmentAmount') as string;
    const preferredLocation = formData.get('preferredLocation') as string;
    const referralSource = formData.get('referralSource') as string;
    const questions = formData.get('questions') as string;

    const existingMember = await prisma.member.findUnique({
        where: { phone },
    });

    if (existingMember) {
        return { error: 'رقم الهاتف مسجل مسبقاً' };
    }

    const member = await prisma.member.create({
        data: {
            name,
            phone,
            password, // Plain text for prototype
            email: email || null,
            investmentAmount: investmentAmount || null,
            preferredLocation: preferredLocation || null,
            referralSource: referralSource || null,
            questions: questions || null,
        },
    });

    await createSession({ id: member.id, role: 'MEMBER', name: member.name });
    redirect('/');
}

export async function logout() {
    await deleteSession();
    redirect('/login');
}

export async function getSession() {
    const { getSession: getAuthSession } = await import('@/lib/auth');
    return await getAuthSession();
}
