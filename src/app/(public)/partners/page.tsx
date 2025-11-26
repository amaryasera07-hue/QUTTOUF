import { getTeamMembers } from '@/app/actions/team';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Video } from 'lucide-react';
import { Carousel } from '@/components/features/Carousel';
import { VideoModal } from '@/components/features/VideoModal';

export default async function PartnersPage() {
    const members = await getTeamMembers();
    const partners = members.filter((m: any) => m.type === 'PARTNER');

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
            <div className="container py-12 md:py-24 space-y-16">
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-4">
                        <Leaf className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-emerald-950">شركاء النجاح</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        نعتز بشراكاتنا الاستراتيجية مع نخبة من المؤسسات والشركات التي تشاركنا الرؤية والطموح نحو مستقبل زراعي مستدام.
                    </p>
                </div>

                <Carousel>
                    {partners.map((partner: any) => (
                        <Card key={partner.id} className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-emerald-100 bg-white/80 backdrop-blur-sm h-full">
                            <div className="aspect-square relative p-8 flex items-center justify-center bg-white group-hover:bg-emerald-50/50 transition-colors duration-500">
                                {partner.imageUrl ? (
                                    <img
                                        src={partner.imageUrl}
                                        alt={partner.name}
                                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="text-muted-foreground font-bold text-xl">{partner.name}</div>
                                )}
                                {partner.videoUrl && (
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <VideoModal
                                            videoUrl={partner.videoUrl}
                                            trigger={
                                                <button className="bg-white/20 backdrop-blur-md p-4 rounded-full text-emerald-600 hover:bg-white/40 transition-colors">
                                                    <Video size={32} />
                                                </button>
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                            <CardContent className="text-center p-6 border-t border-emerald-50">
                                <h3 className="font-bold text-lg text-emerald-950 mb-2">{partner.name}</h3>
                                {partner.jobTitle && (
                                    <p className="text-sm text-emerald-600 font-medium mb-2">{partner.jobTitle}</p>
                                )}
                                {partner.bio && (
                                    <p className="text-xs text-muted-foreground line-clamp-2 italic">
                                        "{partner.bio}"
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Carousel>

                {partners.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-emerald-200">
                        <p className="text-muted-foreground text-lg">سيتم إضافة شركاء النجاح قريباً.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
