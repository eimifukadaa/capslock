"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/vault");
        }
    };

    return (
        <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md space-y-12">
                <div className="text-center">
                    <h1 className="font-serif text-3xl tracking-widest text-soft-white mb-2">CAPSLOCK</h1>
                    <p className="text-[10px] tracking-[0.5em] text-gold-muted uppercase">Authorized Access Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="font-sans text-[10px] text-gold-muted tracking-[0.2em] uppercase block">Identity</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b border-soft-white/20 py-3 text-sm font-sans text-soft-white focus:outline-none focus:border-gold transition-colors"
                                placeholder="EMAIL"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-sans text-[10px] text-gold-muted tracking-[0.2em] uppercase block">Passkey</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b border-soft-white/20 py-3 text-sm font-sans text-soft-white focus:outline-none focus:border-gold transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="font-sans text-xs text-red-400 text-center tracking-wide bg-red-900/10 py-2 border border-red-900/20">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-soft-white/5 hover:bg-soft-white/10 border border-soft-white/10 text-soft-white font-sans text-xs tracking-[0.2em] font-bold py-4 uppercase transition-all duration-300 hover:border-gold hover:text-gold"
                    >
                        {loading ? "Authenticating..." : "Enter Vault"}
                    </button>
                </form>

                <div className="text-center">
                    <a href="/" className="font-sans text-[10px] text-soft-gray hover:text-soft-white transition-colors tracking-widest">
                        ← RETURN TO PUBLIC GALLERY
                    </a>
                </div>
            </div>
        </div>
    );
}
