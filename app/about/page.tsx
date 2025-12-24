import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-obsidian text-soft-white selection:bg-gold selection:text-black font-sans">
            {/* Nav */}
            <div className="fixed top-8 left-8 z-50">
                <Link href="/gallery" className="flex items-center gap-3 group text-soft-white/90 hover:text-gold transition-all duration-500" data-hover="BACK">
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span className="font-serif text-sm md:text-base tracking-[0.2em] uppercase border-b border-transparent group-hover:border-gold pb-1">BACK TO GALLERY</span>
                </Link>
            </div>

            <main className="min-h-screen flex items-center justify-center py-32 px-8">
                <div className="max-w-xl w-full space-y-24 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>

                    {/* Header */}
                    <header className="space-y-12">
                        <h1 className="font-serif text-2xl text-soft-white tracking-wide">
                            ABOUT CAPSLOCK GALLERY
                        </h1>
                        <p className="font-sans text-xs tracking-widest text-soft-gray/60 uppercase">by @Dendy__F</p>
                        <div className="space-y-6 font-sans text-lg md:text-xl font-light text-soft-white/80 leading-relaxed">
                            <p>
                                CAPSLOCK GALLERY is a curated space<br />
                                for generative works that exist<br />
                                as singular digital artifacts.
                            </p>
                            <p>
                                Each piece is presented<br />
                                with intention, restraint,<br />
                                and long-term value in mind.
                            </p>
                        </div>
                    </header>

                    {/* What Collectors Receive */}
                    <section className="space-y-8">
                        <h2 className="font-serif text-xl text-soft-white italic border-b border-soft-white/10 pb-4">
                            WHAT COLLECTORS RECEIVE
                        </h2>

                        <p className="font-sans text-sm text-soft-white/60 leading-relaxed">
                            Each artwork collected through CAPSLOCK GALLERY<br />
                            is delivered personally by the artist<br />
                            to ensure authenticity, security, and exclusivity.
                        </p>

                        <ul className="space-y-8 font-sans text-sm text-soft-white/90 font-light">
                            <li className="group">
                                <p className="mb-1 text-base">High-resolution generative artwork</p>
                                <span className="text-soft-gray block text-xs">(up to 8K or 12K, depending on the piece)</span>
                            </li>
                            <li className="group">
                                <p className="mb-1 text-base">Original final output</p>
                                <span className="text-soft-gray block text-xs">(not a screenshot, not compressed)</span>
                            </li>
                            <li className="group">
                                <p className="mb-1 text-base">Certificate of Authenticity (PDF)</p>
                                <span className="text-soft-gray block text-xs">signed and dated</span>
                            </li>
                            <li className="group">
                                <p className="mb-2 text-base">Usage rights:</p>
                                <div className="pl-4 text-soft-gray space-y-1 text-xs border-l border-soft-white/10">
                                    <p>– Personal display</p>
                                    <p>– Digital showcase</p>
                                    <p>– Non-commercial use</p>
                                    <p className="opacity-70 italic">(commercial use available upon request)</p>
                                </div>
                            </li>
                            <li className="group">
                                <p className="mb-1 text-base">Private delivery link</p>
                                <span className="text-soft-gray block text-xs">(Google Drive, WeTransfer, or private vault)</span>
                            </li>
                            <li className="group">
                                <p className="text-base">Artist statement for the artwork</p>
                            </li>
                            <li className="group">
                                <p className="mb-1 text-base">Creation year and edition number</p>
                                <span className="text-soft-gray block text-xs">(1/1 or limited edition)</span>
                            </li>
                            <li className="group">
                                <p className="mb-1 text-base">Collector name included in the certificate</p>
                                <span className="text-soft-gray block text-xs">(optional)</span>
                            </li>
                        </ul>
                    </section>

                    {/* Rights Not Included */}
                    <section className="space-y-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
                        <h2 className="font-serif text-lg text-soft-white italic border-b border-soft-white/10 pb-4">
                            RIGHTS NOT INCLUDED
                        </h2>
                        <ul className="space-y-2 font-sans text-sm text-soft-gray font-light">
                            <li>– Resale rights</li>
                            <li>– NFT minting rights</li>
                            <li>– Redistribution rights</li>
                        </ul>
                    </section>

                    {/* Footnote */}
                    <footer className="pt-12 border-t border-soft-white/10">
                        <p className="font-serif text-sm italic text-soft-white/50 text-center">
                            Each artwork is treated as a collectible,<br />
                            not a mass-distributed digital product.
                        </p>
                    </footer>

                </div>
            </main>
        </div>
    );
}
