import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import Link from 'next/link';
import { ShieldCheck, Cloud, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MediaShield — Enterprise AI Media Intelligence Platform',
  description:
    'Upload. Understand. Protect. Optimize. Deliver. An enterprise-grade AI media intelligence, moderation, and automated optimization platform.',
  keywords: [
    'AI Media Pipeline',
    'Content Moderation',
    'Auto Tagging',
    'Smart Cropping',
    'Image Optimization',
    'SaaS',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        
        <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-slate-200">MediaShield</span>
              <span className="text-slate-600">•</span>
              <span>Enterprise Media Intelligence &amp; CDN</span>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/architecture" className="hover:text-slate-200 transition-colors">
                Architecture
              </Link>
              <Link href="/library" className="hover:text-slate-200 transition-colors">
                Media Library
              </Link>
              <Link href="/transform" className="hover:text-slate-200 transition-colors">
                Transformation Studio
              </Link>
            </div>

            <div className="flex items-center gap-1 text-slate-500">
              <span>Production AI Media Engine</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
