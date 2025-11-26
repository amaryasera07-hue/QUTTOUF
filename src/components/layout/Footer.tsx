import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Leaf, Linkedin, MessageCircle } from 'lucide-react';
import { getSettings } from '@/app/actions/settings';
import { WorkingHoursStatus } from '@/components/features/WorkingHoursStatus';

export default async function Footer() {
    const settings = await getSettings();

    return (
        <footer className="bg-emerald-950 text-emerald-50 py-12">
            <div className="container grid gap-8 md:grid-cols-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        {settings?.logoUrl ? (
                            <img src={settings.logoUrl} alt={settings.siteName || 'Qouttouf'} className="h-12 w-auto brightness-0 invert" />
                        ) : (
                            <>
                                <Leaf className="h-6 w-6" />
                                <span>{settings?.siteName || 'قطوف'}</span>
                            </>
                        )}
                    </div>
                    <p className="text-emerald-200/80 text-sm">
                        شريكك الموثوق في الاستثمار الزراعي المستدام. نزرع المستقبل معاً.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">روابط سريعة</h3>
                    <ul className="space-y-2 text-sm text-emerald-200/80">
                        <li><Link href="/projects" className="hover:text-white transition-colors">المشاريع</Link></li>
                        <li><Link href="/news" className="hover:text-white transition-colors">الأخبار</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors">من نحن</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">اتصل بنا</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">تواصل معنا</h3>
                    <ul className="space-y-2 text-sm text-emerald-200/80">
                        <li className="flex items-center gap-2"><MapPin size={16} /> {settings?.address || 'الرياض، المملكة العربية السعودية'}</li>
                        <li className="flex items-center gap-2 flex-wrap">
                            <Phone size={16} />
                            <span dir="ltr">{settings?.phoneNumber || '+966 50 000 0000'}</span>
                            <WorkingHoursStatus
                                workStartTime={settings?.workStartTime}
                                workEndTime={settings?.workEndTime}
                                mode="text"
                            />
                        </li>
                        {settings?.whatsappNumber && (
                            <li className="flex items-center gap-2 flex-wrap">
                                <MessageCircle size={16} />
                                <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" dir="ltr">
                                    {settings.whatsappNumber}
                                </a>
                                <WorkingHoursStatus
                                    workStartTime={settings?.workStartTime}
                                    workEndTime={settings?.workEndTime}
                                    mode="text"
                                />
                            </li>
                        )}
                        <li className="flex items-center gap-2"><Mail size={16} /> info@qouttouf.com</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">تابعنا</h3>
                    <div className="flex gap-4">
                        {settings?.facebookUrl && <Link href={settings.facebookUrl} className="hover:text-white transition-colors"><Facebook size={20} /></Link>}
                        {settings?.twitterUrl && <Link href={settings.twitterUrl} className="hover:text-white transition-colors"><Twitter size={20} /></Link>}
                        {settings?.instagramUrl && <Link href={settings.instagramUrl} className="hover:text-white transition-colors"><Instagram size={20} /></Link>}
                        {settings?.linkedinUrl && <Link href={settings.linkedinUrl} className="hover:text-white transition-colors"><Linkedin size={20} /></Link>}
                    </div>
                </div>
            </div>
            <div className="container mt-12 pt-8 border-t border-emerald-800 text-center text-sm text-emerald-200/60">
                © {new Date().getFullYear()} {settings?.siteName || 'قطوف للاستثمار الزراعي'}. جميع الحقوق محفوظة.
            </div>
        </footer>
    );
}
