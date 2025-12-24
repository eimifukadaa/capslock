"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-obsidian text-soft-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <Image
            src="/flower-logo.png"
            alt="Flower Logo"
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]"
          />
        </motion.div>

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
