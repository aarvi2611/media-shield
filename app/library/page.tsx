'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FolderSearch,
  Filter,
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Tag,
  Eye,
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { DEMO_SAMPLE_ASSETS } from '@/lib/demo-data';

interface MediaAssetItem {
  id: string;
  publicId: string;
  originalFilename: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  optimizedBytes?: number | null;
  secureUrl: string;
  category?: string | null;
  safetyStatus: string;
  moderationScore: number;
  healthScore: number;
  processingStatus: string;
  isDemo: boolean;
  tags: Array<{ name: string }>;
  createdAt: string;
}

export default function LibraryPage() {
  const [assets, setAssets] = useState<MediaAssetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSafety, setFilterSafety] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media?limit=100');
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setAssets(json.data);
      } else {
        // Fall back to sample demo assets if database has not been seeded yet
        const sampleMapped: MediaAssetItem[] = DEMO_SAMPLE_ASSETS.map((s) => ({
          id: s.id,
          publicId: s.publicId,
          originalFilename: s.originalFilename,
          format: s.format,
          width: s.width,
          height: s.height,
          bytes: s.bytes,
          optimizedBytes: s.optimizedBytes,
          secureUrl: s.secureUrl,
          category: s.category,
          safetyStatus: s.safetyStatus,
          moderationScore: s.moderationScore,
          healthScore: s.healthScore,
          processingStatus: 'COMPLETED',
          isDemo: true,
          tags: s.tags.map((t) => ({ name: t })),
          createdAt: new Date().toISOString(),
        }));
        setAssets(sampleMapped);
      }
    } catch (err) {
      console.error('Failed to load library:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Filter logic
  const filteredAssets = assets.filter((asset) => {
    if (filterSafety !== 'ALL' && asset.safetyStatus !== filterSafety) return false;
    if (selectedTag && !asset.tags.some((t) => t.name === selectedTag)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = asset.originalFilename.toLowerCase().includes(q);
      const matchCat = asset.category?.toLowerCase().includes(q);
      const matchTags = asset.tags.some((t) => t.name.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchTags) return false;
    }
    return true;
  });

  // Extract top tags
  const allTags = Array.from(new Set(assets.flatMap((a) => a.tags.map((t) => t.name)))).slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Media Library</h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse, inspect, and filter ingested Cloudinary assets with full AI intelligence metadata.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAssets}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-xl transition-colors"
            title="Refresh assets"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            href="/upload"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
          >
            <span>+ Ingest Media</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by filename, tag, or visual category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Safety Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
            {['ALL', 'SAFE', 'REQUIRES_REVIEW'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterSafety(status)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterSafety === status
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status === 'ALL' ? 'All Safety' : status === 'SAFE' ? 'Safe Only' : 'Flagged'}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Cloud */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-slate-500 font-semibold mr-1 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Filter Tag:
            </span>
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-600 text-white"
              >
                Clear ({selectedTag}) ✕
              </button>
            )}
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Asset Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-80 rounded-2xl bg-slate-900 border border-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <FolderSearch className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">No media assets match your filter</p>
          <p className="text-xs text-slate-500">
            Try resetting your search query or safety status filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <Link
              key={asset.id}
              href={`/asset/${asset.id}`}
              className="group flex flex-col rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-lg transition-all hover:-translate-y-1"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.secureUrl}
                  alt={asset.originalFilename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Safety Badge */}
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                      asset.safetyStatus === 'SAFE'
                        ? 'bg-emerald-500/80 text-white border-emerald-400/40'
                        : 'bg-amber-500/90 text-white border-amber-400/40'
                    }`}
                  >
                    {asset.safetyStatus === 'SAFE' ? 'Safe' : 'Review'}
                  </span>
                </div>

                {/* Format pill */}
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/70 text-slate-300 backdrop-blur-sm border border-slate-700">
                    {asset.format}
                  </span>
                </div>

                {/* Health score pill */}
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600/80 text-white backdrop-blur-sm">
                    {asset.healthScore}/100
                  </span>
                </div>
              </div>

              {/* Asset Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors" title={asset.originalFilename}>
                    {asset.originalFilename}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{asset.category || 'General'}</span>
                    <span className="font-mono">{formatBytes(asset.bytes)}</span>
                  </div>
                </div>

                {/* Tags preview */}
                <div className="flex flex-wrap gap-1">
                  {asset.tags.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded text-[10px] bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      #{t.name}
                    </span>
                  ))}
                  {asset.tags.length > 3 && (
                    <span className="text-[10px] text-slate-500 self-center">
                      +{asset.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer bar */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-slate-500">
                    {asset.width} × {asset.height}
                  </span>
                  <span className="inline-flex items-center gap-1 text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
