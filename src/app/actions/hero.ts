'use server';

import prisma from '@/lib/prisma';
import { saveFile } from '@/lib/upload';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getHeroSlides() {
    return await prisma.heroSlide.findMany({
        orderBy: { order: 'asc' },
    });
}

export async function createHeroSlide(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const order = parseInt(formData.get('order') as string) || 0;
    const image = formData.get('image') as File;

    if (!image || image.size === 0) {
        throw new Error('Image is required');
    }

    const imageUrl = await saveFile(image, 'hero');

    await prisma.heroSlide.create({
        data: {
            title,
            description,
            order,
            imageUrl,
        },
    });

    revalidatePath('/');
    revalidatePath('/admin/hero');
    redirect('/admin/hero');
}

export async function updateHeroSlide(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const order = parseInt(formData.get('order') as string) || 0;
    const image = formData.get('image') as File | null;

    const data: any = {
        title,
        description,
        order,
    };

    if (image && image.size > 0) {
        data.imageUrl = await saveFile(image, 'hero');
    }

    await prisma.heroSlide.update({
        where: { id },
        data,
    });

    revalidatePath('/');
    revalidatePath('/admin/hero');
    redirect('/admin/hero');
}

export async function deleteHeroSlide(id: string) {
    await prisma.heroSlide.delete({
        where: { id },
    });

    revalidatePath('/');
    revalidatePath('/admin/hero');
}
