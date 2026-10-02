'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Tag,
  ShieldCheck,
  AlertTriangle,
  FolderSearch,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { SearchResultItem } from '@/services/cloudinary-search';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<string>('indexed_database');
  const [searched, setSearched] = useState(false);

  const sampleKeywords = ['car', 'sneaker', 'portrait', 'weapon', 'footwear', 'vehicle', 'outdoor'];

  const executeSearch = async (term: string) => {
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/media/search?q=${encodeURIComponent(term)}`);
      const json = await res.json();
      if (json.success) {
        setResults(json.results || []);
        setSource(json.source || 'indexed_database');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial query to populate with items
    executeSearch('');
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Search className="w-3.5 h-3.5" />
          <span>Cloudinary Search API &amp; Semantic Index</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Intelligent Media Search
        </h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Search across detected objects, auto-generated tags, filenames, and visual categories.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="max-w-2xl mx-auto space-y-3">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search by keywords: 'car', 'sneaker', 'portrait', 'outdoor'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-24 py-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-xl"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Search
          </button>
        </form>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-500 font-semibold mr-1">Quick searches:</span>
          {sampleKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => {
                setQuery(kw);
                executeSearch(kw);
              }}
              className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              #{kw}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="text-xs text-slate-400">
          Found <strong className="text-white">{results.length}</strong> matching assets
        </div>
        <div className="text-[11px] font-mono text-slate-500">
          Source:{' '}
          <span className="text-blue-400">
            {source === 'cloudinary_search_api' ? 'Cloudinary Search API' : 'Indexed Database Engine'}
          </span>
        </div>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-72 rounded-2xl bg-slate-900 border border-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <FolderSearch className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">No assets found matching &quot;{query}&quot;</p>
          <p className="text-xs text-slate-500">Try searching for broader keywords like &quot;car&quot;, &quot;sneaker&quot;, or &quot;person&quot;.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((asset) => (
            <Link
              key={asset.id}
              href={`/asset/${asset.id}`}
              className="group flex flex-col rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-lg transition-all hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative h-44 w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.secureUrl}
                  alt={asset.originalFilename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

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

                <div className="absolute bottom-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/70 text-slate-300 backdrop-blur-sm border border-slate-700">
                    {asset.format}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3
                    className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors"
                    title={asset.originalFilename}
                  >
                    {asset.originalFilename}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{asset.category || 'General'}</span>
                    <span className="font-mono">{formatBytes(asset.bytes)}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {asset.tags.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded text-[10px] bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      #{t}
                    </span>
                  ))}
                  {asset.tags.length > 3 && (
                    <span className="text-[10px] text-slate-500 self-center">
                      +{asset.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Optimization status bar */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>f_auto,q_auto ready</span>
                  </span>
                  <span className="text-blue-400 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
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
