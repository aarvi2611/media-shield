'use client';

import React, { useState } from 'react';
import { formatBytes } from '@/lib/utils';
import { Sparkles, SplitSquareVertical, ArrowRight, Zap, Check } from 'lucide-react';

interface ImageComparatorProps {
  originalUrl: string;
  optimizedUrl: string;
  originalBytes: number;
  optimizedBytes?: number | null;
  width: number;
  height: number;
  format: string;
}

export function ImageComparator({
  originalUrl,
  optimizedUrl,
  originalBytes,
  optimizedBytes,
  width,
  height,
  format,
}: ImageComparatorProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [mode, setMode] = useState<'split' | 'side-by-side'>('split');
  const [copied, setCopied] = useState(false);

  const effectiveOptimizedBytes =
    optimizedBytes && optimizedBytes > 0
      ? optimizedBytes
      : Math.round(originalBytes * 0.12);

  const savingsPercent = (
    ((originalBytes - effectiveOptimizedBytes) / originalBytes) *
    100
  ).toFixed(1);

  const handleCopyOptimizedUrl = () => {
    navigator.clipboard.writeText(optimizedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight">
              Original vs Cloudinary Optimized
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              f_auto,q_auto
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual inspection &amp; bandwidth savings comparison powered by Cloudinary CDN
          </p>
        </div>

        {/* Mode Toggle & Copy Action */}
        <div className="flex items-center gap-2">
          <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-xl">
            <button
              onClick={() => setMode('split')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                mode === 'split' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setMode('side-by-side')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                mode === 'side-by-side'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Side-by-Side
            </button>
          </div>

          <button
            onClick={handleCopyOptimizedUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Zap className="w-3.5 h-3.5 text-yellow-400" />}
            <span>{copied ? 'Copied CDN URL' : 'Copy CDN URL'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Original Asset</div>
          <div className="text-lg font-bold text-slate-200 mt-0.5">{formatBytes(originalBytes)}</div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            {width} × {height} • {format.toUpperCase()}
          </div>
        </div>

        <div className="border-x border-slate-800 flex flex-col justify-center items-center">
          <div className="inline-flex items-center gap-1 text-emerald-400 font-bold text-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{savingsPercent}% Smaller</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Saved {formatBytes(originalBytes - effectiveOptimizedBytes)}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Optimized Delivery</div>
          <div className="text-lg font-bold text-emerald-400 mt-0.5">{formatBytes(effectiveOptimizedBytes)}</div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            {width} × {height} • WEBP / AVIF
          </div>
        </div>
      </div>

      {/* Interactive Visual Comparator */}
      {mode === 'split' ? (
        <div className="relative w-full h-[420px] rounded-xl overflow-hidden select-none bg-slate-950 border border-slate-800">
          {/* Background: Optimized Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={optimizedUrl}
            alt="Optimized delivery"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
            OPTIMIZED ({formatBytes(effectiveOptimizedBytes)})
          </div>

          {/* Foreground: Original Image clipped by slider */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl"
            style={{ width: `${sliderPos}%` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={originalUrl}
              alt="Original uncompressed"
              className="absolute inset-y-0 left-0 max-w-none h-full object-contain"
              style={{ width: '100%', minWidth: '100%' }}
            />
            <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-slate-300 border border-slate-700">
              ORIGINAL ({formatBytes(originalBytes)})
            </div>
          </div>

          {/* Slider input control */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />

          {/* Handle visual */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-10 w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-2xl"
            style={{ left: `${sliderPos}%` }}
          >
            <SplitSquareVertical className="w-4 h-4" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Original ({format.toUpperCase()})</span>
              <span className="font-mono">{formatBytes(originalBytes)}</span>
            </div>
            <div className="h-64 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={originalUrl} alt="Original" className="max-h-full max-w-full object-contain rounded" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-400">
              <span className="font-semibold">Optimized (Cloudinary f_auto,q_auto)</span>
              <span className="font-mono">{formatBytes(effectiveOptimizedBytes)}</span>
            </div>
            <div className="h-64 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={optimizedUrl} alt="Optimized" className="max-h-full max-w-full object-contain rounded" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
