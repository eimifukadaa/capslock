import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CAPSLOCK GALLERY",
  description: "A dark luxury art vault.",
  icons: {
    icon: [
      { url: '/flower-logo.png?v=2', sizes: 'any' },
      { url: '/icon.png?v=2', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png?v=2',
    shortcut: '/flower-logo.png?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-obsidian text-soft-white selection:bg-gold-muted/30 selection:text-gold`}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
