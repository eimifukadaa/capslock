export default function VaultDashboard() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="font-serif text-4xl text-soft-white mb-2">CONTROL ROOM</h1>
                <p className="font-sans text-xs tracking-widest text-soft-gray uppercase">System Status: Active</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-charcoal p-8 border border-soft-white/5 hover:border-gold/30 transition-colors group">
                    <p className="font-sans text-[10px] tracking-[0.2em] text-soft-gray uppercase mb-4">Total Artworks</p>
                    <p className="font-serif text-5xl text-soft-white group-hover:text-gold transition-colors">5</p>
                </div>

                <div className="bg-charcoal p-8 border border-soft-white/5 hover:border-gold/30 transition-colors group">
                    <p className="font-sans text-[10px] tracking-[0.2em] text-soft-gray uppercase mb-4">Value (Available)</p>
                    <p className="font-serif text-5xl text-soft-white group-hover:text-gold transition-colors">14.0M</p>
                </div>

                <div className="bg-charcoal p-8 border border-soft-white/5 hover:border-gold/30 transition-colors group">
                    <p className="font-sans text-[10px] tracking-[0.2em] text-soft-gray uppercase mb-4">Inquiries</p>
                    <p className="font-serif text-5xl text-soft-white group-hover:text-gold transition-colors">12</p>
                </div>
            </div>

            <div className="bg-charcoal p-8 border border-soft-white/5">
                <h3 className="font-serif text-xl text-soft-white mb-6">RECENT ACTIVITY</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b border-soft-white/5 pb-4 last:border-0">
                            <span className="font-sans text-xs text-soft-gray">2025-12-{20 + i}</span>
                            <span className="font-serif text-soft-white">New artwork "PROTOCOL {i}" uploaded</span>
                            <span className="font-sans text-[10px] text-gold-muted uppercase">Success</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
