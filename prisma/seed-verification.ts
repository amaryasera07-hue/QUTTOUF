import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 1. Update Settings
    const settings = await prisma.settings.findFirst();
    if (settings) {
        await prisma.settings.update({
            where: { id: settings.id },
            data: {
                whatsappNumber: '966501234567',
                phoneNumber: '+966 50 123 4567',
                siteName: 'قطوف للاستثمار',
                workingHours: 'الأحد - الخميس: 8:00 ص - 4:00 م',
                holidays: 'الجمعة فقط',
                facebookUrl: 'https://facebook.com/qouttouf',
                twitterUrl: 'https://twitter.com/qouttouf',
                instagramUrl: 'https://instagram.com/qouttouf',
                linkedinUrl: 'https://linkedin.com/company/qouttouf',
            },
        });
        console.log('Settings updated with WhatsApp, Hours, and Socials.');
    } else {
        await prisma.settings.create({
            data: {
                whatsappNumber: '966501234567',
                phoneNumber: '+966 50 123 4567',
                siteName: 'قطوف للاستثمار',
                workingHours: 'الأحد - الخميس: 8:00 ص - 4:00 م',
                holidays: 'الجمعة فقط',
                facebookUrl: 'https://facebook.com/qouttouf',
                twitterUrl: 'https://twitter.com/qouttouf',
                instagramUrl: 'https://instagram.com/qouttouf',
                linkedinUrl: 'https://linkedin.com/company/qouttouf',
            },
        });
        console.log('Settings created with WhatsApp, Hours, and Socials.');
    }

    // 2. Create News Item
    const news = await prisma.news.create({
        data: {
            title: 'تجربة التصميم الجديد للأخبار',
            content: 'هذا خبر تجريبي لاختبار التصميم الجديد لصفحة التفاصيل. يجب أن يظهر التاريخ في الأعلى، ثم العنوان بخط كبير، ثم معرض الصور، وأخيراً المحتوى.',
            imageUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1500937386664-56d1dfef38ec?auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1499529112042-955dbf0ded88?auto=format&fit=crop&w=1000&q=80'
            ]),
            publishedAt: new Date(),
        },
    });
    console.log(`News item created with ID: ${news.id}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
