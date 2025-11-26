'use server';

import prisma from '@/lib/prisma';
import { saveFile } from '@/lib/upload';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getTeamMembers() {
    return await prisma.teamMember.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export async function createTeamMember(formData: FormData) {
    const name = formData.get('name') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const bio = formData.get('bio') as string;
    const type = formData.get('type') as string; // TEAM or PARTNER

    const image = formData.get('image') as File | null;
    const video = formData.get('video') as File | null;

    let imageUrl = '';
    let videoUrl = '';

    if (image && image instanceof File && image.size > 0) {
        imageUrl = await saveFile(image, 'team');
    }

    if (video && video instanceof File && video.size > 0) {
        videoUrl = await saveFile(video, 'team-videos');
    }

    try {
        await prisma.teamMember.create({
            data: {
                name,
                jobTitle,
                bio,
                type: type || 'TEAM',
                imageUrl,
                videoUrl,
            },
        });

        revalidatePath('/admin/team');
        revalidatePath('/team');
    } catch (error) {
        console.error('Error creating team member:', error);
        // In a real app, we should return the error to the client
        throw error;
    }

    redirect('/admin/team');
}

export async function deleteTeamMember(id: string) {
    await prisma.teamMember.delete({
        where: { id },
    });

    revalidatePath('/admin/team');
    revalidatePath('/team');
}
