import { getContactMessages, deleteContactMessage } from '@/app/actions/messages';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Mail, User, Calendar, Phone, MessageCircle } from 'lucide-react';

export default async function AdminMessagesPage() {
    const messages = await getContactMessages();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">رسائل الاتصال</h1>

            <div className="space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-lg">
                        لا توجد رسائل جديدة.
                    </div>
                ) : (
                    messages.map((msg) => (
                        <Card key={msg.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-bold">{msg.subject || 'بدون عنوان'}</CardTitle>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Calendar size={14} />
                                    {new Date(msg.createdAt).toLocaleDateString('ar-SA')}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row gap-4 mb-4 text-sm text-muted-foreground flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <User size={16} /> {msg.name}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} /> {msg.email}
                                    </div>
                                    {msg.phone && (
                                        <div className="flex items-center gap-2">
                                            <Phone size={16} /> <a href={`tel:${msg.phone}`} className="hover:text-emerald-600 hover:underline" dir="ltr">{msg.phone}</a>
                                        </div>
                                    )}
                                    {msg.whatsapp && (
                                        <div className="flex items-center gap-2">
                                            <MessageCircle size={16} className="text-green-500" />
                                            <a href={`https://wa.me/${msg.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-600 hover:underline" dir="ltr">
                                                {msg.whatsapp}
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-muted/50 p-4 rounded-md mb-4 text-sm whitespace-pre-wrap">
                                    {msg.message}
                                </div>
                                <form action={deleteContactMessage.bind(null, msg.id)} className="flex justify-end">
                                    <Button variant="destructive" size="sm" className="gap-2">
                                        <Trash2 size={16} /> حذف الرسالة
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
