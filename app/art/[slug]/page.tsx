import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArtworkDetailClient } from "@/components/artwork-detail-client";

export default async function ArtworkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: artwork } = await supabase
        .from('artworks')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!artwork) notFound();

    const formatIDR = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-obsidian text-soft-white relative overflow-hidden">
            {/* Navigation */}
            <div className="fixed top-8 left-8 z-50 mix-blend-difference">
                <Link href="/gallery" className="flex items-center gap-2 group" data-hover="BACK">
                    <ArrowLeft className="w-4 h-4 text-soft-white transition-transform group-hover:-translate-x-1" />
                    <span className="font-sans text-xs tracking-[0.2em] group-hover:text-gold transition-colors">BACK TO ARCHIVE</span>
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row h-screen">
                {/* Image Section */}
                <div className="w-full lg:w-2/3 h-[60vh] lg:h-full relative bg-charcoal">
                    <Image
                        src={artwork.media_url}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-1/3 h-[40vh] lg:h-full flex flex-col justify-center px-8 lg:px-16 space-y-8 bg-obsidian">
                    <div>
                        <h1 className="font-serif text-4xl lg:text-6xl mb-2 text-soft-white">{artwork.title}</h1>
                        <p className="font-serif text-xl lg:text-2xl text-gold-muted italic">
                            {artwork.status === 'sold' ? 'SOLD' : formatIDR(artwork.price)}
                        </p>
                    </div>

                    <div className="space-y-4 font-sans text-xs tracking-widest text-soft-gray uppercase">
                        <p>• Generative Artwork</p>
                        <p>• Limited Edition</p>
                        <p>• {new Date(artwork.created_at).getFullYear()}</p>
                    </div>

                    <div className="pt-8">
                        <ArtworkDetailClient artwork={artwork} />
                    </div>
                </div>
            </div>
        </div>
    );
}
