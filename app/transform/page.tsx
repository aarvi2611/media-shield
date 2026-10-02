'use client';

import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Scissors,
  Sparkles,
  Zap,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  Share2,
} from 'lucide-react';
import { DEMO_SAMPLE_ASSETS, DemoSampleAsset } from '@/lib/demo-data';
import { buildCloudinaryUrl } from '@/lib/cloudinary';

interface PresetOption {
  id: string;
  name: string;
  platform: string;
  ratio: string;
  width: number;
  height: number;
  crop: string;
  description: string;
}

const PRESETS: PresetOption[] = [
  {
    id: 'instagram_square',
    name: 'Instagram Feed Square',
    platform: 'Instagram',
    ratio: '1:1',
    width: 1080,
    height: 1080,
    crop: 'c_fill,g_auto',
    description: 'Perfect 1:1 square with subject gravity for modern feed grids',
  },
  {
    id: 'instagram_portrait',
    name: 'Instagram Portrait',
    platform: 'Instagram',
    ratio: '4:5',
    width: 1080,
    height: 1350,
    crop: 'c_fill,g_auto',
    description: 'High engagement vertical format for Instagram and Threads',
  },
  {
    id: 'facebook_post',
    name: 'Facebook Timeline Post',
    platform: 'Facebook',
    ratio: '1.91:1',
    width: 1200,
    height: 630,
    crop: 'c_fill,g_auto',
    description: 'Standard landscape dimensions for social card shares',
  },
  {
    id: 'linkedin_post',
    name: 'LinkedIn Feed',
    platform: 'LinkedIn',
    ratio: '1.91:1',
    width: 1200,
    height: 627,
    crop: 'c_fill,g_auto',
    description: 'Professional high-contrast crop optimized for business feeds',
  },
  {
    id: 'website_hero',
    name: 'Website Hero Banner',
    platform: 'Web',
    ratio: '16:5',
    width: 1920,
    height: 600,
    crop: 'c_fill,g_auto',
    description: 'Ultra-wide panoramic header with intelligent focal point centering',
  },
  {
    id: 'mobile_thumb',
    name: 'Mobile App Thumbnail',
    platform: 'Mobile',
    ratio: '1:1',
    width: 400,
    height: 400,
    crop: 'c_thumb,g_auto',
    description: 'Fast lightweight square thumbnail for mobile lists',
  },
];

export default function TransformStudioPage() {
  const [selectedAsset, setSelectedAsset] = useState<DemoSampleAsset>(DEMO_SAMPLE_ASSETS[0]);
  const [selectedPreset, setSelectedPreset] = useState<PresetOption>(PRESETS[0]);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [formatAuto, setFormatAuto] = useState(true);
  const [qualityAuto, setQualityAuto] = useState(true);
  const [customWidth, setCustomWidth] = useState<number>(1080);
  const [customHeight, setCustomHeight] = useState<number>(1080);
  const [copied, setCopied] = useState(false);

  // Sync custom width/height when preset changes
  useEffect(() => {
    setCustomWidth(selectedPreset.width);
    setCustomHeight(selectedPreset.height);
  }, [selectedPreset]);

  // Construct Cloudinary transformation string
  const transformParts: string[] = [];

  if (removeBackground) {
    transformParts.push('e_background_removal');
  }

  // Crop & Dimensions
  transformParts.push(`${selectedPreset.crop},w_${customWidth},h_${customHeight}`);

  // Auto optimization
  const autoTokens: string[] = [];
  if (formatAuto) autoTokens.push('f_auto');
  if (qualityAuto) autoTokens.push('q_auto');
  if (autoTokens.length > 0) {
    transformParts.push(autoTokens.join(','));
  }

  const transformationString = transformParts.join('/');

  // Delivery URL (using Cloudinary URL builder)
  const deliveryUrl = selectedAsset.publicId.startsWith('http') || selectedAsset.publicId.startsWith('data:')
    ? selectedAsset.url
    : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'}/image/upload/${transformationString}/${selectedAsset.publicId}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(deliveryUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Sliders className="w-3.5 h-3.5" />
          <span>Interactive Transformation Engine</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Smart Transformation Studio
        </h1>
        <p className="text-xs text-slate-400">
          Craft content-aware crops, remove backgrounds with Cloudinary AI, and generate high-efficiency delivery URLs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Asset Selection & Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Asset Selector */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              1. Select Source Asset
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_SAMPLE_ASSETS.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`p-2 rounded-xl border text-left flex flex-col items-center gap-1 transition-all ${
                    selectedAsset.id === asset.id
                      ? 'border-blue-500 bg-blue-500/15 shadow'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="h-16 w-full rounded-lg overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset.secureUrl}
                      alt={asset.originalFilename}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-200 truncate w-full text-center">
                    {asset.category?.split(' ')[0] || 'Asset'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Preset Selector */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                2. Smart Crop Presets (Content-Aware)
              </label>
              <span className="text-[11px] font-mono text-blue-400">g_auto</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPreset(p)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPreset.id === p.id
                      ? 'border-blue-500 bg-blue-500/10 text-white shadow'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{p.platform}</span>
                    <span className="text-[10px] font-mono text-blue-400">{p.ratio}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 truncate">{p.name}</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-1">
                    {p.width} × {p.height}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Features & Optimizations */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              3. AI &amp; Delivery Modifiers
            </label>

            <div className="space-y-3">
              {/* Background Removal Toggle */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Scissors className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">AI Background Removal</div>
                    <div className="text-[10px] text-slate-400">e_background_removal</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={removeBackground}
                  onChange={(e) => setRemoveBackground(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-900 border-slate-700"
                />
              </label>

              {/* Format Optimization Toggle */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">Auto Modern Format</div>
                    <div className="text-[10px] text-slate-400">f_auto (WebP, AVIF)</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formatAuto}
                  onChange={(e) => setFormatAuto(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-900 border-slate-700"
                />
              </label>

              {/* Quality Optimization Toggle */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">Perceptual Quality</div>
                    <div className="text-[10px] text-slate-400">q_auto (Visual losslessness)</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={qualityAuto}
                  onChange={(e) => setQualityAuto(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-900 border-slate-700"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Preview & Generated URL (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Dynamic Canvas Preview
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedPreset.name} • {customWidth} × {customHeight}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  {selectedPreset.ratio}
                </span>
              </div>
            </div>

            {/* Canvas Frame */}
            <div className="w-full h-[400px] rounded-2xl bg-slate-950 border border-slate-800/80 p-4 flex items-center justify-center overflow-hidden">
              <div
                className="max-h-full max-w-full rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center transition-all duration-300"
                style={{
                  aspectRatio: `${customWidth} / ${customHeight}`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedAsset.secureUrl}
                  alt="Transformation Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Cloudinary URL Display & Copy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Generated Cloudinary Delivery URL</span>
                <span className="text-[10px] font-mono text-emerald-400">CDN Ready</span>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-300 break-all select-all flex items-center justify-between gap-3">
                <span className="truncate">{deliveryUrl}</span>
                <button
                  onClick={handleCopyUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Transformation breakdown */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Cloudinary Transformation Pipeline Stack:
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {selectedPreset.crop}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  w_{customWidth},h_{customHeight}
                </span>
                {removeBackground && (
                  <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    e_background_removal
                  </span>
                )}
                {formatAuto && (
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    f_auto
                  </span>
                )}
                {qualityAuto && (
                  <span className="px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    q_auto
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
