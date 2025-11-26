'use server';

import prisma from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

// ----------------------
// LOGIN
// ----------------------
export async function login(formData: FormData): Promise<void> {
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  const callbackUrl = (formData.get('callbackUrl') as string) || '/';

  // 1) التحقق من الـ Admin
  const user = await prisma.user.findFirst({
    where: { username: phone }, // استخدام phone كـ username
  });

  if (user && user.password === password) {
    await createSession({ id: user.id, role: user.role });
    // نجاح -> إلى لوحة التحكم
    redirect('/admin/dashboard');
  }

  // 2) التحقق من الـ Member
  const member = await prisma.member.findUnique({
    where: { phone },
  });

  if (member && member.password === password) {
    await createSession({ id: member.id, role: 'MEMBER', name: member.name });
    // نجاح -> إلى الـ callback أو الصفحة الرئيسية
    redirect(callbackUrl || '/');
  }

  // 3) لو وصلنا هنا يبقى البيانات غلط
  // بدل ما نرجّع object، نعمل redirect مع كود خطأ في الـ URL
  redirect('/login?error=invalid_credentials');
}

// ----------------------
// REGISTER
// ----------------------
export async function register(formData: FormData): Promise<void> {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const email = formData.get('email') as string;

  // Survey Data
  const investmentAmount = formData.get('investmentAmount') as string;
  const preferredLocation = formData.get('preferredLocation') as string;
  const referralSource = formData.get('referralSource') as string;
  const questions = formData.get('questions') as string;

  // 1) تحقق من كلمة المرور
  const passwordRegex =
    /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    // هنا ممكن تستخدم كود خطأ عام وترجمه في صفحة الـ register
    redirect('/register?error=weak_password');
  }

  if (password !== confirmPassword) {
    redirect('/register?error=password_mismatch');
  }

  // 2) تحقق من رقم الهاتف
  const existingMember = await prisma.member.findUnique({
    where: { phone },
  });

  if (existingMember) {
    redirect('/register?error=phone_exists');
  }

  // 3) إنشاء العضو
  const member = await prisma.member.create({
    data: {
      name,
      phone,
      password, // Plain text (للتجارب فقط – في الحقيقي لازم hashing)
      email: email || null,
      investmentAmount: investmentAmount || null,
      preferredLocation: preferredLocation || null,
      referralSource: referralSource || null,
      questions: questions || null,
    },
  });

  // 4) إنشاء Session بعد التسجيل
  await createSession({ id: member.id, role: 'MEMBER', name: member.name });

  // 5) تحويل للصفحة الرئيسية
  redirect('/');
}

// ----------------------
// LOGOUT
// ----------------------
export async function logout(): Promise<void> {
  await deleteSession();
  redirect('/login');
}

// ----------------------
// GET SESSION
// ----------------------
export async function getSession() {
  const { getSession: getAuthSession } = await import('@/lib/auth');
  return await getAuthSession();
}
