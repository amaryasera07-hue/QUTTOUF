'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getNews() {
    return await prisma.news.findMany({
        orderBy: { publishedAt: 'desc' },
        include: { project: true },
    });
}

export async function getNewsItem(id: string) {
    return await prisma.news.findUnique({
        where: { id },
    });
}

import { saveFile } from '@/lib/upload';

export async function createNews(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const projectId = formData.get('projectId') as string;

    const images = formData.getAll('images') as File[];
    const imageUrls: string[] = [];

    for (const image of images) {
        if (image.size > 0) {
            const url = await saveFile(image, 'news');
            imageUrls.push(url);
        }
    }

    await prisma.news.create({
        data: {
            title,
            content,
            imageUrls: JSON.stringify(imageUrls),
            projectId: projectId || null,
        },
    });

    revalidatePath('/admin/news');
    redirect('/admin/news');
}

export async function updateNews(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const projectId = formData.get('projectId') as string;

    const images = formData.getAll('images') as File[];
    let imageUrls: string[] = [];

    // Get existing images if any (this logic is simplified, ideally we'd handle keeping existing vs replacing)
    // For now, if new images are uploaded, we append them. 
    // To properly handle editing, we might need a more complex UI to remove specific images.
    // Let's fetch existing news to get current images.
    const existingNews = await prisma.news.findUnique({ where: { id } });
    if (existingNews?.imageUrls) {
        try {
            imageUrls = JSON.parse(existingNews.imageUrls);
        } catch (e) {
            imageUrls = [];
        }
    }

    for (const image of images) {
        if (image.size > 0) {
            const url = await saveFile(image, 'news');
            imageUrls.push(url);
        }
    }

    await prisma.news.update({
        where: { id },
        data: {
            title,
            content,
            imageUrls: JSON.stringify(imageUrls),
            projectId: projectId || null,
        },
    });

    revalidatePath('/admin/news');
    redirect('/admin/news');
}

export async function deleteNews(id: string) {
    await prisma.news.delete({
        where: { id },
    });

    revalidatePath('/admin/news');
}
