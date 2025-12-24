import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
    const supabase = await createClient();
    const { data: artworks } = await supabase
        .from('artworks')
        .select('*')
        .eq('visibility', 'public')
        .order('created_at', { ascending: false });

    // Formatter for IDR
    const formatIDR = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="bg-obsidian min-h-screen overflow-x-hidden">
            {/* Header / Nav */}
            <div className="fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-50 flex justify-between items-center pointer-events-none">
                <Link href="/" className="flex items-center gap-2 md:gap-3 group pointer-events-auto">
                    <Image
                        src="/flower-logo.png"
                        alt="Flower Logo"
                        width={24}
                        height={24}
                        className="w-5 h-5 md:w-6 md:h-6 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="font-serif text-base md:text-xl tracking-widest text-soft-white drop-shadow-lg">
                        CAPSLOCK GALLERY
                    </span>
                    <span className="block h-[1px] w-0 bg-soft-white transition-all duration-500 group-hover:w-full"></span>
                </Link>

                <Link href="/about" className="font-serif text-sm md:text-base tracking-widest text-soft-white/90 hover:text-gold transition-all duration-500 hover:tracking-[0.25em] border-b border-transparent hover:border-gold pb-1 pointer-events-auto">
                    ABOUT
                </Link>
            </div>

            <div className="flex flex-col">
                {artworks?.map((art, index) => (
                    <section key={art.id} className="relative w-full h-screen flex items-center justify-center overflow-hidden snap-start">
                        {/* Background Image */}
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                src={art.media_url}
                                alt={art.title}
                                fill
                                className="object-cover opacity-60 transition-opacity duration-1000 hover:opacity-100"
                                priority={index === 0}
                                quality={90}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-90" />
                        </div>

                        {/* Content Overlay - Always visible on mobile, hover on desktop */}
                        <Link href={`/art/${art.slug}`} className="absolute inset-0 z-20 group" data-hover="VIEW">
                            <div className="absolute bottom-8 left-4 right-4 md:bottom-24 md:left-24 md:right-auto transition-all duration-700 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-10 md:group-hover:translate-y-0">
                                <h2 className="font-serif text-2xl md:text-4xl lg:text-7xl text-soft-white mb-2 tracking-wide break-words">
                                    {art.title}
                                </h2>
                                <p className="font-serif text-base md:text-lg lg:text-2xl text-gold-muted italic">
                                    {art.status === 'sold' ? 'SOLD' : formatIDR(art.price)}
                                </p>
                                <div className="mt-4 md:mt-8 flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-sans tracking-widest text-soft-gray/50 uppercase">
                                    <span>{new Date(art.created_at).getFullYear()}</span>
                                    <span>•</span>
                                    <span className="hidden sm:inline">Generative Art</span>
                                    <span className="sm:hidden">Gen Art</span>
                                </div>
                            </div>
                        </Link>
                    </section>
                ))}

                {(!artworks || artworks.length === 0) && (
                    <div className="h-screen flex items-center justify-center text-soft-gray px-4 text-center">
                        No public artworks in the vault.
                    </div>
                )}
            </div>

            {/* Footer / End of Scroll */}
            <footer className="h-[70vh] flex flex-col items-center justify-center bg-obsidian text-soft-gray/50 px-4">
                <Image
                    src="/flower-logo.png"
                    alt="Flower Logo"
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain mb-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
                <p className="font-serif text-xl md:text-2xl mb-4 italic text-center">End of Collection</p>
                <div className="w-12 h-[1px] bg-soft-white/10 mb-8" />
                <p className="font-sans text-[10px] md:text-xs tracking-widest text-center">© 2025 CAPSLOCK GALLERY</p>
            </footer>
        </div>
    );
}
