"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Mail } from "lucide-react";
import { Artwork } from "@/lib/data";
import { Toaster } from "sonner";

interface InquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    artwork: Artwork;
}

export function InquiryModal({ isOpen, onClose, artwork }: InquiryModalProps) {
    // Prevent scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const whatsappNumber = "628990345431";
    const emailAddress = "visualdendy@gmail.com";

    // Create the message with the exact formatting requested
    const messageTemplate = `Hello,
I’m interested in collecting the artwork:

${artwork?.title} (IDR ${artwork ? new Intl.NumberFormat("id-ID").format(artwork.price) : '0'})

Please let me know the details.
Thank you.`;

    // URL Encoded versions
    const encodedMessage = encodeURIComponent(messageTemplate);
    const encodedSubject = encodeURIComponent(`Inquiry — CAPSLOCK GALLERY / ${artwork?.title}`);

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    const mailtoLink = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedMessage}`;

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div key="modal-overlay" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            key="modal-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-obsidian/90 backdrop-blur-sm"
                        />

                        <motion.div
                            key="modal-content"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-charcoal border border-soft-white/10 p-8 md:p-12 shadow-2xl"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-soft-gray hover:text-soft-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center mb-12">
                                <h2 className="font-serif text-3xl text-soft-white mb-2 tracking-wide">COLLECT THIS WORK</h2>
                                <div className="w-12 h-[1px] bg-gold mx-auto my-6" />
                                <p className="font-sans text-xs text-soft-gray tracking-widest leading-relaxed">
                                    To inquire about this artwork,<br />please contact:
                                </p>
                            </div>

                            <div className="space-y-8">
                                {/* WhatsApp Section */}
                                <div className="group">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-sans text-[10px] text-gold-muted tracking-[0.2em] uppercase">WhatsApp</span>
                                        <a
                                            href={whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-[10px] text-soft-gray hover:text-gold transition-colors uppercase tracking-widest"
                                        >
                                            <ExternalLink size={12} />
                                            OPEN WHATSAPP
                                        </a>
                                    </div>
                                    <div className="border-b border-soft-white/20 pb-4 group-hover:border-gold/50 transition-colors">
                                        <p className="font-serif text-xl text-soft-white">+62 899-0345-431</p>
                                    </div>
                                </div>

                                {/* Email Section */}
                                <div className="group">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-sans text-[10px] text-gold-muted tracking-[0.2em] uppercase">Email</span>
                                        <a
                                            href={mailtoLink}
                                            className="flex items-center gap-2 text-[10px] text-soft-gray hover:text-gold transition-colors uppercase tracking-widest"
                                        >
                                            <Mail size={12} />
                                            SEND EMAIL
                                        </a>
                                    </div>
                                    <div className="border-b border-soft-white/20 pb-4 group-hover:border-gold/50 transition-colors">
                                        <p className="font-serif text-xl text-soft-white">visualdendy@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-soft-white/5">
                                <p className="font-sans text-[10px] text-soft-gray text-center tracking-[0.2em] mb-4 uppercase">
                                    Accepted Payment Methods
                                </p>
                                <div className="flex justify-center gap-6">
                                    <span className="font-serif text-sm text-soft-white/50">Bank Transfer</span>
                                    <span className="font-serif text-sm text-soft-white/50">Wise</span>
                                    <span className="font-serif text-sm text-soft-white/50">PayPal</span>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="font-sans text-[10px] text-red-500/50 tracking-widest uppercase">
                                    ⚠️ Please await manual confirmation
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <Toaster
                toastOptions={{
                    style: {
                        background: '#0A0A0A',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#EAEAEA',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                    }
                }}
            />
        </>
    );
}
