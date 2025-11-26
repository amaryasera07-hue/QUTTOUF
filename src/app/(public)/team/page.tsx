import { getTeamMembers } from '@/app/actions/team';
import { Card, CardContent } from '@/components/ui/card';
import { Video } from 'lucide-react';
import { VideoModal } from '@/components/features/VideoModal';
import { Carousel } from '@/components/features/Carousel';

export default async function TeamPage() {
    const members = await getTeamMembers();
    const team = members.filter(m => m.type === 'TEAM');

    return (
        <div className="container py-12 md:py-24 space-y-24">
            {/* Team Section */}
            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-emerald-950">فريق العمل</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        نخبة من الخبراء والمتخصصين يقودون مسيرة النجاح والنمو المستدام.
                    </p>
                </div>

                <Carousel>
                    {team.map((member) => (
                        <Card key={member.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
                            <div className="aspect-[4/5] relative overflow-hidden">
                                {member.imageUrl ? (
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                                        لا توجد صورة
                                    </div>
                                )}
                                {member.videoUrl && (
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <VideoModal
                                            videoUrl={member.videoUrl}
                                            trigger={
                                                <button className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white hover:bg-white/40 transition-colors">
                                                    <Video size={32} />
                                                </button>
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                            <CardContent className="text-center p-6 bg-gradient-to-b from-white to-emerald-50/30">
                                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                                <p className="text-emerald-600 font-medium mb-3">{member.jobTitle}</p>
                                {member.bio && (
                                    <p className="text-sm text-muted-foreground line-clamp-3 italic">
                                        "{member.bio}"
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Carousel>

                {team.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        سيتم إضافة أعضاء الفريق قريباً.
                    </div>
                )}
            </section>
        </div>
    );
}
