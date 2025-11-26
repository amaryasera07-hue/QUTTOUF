import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { getSettings } from '@/app/actions/settings';
import { ContactForm } from '@/components/features/ContactForm';
import { WorkingHoursStatus } from '@/components/features/WorkingHoursStatus';

export default async function ContactPage() {
    const settings = await getSettings();

    return (
        <div className="container py-12 md:py-24">
            <div className="flex flex-col items-center text-center mb-12 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-emerald-950">تواصل معنا</h1>
                <p className="text-muted-foreground max-w-2xl">
                    نحن هنا للإجابة على استفساراتك ومساعدتك في بدء رحلتك الاستثمارية معنا.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Contact Information */}
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>معلومات الاتصال</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">العنوان</h3>
                                    <p className="text-muted-foreground">{settings?.address || 'الرياض، المملكة العربية السعودية'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">الهاتف</h3>
                                    <div className="flex items-center gap-2">
                                        <p className="text-muted-foreground" dir="ltr">{settings?.phoneNumber || '+966 50 000 0000'}</p>
                                        <WorkingHoursStatus
                                            workStartTime={settings?.workStartTime}
                                            workEndTime={settings?.workEndTime}
                                            mode="text"
                                        />
                                    </div>
                                </div>
                            </div>
                            {settings?.whatsappNumber && (
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                                        <MessageCircle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">الواتساب</h3>
                                        <div className="flex items-center gap-2">
                                            <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-emerald-600 hover:underline" dir="ltr">
                                                {settings.whatsappNumber}
                                            </a>
                                            <WorkingHoursStatus
                                                workStartTime={settings?.workStartTime}
                                                workEndTime={settings?.workEndTime}
                                                mode="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">البريد الإلكتروني</h3>
                                    <p className="text-muted-foreground">info@qouttouf.com</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>ساعات العمل</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex justify-between">
                                    <span>ساعات العمل</span>
                                    <span>{settings?.workingHours || 'الأحد - الخميس: 9:00 ص - 5:00 م'}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>أيام العطلة</span>
                                    <span>{settings?.holidays || 'الجمعة والسبت'}</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>أرسل لنا رسالة</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ContactForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
