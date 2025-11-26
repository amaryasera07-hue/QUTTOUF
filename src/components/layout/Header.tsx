import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, User, LogOut, Globe } from 'lucide-react';
import { getSession, logout } from '@/app/actions/auth';
import { getSettings } from '@/app/actions/settings';

export async function Header() {
    const session = await getSession();
    const settings = await getSettings();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 mr-8">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-950">
                        {settings?.logoUrl ? (
                            <img src={settings.logoUrl} alt={settings.siteName || 'Qouttouf'} className="h-10 w-auto" />
                        ) : (
                            <img src="/logo.png" alt={settings?.siteName || 'قطوف'} className="h-12 w-auto" />
                        )}
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-emerald-600">الرئيسية</Link>
                    <Link href="/projects" className="transition-colors hover:text-emerald-600">المشاريع</Link>
                    <Link href="/news" className="transition-colors hover:text-emerald-600">الأخبار</Link>
                    <Link href="/partners" className="transition-colors hover:text-emerald-600">شركاء النجاح</Link>
                    <Link href="/team" className="transition-colors hover:text-emerald-600">فريق العمل</Link>
                    <Link href="/contact" className="transition-colors hover:text-emerald-600">اتصل بنا</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" title="English">
                        <Globe size={20} />
                        <span className="sr-only">Switch Language</span>
                    </Button>

                    {session ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground hidden sm:inline-block">
                                مرحباً، {session.user.name || 'المستخدم'}
                            </span>
                            {session.user.role === 'ADMIN' && (
                                <Link href="/admin/dashboard">
                                    <Button variant="outline" size="sm">لوحة التحكم</Button>
                                </Link>
                            )}
                            <form action={logout}>
                                <Button variant="ghost" size="icon" title="تسجيل خروج">
                                    <LogOut size={20} />
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">دخول</Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">سجل الآن</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
