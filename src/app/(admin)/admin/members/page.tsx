import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMembers } from '@/app/actions/members';
import { User, Phone, Mail, MapPin, DollarSign, HelpCircle } from 'lucide-react';

export default async function MembersPage() {
    const members = await getMembers();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">إدارة الأعضاء</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                    <Card key={member.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {member.name}
                            </CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-muted-foreground" />
                                <span dir="ltr">{member.phone}</span>
                            </div>
                            {member.email && (
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-muted-foreground" />
                                    <span>{member.email}</span>
                                </div>
                            )}
                            {member.preferredLocation && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-muted-foreground" />
                                    <span>{member.preferredLocation}</span>
                                </div>
                            )}
                            {member.investmentAmount && (
                                <div className="flex items-center gap-2">
                                    <DollarSign size={14} className="text-muted-foreground" />
                                    <span>{member.investmentAmount}</span>
                                </div>
                            )}
                            {member.questions && (
                                <div className="flex items-start gap-2 mt-2 pt-2 border-t">
                                    <HelpCircle size={14} className="text-muted-foreground mt-1" />
                                    <p className="text-xs text-muted-foreground line-clamp-3">
                                        {member.questions}
                                    </p>
                                </div>
                            )}
                            <div className="pt-2 text-xs text-muted-foreground text-left">
                                {new Date(member.createdAt).toLocaleDateString('ar-SA')}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {members.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/30 rounded-lg">
                        لا يوجد أعضاء مسجلين حالياً.
                    </div>
                )}
            </div>
        </div>
    );
}
