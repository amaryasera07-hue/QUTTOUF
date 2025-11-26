'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getUsers() {
    return await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export async function createUser(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string || 'ADMIN';

    // In a real app, hash the password here
    // const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            username,
            password, // Storing plain text for prototype simplicity as per plan
            role,
        },
    });

    revalidatePath('/admin/users');
    redirect('/admin/users');
}

export async function deleteUser(id: string) {
    await prisma.user.delete({
        where: { id },
    });

    revalidatePath('/admin/users');
}
