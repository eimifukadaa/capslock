
export default function CollectorInfo() {
    return (
        <div className="space-y-8 font-serif text-soft-white opacity-90 animate-fade-in">
            {/* HEADING */}
            <h2 className="text-sm tracking-widest uppercase text-soft-gray mb-6">
                Collector Information
            </h2>

            {/* BODY TEXT */}
            <p className="text-xl leading-relaxed text-soft-white/80">
                Each artwork presented in CAPSLOCK GALLERY<br />
                is delivered as an original, high-resolution<br />
                generative work.
            </p>

            <div className="my-8 space-y-2">
                <p className="text-sm uppercase tracking-widest text-gold-muted mb-4">Included</p>
                <ul className="space-y-4 text-base text-soft-white/80 list-none">
                    <li>
                        • High-resolution generative artwork<br />
                        <span className="text-soft-gray ml-4 text-sm">(up to 8K or 12K, depending on the piece)</span>
                    </li>
                    <li>
                        • Original final output<br />
                        <span className="text-soft-gray ml-4 text-sm">(not a screenshot, not compressed)</span>
                    </li>
                    <li>
                        • Certificate of Authenticity (PDF)<br />
                        <span className="text-soft-gray ml-4 text-sm">signed and dated</span>
                    </li>
                    <li className="space-y-1">
                        <p>• Usage rights:</p>
                        <div className="pl-4 text-soft-gray text-sm space-y-1">
                            <p>– Personal display</p>
                            <p>– Digital showcase</p>
                            <p>– Non-commercial use</p>
                            <p>(commercial use available upon request)</p>
                        </div>
                    </li>
                    <li>
                        • Private delivery link<br />
                        <span className="text-soft-gray ml-4 text-sm">(Google Drive, WeTransfer, or private vault)</span>
                    </li>
                    <li>
                        • Artist statement for the artwork
                    </li>
                    <li>
                        • Creation year and edition number<br />
                        <span className="text-soft-gray ml-4 text-sm">(1/1 or limited edition)</span>
                    </li>
                    <li>
                        • Collector name included in the certificate<br />
                        <span className="text-soft-gray ml-4 text-sm">(optional)</span>
                    </li>
                </ul>
            </div>

            <div className="my-8 space-y-2 opacity-60">
                <p className="text-xs uppercase tracking-widest text-soft-gray mb-2">Not Included</p>
                <p className="text-sm text-soft-gray">
                    The following rights are not included:
                </p>
                <ul className="pl-4 text-sm text-soft-gray space-y-1">
                    <li>– Resale rights</li>
                    <li>– NFT minting rights</li>
                    <li>– Redistribution rights</li>
                </ul>
            </div>

            <div className="border-t border-soft-white/10 pt-4 mt-8">
                <p className="text-sm italic text-soft-white/60 leading-relaxed">
                    Each artwork is delivered personally<br />
                    after purchase to ensure authenticity,<br />
                    security, and exclusivity.
                </p>
            </div>
        </div>
    );
}
