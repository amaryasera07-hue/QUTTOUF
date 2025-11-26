'use server';

import prisma from '@/lib/prisma';
import { saveFile } from '@/lib/upload';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export async function getProject(id: string) {
    return await prisma.project.findUnique({
        where: { id },
        include: { news: true },
    });
}

export async function createProject(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const specifications = formData.get('specifications') as string;

    const logoFile = formData.get('logo') as File | null;
    const pdfFile = formData.get('pdf') as File | null;

    const logoUrl = await saveFile(logoFile, 'logos');
    const pdfUrl = await saveFile(pdfFile, 'pdfs');

    const profitData: any = {};
    for (let i = 3; i <= 10; i++) {
        const val = formData.get(`profitYear${i}`);
        if (val) profitData[`profitYear${i}`] = parseFloat(val as string);
    }

    await prisma.project.create({
        data: {
            title,
            description,
            specifications: specifications || '{}',
            logoUrl: logoUrl || '',
            pdfUrl: pdfUrl || '',
            ...profitData,
        },
    });

    revalidatePath('/admin/projects');
    redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const specifications = formData.get('specifications') as string;

    const logoFile = formData.get('logo') as File | null;
    const pdfFile = formData.get('pdf') as File | null;

    const logoUrl = await saveFile(logoFile, 'logos');
    const pdfUrl = await saveFile(pdfFile, 'pdfs');

    const data: any = {
        title,
        description,
        specifications: specifications || '{}',
    };

    for (let i = 3; i <= 10; i++) {
        const val = formData.get(`profitYear${i}`);
        if (val) data[`profitYear${i}`] = parseFloat(val as string);
    }

    if (logoUrl) data.logoUrl = logoUrl;
    if (pdfUrl) data.pdfUrl = pdfUrl;

    await prisma.project.update({
        where: { id },
        data,
    });

    revalidatePath('/admin/projects');
    redirect('/admin/projects');
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id },
    });

    revalidatePath('/admin/projects');
}
