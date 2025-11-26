import Link from 'next/link';
import { LayoutDashboard, Briefcase, Newspaper, Settings, LogOut, Leaf, Users, ImageIcon, Mail, Shield, Star } from 'lucide-react';
import { getSettings } from '@/app/actions/settings';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await getSettings();

    return (
        <div className="flex h-screen bg-muted/20 admin-layout">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
                <div className="p-6 border-b border-border flex items-center gap-2">
                    {settings?.logoUrl ? (
                        <img src={settings.logoUrl} alt={settings.siteName || 'Admin'} className="h-8 w-auto" />
                    ) : (
                        <>
                            <Leaf className="h-6 w-6 text-emerald-600" />
                            <h1 className="text-xl font-bold text-emerald-950">{settings?.siteName || 'قطوف أدمن'}</h1>
                        </>
                    )}
                </div>
                <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors">
                        <LayoutDashboard size={20} />
                        <span>لوحة التحكم</span>
                    </Link>
                    <Link href="/admin/features" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors">
                        <Star size={20} />
                        <span>المميزات</span>
                    </Link>
                    <Link href="/admin/projects" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors">
                        <Briefcase size={20} />
                        <span>المشاريع</span>
                    </Link>
                    <Link href="/admin/news" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors">
                        <Newspaper size={20} />
                        <span>الأخبار</span>
                    </Link>
                    <Link href="/admin/members" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors">
                        <Users size={20} />
                        <span>الأعضاء</span>
                    </Link>
                    <Link href="/admin/hero" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors">
                        <ImageIcon size={20} />
                        <span>البار العلوي</span>
                    </Link>
                    <Link href="/admin/team" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors">
                        <Users size={20} />
                        <span>الفريق والشركاء</span>
                    </Link>
                    <Link href="/admin/messages" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors">
                        <Mail size={20} />
                        <span>الرسائل</span>
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors">
                        <Shield size={20} />
                        <span>المستخدمين</span>
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors">
                        <Settings size={20} />
                        <span>الإعدادات</span>
                    </Link>
                </nav>
                <style>{`
                    .admin-layout input, 
                    .admin-layout textarea, 
                    .admin-layout select {
                        background-color: #ffffff !important;
                        border-color: #cbd5e1 !important;
                        color: #0f172a !important;
                        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
                    }
                    .admin-layout input:focus, 
                    .admin-layout textarea:focus, 
                    .admin-layout select:focus {
                        border-color: #10b981 !important;
                        ring: 2px solid #10b981 !important;
                    }
                `}</style>
                <div className="p-4 border-t border-border">
                    <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors w-full">
                        <LogOut size={20} />
                        <span>تسجيل خروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
