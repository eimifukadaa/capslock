"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { InquiryModal } from "@/components/inquiry-modal";

export function ArtworkDetailClient({ artwork }: { artwork: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
        >
            {artwork.status === 'sold' ? (
                <div
                    className="inline-block border border-soft-white/10 text-soft-gray px-8 py-4 tracking-[0.2em] text-xs font-sans cursor-not-allowed opacity-50"
                >
                    ARCHIVED
                </div>
            ) : (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-block border border-soft-white/20 hover:border-gold text-soft-white hover:text-gold px-8 py-4 transition-all duration-300 tracking-[0.2em] text-xs font-sans uppercase"
                    data-hover="INQUIRE"
                >
                    INQUIRE TO COLLECT
                </button>
            )}

            <InquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                artwork={artwork}
            />
        </motion.div>
    );
}
