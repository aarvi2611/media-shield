'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Copy,
  Check,
  ExternalLink,
  Sliders,
  Scissors,
  Palette,
  HeartPulse,
} from 'lucide-react';
import { formatBytes, formatDate } from '@/lib/utils';
import { ImageComparator } from '@/components/image-comparator';
import { HealthScoreGauge } from '@/components/health-score-gauge';

interface AssetDetailData {
  id: string;
  publicId: string;
  secureUrl: string;
  url: string;
  originalFilename: string;
  format: string;
  resourceType: string;
  width: number;
  height: number;
  bytes: number;
  optimizedBytes?: number;
  savingsPercent?: string;
  category?: string;
  confidence?: number;
  healthScore: number;
  safetyStatus: string;
  moderationScore: number;
  moderationDetail?: string;
  colorPalette?: string;
  isDemo: boolean;
  createdAt: string;
  tags: Array<{ id: string; name: string; confidence?: number; source?: string }>;
  detectedObjects: Array<{ id: string; name: string; confidence: number }>;
  transformations: Array<{
    id: string;
    presetName: string;
    transformation: string;
    url: string;
    width?: number;
    height?: number;
    format?: string;
  }>;
}

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [asset, setAsset] = useState<AssetDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/media/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setAsset(json.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(label);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Loading Cloudinary asset intelligence...</p>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
        <h2 className="text-lg font-bold text-white">Media Asset Not Found</h2>
        <p className="text-xs text-slate-400">The requested asset public ID does not exist.</p>
        <Link
          href="/library"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Library
        </Link>
      </div>
    );
  }

  // Parse moderation detail
  let moderationObj = {
    adult: 'None',
    violence: 'None',
    hate: 'None',
    weapons: 'None',
    reasons: [] as string[],
  };
  try {
    if (asset.moderationDetail) {
      moderationObj = JSON.parse(asset.moderationDetail);
    }
  } catch {
    // Ignore JSON error
  }

  // Parse color palette
  let colors: string[] = [];
  try {
    if (asset.colorPalette) {
      colors = JSON.parse(asset.colorPalette);
    }
  } catch {
    colors = ['#3B82F6', '#1E293B', '#F8FAFC'];
  }

  const optimizedTransform = asset.transformations.find((t) =>
    t.presetName.toLowerCase().includes('optimized')
  );
  const optimizedUrl = optimizedTransform?.url || asset.secureUrl;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Nav Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          {asset.isDemo && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Demo Asset
            </span>
          )}
          <Link
            href="/transform"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Open in Transform Studio</span>
          </Link>
        </div>
      </div>

      {/* Asset Header Info */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              {asset.originalFilename}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span>ID: {asset.publicId}</span>
              <span>•</span>
              <span>Created {formatDate(asset.createdAt)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wide border flex items-center gap-1.5 ${
                asset.safetyStatus === 'SAFE'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              {asset.safetyStatus === 'SAFE' ? (
                <ShieldCheck className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
              <span>{asset.safetyStatus}</span>
            </div>

            <div className="px-3 py-1 rounded-xl text-xs font-mono bg-slate-950 text-slate-300 border border-slate-800">
              {asset.width} × {asset.height} px
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Comparator & Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Visual Comparator & Generated Variants */}
        <div className="lg:col-span-2 space-y-8">
          {/* Original vs Optimized Comparator */}
          <ImageComparator
            originalUrl={asset.url}
            optimizedUrl={optimizedUrl}
            originalBytes={asset.bytes}
            optimizedBytes={asset.optimizedBytes}
            width={asset.width}
            height={asset.height}
            format={asset.format}
          />

          {/* Generated Transformations Gallery */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Auto-Generated Cloudinary Transformations
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time variants created via Cloudinary URL transformation parameters
                </p>
              </div>
              <span className="text-xs font-mono text-blue-400">
                {asset.transformations.length} Active Presets
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {asset.transformations.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{t.presetName}</span>
                      <span className="font-mono text-[10px] text-slate-500 uppercase">
                        {t.format || 'WEBP'}
                      </span>
                    </div>

                    <div className="h-40 rounded-lg bg-slate-900 overflow-hidden flex items-center justify-center p-1 border border-slate-800/80">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={t.url}
                        alt={t.presetName}
                        className="max-h-full max-w-full object-contain rounded"
                      />
                    </div>

                    <div className="p-1.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-400 truncate">
                      {t.transformation}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => copyToClipboard(t.url, t.presetName)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-800 transition-colors"
                    >
                      {copiedUrl === t.presetName ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedUrl === t.presetName ? 'Copied' : 'Copy CDN URL'}</span>
                    </button>

                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: AI Intelligence, Safety, Health Score & Delivery */}
        <div className="space-y-6">
          {/* Health Score Gauge */}
          <HealthScoreGauge
            score={asset.healthScore}
            breakdown={{
              aiClassification: asset.confidence ? Math.round(asset.confidence * 100) : 92,
              safety: asset.moderationScore,
              optimization: asset.optimizedBytes ? 95 : 75,
              metadata: asset.tags.length >= 5 ? 95 : 75,
              deliveryReadiness: asset.transformations.length >= 3 ? 95 : 80,
            }}
            recommendations={
              asset.safetyStatus !== 'SAFE'
                ? ['Asset held from production delivery due to content moderation flags']
                : []
            }
          />

          {/* AI Intelligence Panel */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Media Intelligence</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Category:</span>
                <span className="font-bold text-blue-400">{asset.category || 'General'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Confidence:</span>
                <span className="font-mono text-slate-200">
                  {asset.confidence ? `${Math.round(asset.confidence * 100)}%` : '94%'}
                </span>
              </div>

              {/* Detected Objects */}
              <div className="space-y-2 pt-1">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Detected Objects:
                </span>
                <div className="space-y-1.5">
                  {asset.detectedObjects.map((obj) => (
                    <div key={obj.id} className="flex items-center justify-between">
                      <span className="text-slate-300">{obj.name}</span>
                      <span className="font-mono text-blue-400 font-bold">
                        {Math.round(obj.confidence * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              {colors.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <Palette className="w-3 h-3" /> Dominant Colors:
                  </span>
                  <div className="flex items-center gap-2">
                    {colors.map((c, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-lg border border-slate-700 shadow-sm"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Auto Tags */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Tags:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {asset.tags.map((t) => (
                    <span
                      key={t.id}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      #{t.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Media Safety Panel */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Media Safety Guardrails</span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-300">
                {asset.moderationScore}/100
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Adult Content:</span>
                <span className="font-semibold text-slate-200">{moderationObj.adult}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Violence:</span>
                <span className="font-semibold text-slate-200">{moderationObj.violence}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Hate Content:</span>
                <span className="font-semibold text-slate-200">{moderationObj.hate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Weapons:</span>
                <span className={moderationObj.weapons.includes('High') ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                  {moderationObj.weapons}
                </span>
              </div>
            </div>

            {moderationObj.reasons && moderationObj.reasons.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Flagged Reasons:</span>
                </div>
                {moderationObj.reasons.map((r, i) => (
                  <p key={i} className="text-[11px] leading-relaxed">• {r}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
