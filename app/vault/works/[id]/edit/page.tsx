"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function EditArtworkPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [artwork, setArtwork] = useState<any>(null);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("available");
    const [visibility, setVisibility] = useState("public");
    const [newImage, setNewImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        fetchArtwork();
    }, [id]);

    const fetchArtwork = async () => {
        const { data, error } = await supabase
            .from('artworks')
            .select('*')
            .eq('id', id)
            .single();

        if (data) {
            setArtwork(data);
            setTitle(data.title);
            setPrice(data.price.toString());
            setDescription(data.description || "");
            setStatus(data.status);
            setVisibility(data.visibility);
            setPreviewUrl(data.media_url);
        }
        setLoading(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            let mediaUrl = artwork.media_url;

            // Upload new image if provided
            if (newImage) {
                const fileExt = newImage.name.split('.').pop();
                const fileName = `${artwork.slug}-${Date.now()}.${fileExt}`;
                const bucket = visibility === 'public' ? 'artworks-public' : 'artworks-private';

                const { error: uploadError } = await supabase.storage
                    .from(bucket)
                    .upload(fileName, newImage, { upsert: true });

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(fileName);

                mediaUrl = publicUrl;
            }

            // Update artwork
            const { error: updateError } = await supabase
                .from('artworks')
                .update({
                    title,
                    price: parseFloat(price),
                    description,
                    status,
                    visibility,
                    media_url: mediaUrl,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id);

            if (updateError) throw updateError;

            toast.success("Artwork updated successfully");
            router.push('/vault/works');
        } catch (error: any) {
            toast.error(error.message || "Failed to update artwork");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-obsidian text-soft-gray">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-obsidian text-soft-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/vault/works" className="flex items-center gap-2 text-soft-gray hover:text-soft-white mb-8 transition-colors">
                    <ArrowLeft size={16} />
                    <span className="text-xs tracking-widest uppercase">Back to Works</span>
                </Link>

                <h1 className="font-serif text-3xl mb-8">Edit Artwork</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Image Preview */}
                    <div className="space-y-4">
                        <label className="block text-xs tracking-widest uppercase text-gold-muted">Artwork Image</label>
                        <div className="relative w-full h-64 bg-charcoal border border-soft-white/10">
                            {previewUrl && (
                                <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                            )}
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer border border-soft-white/20 px-4 py-2 hover:bg-white/5 transition-colors w-fit">
                            <Upload size={16} />
                            <span className="text-xs tracking-widest uppercase">Change Image</span>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="block text-xs tracking-widest uppercase text-gold-muted">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-charcoal border border-soft-white/10 px-4 py-3 text-soft-white focus:border-gold outline-none"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label className="block text-xs tracking-widest uppercase text-gold-muted">Price (IDR)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full bg-charcoal border border-soft-white/10 px-4 py-3 text-soft-white focus:border-gold outline-none"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="block text-xs tracking-widest uppercase text-gold-muted">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full bg-charcoal border border-soft-white/10 px-4 py-3 text-soft-white focus:border-gold outline-none resize-none"
                        />
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <label className="block text-xs tracking-widest uppercase text-gold-muted">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full bg-charcoal border border-soft-white/10 px-4 py-3 text-soft-white focus:border-gold outline-none"
                        >
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>

                    {/* Visibility */}
                    <div className="space-y-2">
                        <label className="block text-xs tracking-widest uppercase text-gold-muted">Visibility</label>
                        <select
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                            className="w-full bg-charcoal border border-soft-white/10 px-4 py-3 text-soft-white focus:border-gold outline-none"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-gold text-obsidian px-8 py-3 font-sans text-xs tracking-widest uppercase hover:bg-gold-muted transition-colors disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                        <Link
                            href="/vault/works"
                            className="border border-soft-white/20 px-8 py-3 font-sans text-xs tracking-widest uppercase hover:bg-white/5 transition-colors"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
