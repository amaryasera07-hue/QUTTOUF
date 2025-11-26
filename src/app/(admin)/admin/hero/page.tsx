import { getHeroSlides, createHeroSlide, deleteHeroSlide } from '@/app/actions/hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';

export default async function AdminHeroPage() {
    const slides = await getHeroSlides();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">إدارة البار العلوي (Hero Slider)</h1>

            <Card>
                <CardHeader>
                    <CardTitle>إضافة شريحة جديدة</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={createHeroSlide} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">العنوان</Label>
                                <Input id="title" name="title" placeholder="عنوان الشريحة" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="order">الترتيب</Label>
                                <Input id="order" name="order" type="number" defaultValue="0" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">الوصف</Label>
                            <Textarea id="description" name="description" placeholder="وصف قصير" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image">الصورة</Label>
                            <Input id="image" name="image" type="file" accept="image/*" required />
                        </div>
                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">إضافة الشريحة</Button>
                    </form>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {slides.map((slide) => (
                    <Card key={slide.id} className="overflow-hidden">
                        <div className="h-48 relative">
                            <img src={slide.imageUrl} alt={slide.title || 'Hero Slide'} className="w-full h-full object-cover" />
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg">{slide.title}</h3>
                                <span className="bg-muted px-2 py-1 rounded text-xs">ترتيب: {slide.order}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{slide.description}</p>
                            <form action={deleteHeroSlide.bind(null, slide.id)}>
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
