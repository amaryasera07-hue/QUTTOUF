import { getTeamMembers, createTeamMember, deleteTeamMember } from '@/app/actions/team';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Video } from 'lucide-react';

export default async function AdminTeamPage() {
    const members = await getTeamMembers();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">إدارة فريق العمل وشركاء النجاح</h1>

            <Card>
                <CardHeader>
                    <CardTitle>إضافة عضو جديد</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={createTeamMember} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">الاسم</Label>
                                <Input id="name" name="name" required placeholder="اسم العضو" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="jobTitle">المسمى الوظيفي</Label>
                                <Input id="jobTitle" name="jobTitle" placeholder="مثال: المدير التنفيذي" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">نبذة تعريفية (اختياري)</Label>
                            <textarea
                                id="bio"
                                name="bio"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="اكتب نبذة مختصرة..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">القسم</Label>
                            <select
                                id="type"
                                name="type"
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="TEAM">فريق العمل</option>
                                <option value="PARTNER">شركاء النجاح</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="image">الصورة الشخصية</Label>
                                <Input id="image" name="image" type="file" accept="image/*" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="video">فيديو تعريفي (اختياري)</Label>
                                <Input id="video" name="video" type="file" accept="video/*" />
                            </div>
                        </div>

                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">إضافة</Button>
                    </form>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                    <Card key={member.id} className="overflow-hidden">
                        <div className="h-48 relative bg-muted flex items-center justify-center">
                            {member.imageUrl ? (
                                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-muted-foreground">لا توجد صورة</div>
                            )}
                            {member.videoUrl && (
                                <div className="absolute top-2 right-2 bg-black/50 p-1 rounded text-white">
                                    <Video size={16} />
                                </div>
                            )}
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg">{member.name}</h3>
                                    <p className="text-sm text-muted-foreground">{member.jobTitle}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${member.type === 'TEAM' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                                    {member.type === 'TEAM' ? 'فريق العمل' : 'شريك نجاح'}
                                </span>
                            </div>
                            <form action={deleteTeamMember.bind(null, member.id)} className="mt-4">
                                <Button variant="destructive" size="sm" className="w-full gap-2">
                                    <Trash2 size={16} /> حذف
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
