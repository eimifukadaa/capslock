"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function WorksPage() {
    const [artworks, setArtworks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchArtworks();
    }, []);

    const fetchArtworks = async () => {
        const { data, error } = await supabase
            .from('artworks')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setArtworks(data);
        setLoading(false);
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'available' ? 'sold' : 'available';

        // Optimistic update
        setArtworks(artworks.map(a => a.id === id ? { ...a, status: newStatus } : a));

        const { error } = await supabase
            .from('artworks')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            toast.error("Failed to update status");
            fetchArtworks();
        } else {
            toast.success(`Marked as ${newStatus}`);
        }
    };

    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from('artworks')
            .delete()
            .eq('id', id);

        if (error) {
            toast.error("Failed to delete artwork");
        } else {
            toast.success("Artwork deleted");
            setArtworks(artworks.filter(a => a.id !== id));
            setDeleteId(null);
        }
    };

    const formatIDR = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (loading) return <div className="text-soft-gray">Loading vault data...</div>;

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="font-serif text-4xl text-soft-white mb-2">WORKS</h1>
                    <p className="font-sans text-xs tracking-widest text-soft-gray uppercase">Manage Collection</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 border-b border-soft-white/10 pb-4 text-xs font-sans tracking-widest text-gold-muted uppercase">
                    <div className="col-span-1">Image</div>
                    <div className="col-span-3">Title</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Visibility</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                {/* Table Rows */}
                {artworks.map((art) => (
                    <div key={art.id} className="grid grid-cols-12 gap-4 items-center border-b border-soft-white/5 py-6 hover:bg-white/5 transition-colors group">
                        <div className="col-span-1 relative h-12 w-12 bg-charcoal">
                            <Image src={art.media_url} alt={art.title} fill className="object-cover" />
                        </div>
                        <div className="col-span-3 font-serif text-lg text-soft-white">{art.title}</div>
                        <div className="col-span-2 font-sans text-sm text-soft-gray">{formatIDR(art.price)}</div>
                        <div className="col-span-2">
                            <span className={`font-sans text-[10px] tracking-widest uppercase px-2 py-1 rounded-full ${art.status === 'available' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                                {art.status}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <span className="font-sans text-[10px] tracking-widest uppercase text-soft-gray">
                                {art.visibility}
                            </span>
                        </div>
                        <div className="col-span-2 flex justify-end gap-3 text-soft-gray">
                            <button
                                onClick={() => toggleStatus(art.id, art.status)}
                                className="hover:text-gold transition-colors"
                                title="Toggle Status"
                            >
                                {art.status === 'available' ? (
                                    <span className="text-[10px] border border-soft-white/20 px-2 py-1 hover:bg-white/10">MARK SOLD</span>
                                ) : (
                                    <span className="text-[10px] border border-soft-white/20 px-2 py-1 hover:bg-white/10">RESTOCK</span>
                                )}
                            </button>
                            <Link
                                href={`/vault/works/${art.id}/edit`}
                                className="hover:text-soft-white transition-colors"
                                title="Edit"
                            >
                                <Edit size={16} />
                            </Link>
                            <button
                                onClick={() => setDeleteId(art.id)}
                                className="hover:text-red-400 transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-charcoal border border-soft-white/10 p-8 max-w-md w-full">
                        <h2 className="font-serif text-2xl text-soft-white mb-4">Delete Artwork?</h2>
                        <p className="text-soft-gray mb-8">This action cannot be undone.</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleDelete(deleteId)}
                                className="bg-red-500 text-white px-6 py-2 text-xs tracking-widest uppercase hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setDeleteId(null)}
                                className="border border-soft-white/20 px-6 py-2 text-xs tracking-widest uppercase hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
