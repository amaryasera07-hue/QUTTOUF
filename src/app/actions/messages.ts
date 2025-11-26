'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getContactMessages() {
    return await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export async function createContactMessage(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    try {
        await prisma.contactMessage.create({
            data: {
                name,
                email,
                phone,
                whatsapp,
                subject,
                message,
            },
        });

        revalidatePath('/admin/messages');
        return { success: true };
    } catch (error) {
        console.error('Error creating contact message:', error);
        throw new Error('Failed to create message');
    }
}

export async function deleteContactMessage(id: string) {
    await prisma.contactMessage.delete({
        where: { id },
    });

    revalidatePath('/admin/messages');
}
