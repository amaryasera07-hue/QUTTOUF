'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getFeatures() {
    try {
        const features = await prisma.feature.findMany({
            orderBy: { createdAt: 'asc' },
        });
        return features;
    } catch (error) {
        console.error('Error fetching features:', error);
        return [];
    }
}

export async function getFeature(id: string) {
    try {
        const feature = await prisma.feature.findUnique({
            where: { id },
        });
        return feature;
    } catch (error) {
        console.error('Error fetching feature:', error);
        return null;
    }
}

export async function createFeature(data: FormData) {
    try {
        console.log('Creating feature with data:', Object.fromEntries(data));
        const title = data.get('title') as string;
        const description = data.get('description') as string;
        const icon = data.get('icon') as string;
        const image = data.get('image') as string;
        const content = data.get('content') as string;

        const result = await prisma.feature.create({
            data: {
                title,
                description,
                icon,
                image,
                content,
            },
        });
        console.log('Feature created:', result);

        revalidatePath('/');
        revalidatePath('/admin/features');
        return { success: true };
    } catch (error) {
        console.error('Error creating feature:', error);
        return { success: false, error: 'Failed to create feature' };
    }
}

export async function updateFeature(id: string, data: FormData) {
    try {
        const title = data.get('title') as string;
        const description = data.get('description') as string;
        const icon = data.get('icon') as string;
        const image = data.get('image') as string;
        const content = data.get('content') as string;

        await prisma.feature.update({
            where: { id },
            data: {
                title,
                description,
                icon,
                image,
                content,
            },
        });

        revalidatePath('/');
        revalidatePath('/admin/features');
        revalidatePath(`/features/${id}`);
        return { success: true };
    } catch (error) {
        console.error('Error updating feature:', error);
        return { success: false, error: 'Failed to update feature' };
    }
}

export async function deleteFeature(id: string) {
    try {
        await prisma.feature.delete({
            where: { id },
        });

        revalidatePath('/');
        revalidatePath('/admin/features');
        return { success: true };
    } catch (error) {
        console.error('Error deleting feature:', error);
        return { success: false, error: 'Failed to delete feature' };
    }
}
