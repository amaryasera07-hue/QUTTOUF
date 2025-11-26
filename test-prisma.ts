import { PrismaClient } from '@prisma/client';

async function main() {
    console.log('Imported PrismaClient:', PrismaClient);
    try {
        const prisma = new PrismaClient();
        console.log('Instantiated PrismaClient');
        await prisma.$connect();
        console.log('Connected to database');
        const projects = await prisma.project.findMany();
        console.log('Projects:', projects);
        await prisma.$disconnect();
    } catch (e) {
        console.error('Error:', e);
    }
}

main();
