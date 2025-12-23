"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UploadPage() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("available");
    const [visibility, setVisibility] = useState("public");

    const router = useRouter();
    const supabase = createClient();

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const resetFile = () => {
        setFile(null);
        setPreview(null);
    };

    const handleUpload = async () => {
        if (!file || !title || !price) {
            toast.error("Please fill in all required fields (Image, Title, Price)");
            return;
        }

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const bucketName = visibility === 'public' ? 'artworks-public' : 'artworks-private';

            // 1. Upload File
            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL (if public)
            let mediaUrl = "";
            if (visibility === 'public') {
                const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);
                mediaUrl = data.publicUrl;
            } else {
                // For private, we might store the path, but for now lets just construct a path reference
                mediaUrl = fileName;
            }

            // 3. Insert into Database
            const { error: dbError } = await supabase
                .from('artworks')
                .insert({
                    title,
                    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    description,
                    price: parseInt(price),
                    status,
                    visibility,
                    media_url: mediaUrl,
                    media_type: file.type.startsWith('video') ? 'video' : 'image',
                    currency: 'IDR'
                });

            if (dbError) throw dbError;

            toast.success("Artwork published successfully!");
            router.push('/vault/works');

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="font-serif text-4xl text-soft-white mb-2">UPLOAD ARTWORK</h1>
                    <p className="font-sans text-xs tracking-widest text-soft-gray uppercase">Add new masterpiece to the vault</p>
                </div>
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="bg-gold hover:bg-gold-muted disabled:opacity-50 disabled:cursor-not-allowed text-black font-sans text-xs tracking-widest font-bold py-4 px-8 uppercase transition-colors flex items-center gap-2"
                >
                    {uploading && <Loader2 className="animate-spin w-4 h-4" />}
                    {uploading ? "UPLOADING..." : "PUBLISH TO GALLERY"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Upload Area */}
                <div className="space-y-8">
                    <div
                        className={cn(
                            "relative h-[400px] border border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 bg-charcoal/50",
                            dragActive ? "border-gold bg-gold/5" : "border-soft-white/10 hover:border-soft-white/30",
                            preview ? "border-solid" : ""
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        {preview ? (
                            <>
                                <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                                <button
                                    onClick={resetFile}
                                    className="absolute top-4 right-4 bg-obsidian/80 text-white p-2 rounded-full hover:bg-red-500/80 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <Upload size={48} className="text-soft-gray mb-6" />
                                <p className="font-serif text-xl text-soft-white mb-2">Drag & Drop Media</p>
                                <p className="font-sans text-xs text-soft-gray tracking-widest mb-6">OR CLICK TO BROWSE</p>
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleChange}
                                    accept="image/*,video/*"
                                />
                                <p className="font-sans text-[10px] text-soft-gray/50 uppercase">Supports JPG, PNG, WEBP, MP4 (Max 50MB)</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Metadata Form */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="font-sans text-[10px] text-gold-muted tracking-[0.2em] uppercase block">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="E.g. VOID ETERNAL"
                            className="w-full bg-transparent border-b border-soft-white/20 py-4 text-xl font-serif text-soft-white focus:outline-none focus:border-gold transition-colors placeholder:text-soft-gray/20"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="font-sans text-[10px] text-gold-muted tracking-[0.2em] uppercase block">Price (IDR)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0"
                                className="w-full bg-transparent border-b border-soft-white/20 py-4 text-xl font-sans text-soft-white focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-sans text-[10px] text-gold-muted tracking-[0.2em] uppercase block">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-transparent border-b border-soft-white/20 py-4 text-xl font-sans text-soft-white focus:outline-none focus:border-gold transition-colors"
                            >
                                <option value="available" className="bg-obsidian">Available</option>
                                <option value="sold" className="bg-obsidian">Sold</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="font-sans text-[10px] text-gold-muted tracking-[0.2em] uppercase block">Description</label>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Artwork narrative..."
                            className="w-full bg-transparent border-b border-soft-white/20 py-4 text-sm font-sans text-soft-white focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-soft-gray/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="font-sans text-[10px] text-gold-muted tracking-[0.2em] uppercase block">Visibility</label>
                        <div className="flex gap-4 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="visibility"
                                    value="public"
                                    checked={visibility === "public"}
                                    onChange={(e) => setVisibility(e.target.value)}
                                    className="accent-gold"
                                />
                                <span className="font-sans text-xs text-soft-white">Public Gallery</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="visibility"
                                    value="private"
                                    checked={visibility === "private"}
                                    onChange={(e) => setVisibility(e.target.value)}
                                    className="accent-gold"
                                />
                                <span className="font-sans text-xs text-soft-white">Private Vault</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
