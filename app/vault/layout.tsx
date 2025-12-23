import Link from "next/link";
import { LayoutDashboard, Upload, Image as ImageIcon, Settings, LogOut } from "lucide-react";

export default function VaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-obsidian text-soft-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-soft-white/10 p-8 hidden md:flex flex-col justify-between fixed h-full bg-obsidian z-50">
                <div>
                    <div className="mb-12">
                        <h1 className="font-serif text-2xl tracking-widest text-soft-white mb-1">CAPSLOCK</h1>
                        <p className="text-[10px] tracking-[0.5em] text-gold-muted uppercase">Vault Access</p>
                    </div>

                    <nav className="space-y-6">
                        <Link href="/vault" className="flex items-center gap-4 text-xs tracking-widest text-soft-gray hover:text-soft-white transition-colors group">
                            <LayoutDashboard size={14} className="group-hover:text-gold" />
                            DASHBOARD
                        </Link>
                        <Link href="/vault/upload" className="flex items-center gap-4 text-xs tracking-widest text-soft-gray hover:text-soft-white transition-colors group">
                            <Upload size={14} className="group-hover:text-gold" />
                            UPLOAD
                        </Link>
                        <Link href="/vault/works" className="flex items-center gap-4 text-xs tracking-widest text-soft-gray hover:text-soft-white transition-colors group">
                            <ImageIcon size={14} className="group-hover:text-gold" />
                            WORKS
                        </Link>
                        <Link href="/vault/settings" className="flex items-center gap-4 text-xs tracking-widest text-soft-gray hover:text-soft-white transition-colors group">
                            <Settings size={14} className="group-hover:text-gold" />
                            SETTINGS
                        </Link>
                    </nav>
                </div>

                <div>
                    <button className="flex items-center gap-4 text-xs tracking-widest text-red-400 hover:text-red-300 transition-colors w-full text-left">
                        <LogOut size={14} />
                        LOGOUT
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 md:p-12 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
