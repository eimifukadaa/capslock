"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-obsidian text-soft-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center z-10"
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl tracking-widest mb-4">
          CAPSLOCK
        </h1>
        <h2 className="font-serif text-2xl md:text-4xl lg:text-6xl tracking-[0.2em] text-soft-gray/80">
          GALLERY
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5, ease: "easeIn" }}
        className="absolute bottom-20 z-10"
      >
        <Link
          href="/gallery"
          className="text-lg md:text-xl tracking-[0.3em] font-sans text-gold-muted hover:text-gold transition-all duration-700 border-b border-transparent hover:border-gold pb-1"
          data-hover="ENTER"
        >
          ENTER THE VAULT
        </Link>
      </motion.div>
    </main>
  );
}
