'use server';

import prisma from '@/lib/prisma';
import { saveFile } from '@/lib/upload';
import { revalidatePath } from 'next/cache';

export async function getSettings() {
    return await prisma.settings.findFirst();
}

export async function updateSettings(formData: FormData) {
    const phoneNumber = formData.get('phoneNumber') as string;
    const address = formData.get('address') as string;
    const facebookUrl = formData.get('facebookUrl') as string;
    const twitterUrl = formData.get('twitterUrl') as string;
    const instagramUrl = formData.get('instagramUrl') as string;
    const linkedinUrl = formData.get('linkedinUrl') as string;
    const whatsappNumber = formData.get('whatsappNumber') as string;
    const workingHours = formData.get('workingHours') as string;
    const workStartTime = formData.get('workStartTime') as string;
    const workEndTime = formData.get('workEndTime') as string;
    const holidays = formData.get('holidays') as string;
    const siteName = formData.get('siteName') as string;

    const logo = formData.get('logo') as File | null;
    let logoUrl = undefined;

    if (logo && logo instanceof File && logo.size > 0) {
        logoUrl = await saveFile(logo, 'settings');
    }

    const currentSettings = await getSettings();

    try {
        if (currentSettings) {
            await prisma.settings.update({
                where: { id: currentSettings.id },
                data: {
                    phoneNumber,
                    address,
                    facebookUrl,
                    twitterUrl,
                    instagramUrl,
                    linkedinUrl,
                    whatsappNumber,
                    workingHours,
                    workStartTime,
                    workEndTime,
                    holidays,
                    siteName,
                    ...(logoUrl && { logoUrl }),
                },
            });
        } else {
            await prisma.settings.create({
                data: {
                    phoneNumber,
                    address,
                    facebookUrl,
                    twitterUrl,
                    instagramUrl,
                    linkedinUrl,
                    whatsappNumber,
                    workingHours,
                    workStartTime,
                    workEndTime,
                    holidays,
                    siteName,
                    logoUrl,
                },
            });
        }

        revalidatePath('/');
        revalidatePath('/admin/settings');
        return { success: true };
    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, error: 'Failed to update settings' };
    }
}
