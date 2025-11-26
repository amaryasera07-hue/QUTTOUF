'use server';

import prisma from '@/lib/prisma';

export async function getMembers() {
    return await prisma.member.findMany({
        orderBy: { createdAt: 'desc' },
    });
}
