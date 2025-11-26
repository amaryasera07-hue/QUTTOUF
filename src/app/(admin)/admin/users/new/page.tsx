import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUser } from '@/app/actions/users';

export default function NewUserPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">إضافة مستخدم جديد</h1>

            <Card>
                <CardHeader>
                    <CardTitle>بيانات المستخدم</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={createUser} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">اسم المستخدم</Label>
                            <Input id="username" name="username" required placeholder="admin" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">كلمة المرور</Label>
                            <Input id="password" name="password" type="password" required placeholder="******" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">الصلاحية</Label>
                            <select
                                id="role"
                                name="role"
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="ADMIN">مدير (Admin)</option>
                                <option value="EDITOR">محرر (Editor)</option>
                            </select>
                        </div>
                        <div className="pt-4">
                            <Button type="submit">إنشاء المستخدم</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
