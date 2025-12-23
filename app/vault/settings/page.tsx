"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { User } from "lucide-react";

export default function SettingsPage() {
    const supabase = createClient();
    const [saving, setSaving] = useState(false);

    // Gallery Settings
    const [galleryName, setGalleryName] = useState("CAPSLOCK GALLERY");
    const [contactEmail, setContactEmail] = useState("visualdendy@gmail.com");
    const [whatsappNumber, setWhatsappNumber] = useState("+62 899-0345-431");

    // Profile Settings
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");

    const handleSaveGallery = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // Simulate save
        setTimeout(() => {
            toast.success("Gallery settings saved");
            setSaving(false);
        }, 1000);
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // Simulate save
        setTimeout(() => {
            toast.success("Profile settings saved");
            setSaving(false);
        }, 1000);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    return (
        <div className="space-y-12">
            <div>
                <h1 className="font-serif text-4xl text-soft-white mb-2">SETTINGS</h1>
                <p className="font-sans text-xs tracking-widest text-soft-gray uppercase">Configure Gallery</p>
            </div>

            {/* Gallery Settings */}
            <section className="space-y-6">
                <h2 className="font-serif text-2xl text-soft-white border-b border-soft-white/10 pb-4">Gallery Information</h2>

                <form onSubmit={handleSaveGallery} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs tracking-widest uppercase text-gold-muted">Gallery Name</label>
                        <input
                            type="text"
                            value={galleryName}
                            onChange={(e) => setGalleryName(e.target.value)}
                            className="w-full max-w-md bg-charcoal border border-soft-white/10 px-4 py-3 text-soft-white focus:border-gold outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs tracking-widest uppercase text-gold-muted">Contact Email</label>
                        <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full max-w-md bg-charcoal border border-soft-white/10 px-4 py-3 text-soft-white focus:border-gold outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs tracking-widest uppercase text-gold-muted">WhatsApp Number</label>
                        <input
                            type="text"
                            value={whatsappNumber}
                            onChange={(e) => setWhatsappNumber(e.target.value)}
                            className="w-full max-w-md bg-charcoal border border-soft-white/10 px-4 py-3 text-soft-white focus:border-gold outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-gold text-obsidian px-8 py-3 font-sans text-xs tracking-widest uppercase hover:bg-gold-muted transition-colors disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Gallery Settings"}
                    </button>
                </form>
            </section>

            {/* Profile Settings */}
            <section className="space-y-6">
                <h2 className="font-serif text-2xl text-soft-white border-b border-soft-white/10 pb-4">Profile</h2>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs tracking-widest uppercase text-gold-muted">Display Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full max-w-md bg-charcoal border border-soft-white/10 px-4 py-3 text-soft-white focus:border-gold outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs tracking-widest uppercase text-gold-muted">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Artist bio..."
                            rows={4}
                            className="w-full max-w-md bg-charcoal border border-soft-white/10 px-4 py-3 text-soft-white focus:border-gold outline-none resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-gold text-obsidian px-8 py-3 font-sans text-xs tracking-widest uppercase hover:bg-gold-muted transition-colors disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Profile"}
                    </button>
                </form>
            </section>

            {/* Account Actions */}
            <section className="space-y-6 pt-8 border-t border-soft-white/10">
                <h2 className="font-serif text-2xl text-soft-white">Account</h2>

                <button
                    onClick={handleSignOut}
                    className="border border-red-500/50 text-red-400 px-8 py-3 font-sans text-xs tracking-widest uppercase hover:bg-red-500/10 transition-colors"
                >
                    Sign Out
                </button>
            </section>
        </div>
    );
}
