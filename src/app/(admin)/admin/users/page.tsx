import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUsers, deleteUser } from '@/app/actions/users';
import { Plus, Trash2, User } from 'lucide-react';

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">إدارة المستخدمين</h1>
                <Link href="/admin/users/new">
                    <Button className="flex items-center gap-2">
                        <Plus size={16} />
                        إضافة مستخدم
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <Card key={user.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {user.username}
                            </CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{user.role}</div>
                            <p className="text-xs text-muted-foreground">
                                {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                            </p>
                            <div className="mt-4 flex justify-end">
                                <form action={deleteUser.bind(null, user.id)}>
                                    <Button variant="destructive" size="sm" className="flex items-center gap-2">
                                        <Trash2 size={14} />
                                        حذف
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {users.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/30 rounded-lg">
                        لا يوجد مستخدمين حالياً.
                    </div>
                )}
            </div>
        </div>
    );
}
