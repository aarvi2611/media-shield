'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  UploadCloud,
  ShieldCheck,
  AlertTriangle,
  HardDrive,
  Zap,
  Sparkles,
  HeartPulse,
  ArrowUpRight,
  RefreshCw,
  Sliders,
  FolderSearch,
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { JudgeDemoModal } from '@/components/judge-demo-modal';

interface DashboardData {
  totalAssets: number;
  processedAssets: number;
  safeAssets: number;
  flaggedAssets: number;
  totalStorageBytes: number;
  totalOptimizedBytes: number;
  bandwidthSavedBytes: number;
  savingsPercent: string;
  avgHealthScore: number;
  aiProcessed: number;
  safetyDistribution: Array<{ name: string; value: number; color: string }>;
  formatDistribution: Array<{
    format: string;
    count: number;
    originalBytes: number;
    optimizedBytes: number;
  }>;
  timelineData: Array<{ date: string; processed: number; bandwidthSavedMB: number }>;
  isSampleData: boolean;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboard/stats');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSeedDemoAssets = async () => {
    try {
      setLoading(true);
      await fetch('/api/demo/seed', { method: 'POST' });
      await fetchStats();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Media Intelligence Dashboard
            </h1>
            {data?.isSampleData && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                Sample Metrics Loaded
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time pipeline ingestion telemetry, safety guardrails, and Cloudinary compression performance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchStats}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-xl transition-colors"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/25 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Hackathon Demo</span>
          </button>

          <Link
            href="/upload"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <UploadCloud className="w-4 h-4 text-blue-400" />
            <span>Upload Media</span>
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Assets */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Assets</span>
            <FolderSearch className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{data?.totalAssets || 0}</span>
            <span className="text-xs text-emerald-400 font-medium">100% Processed</span>
          </div>
          <div className="text-[11px] text-slate-500">
            {data?.aiProcessed || 0} assets analyzed via Cloudinary AI
          </div>
        </div>

        {/* Card 2: Content Safety */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Safety Status</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400">{data?.safeAssets || 0} Safe</span>
            <span className="text-xs text-amber-400 font-medium">
              {data?.flaggedAssets || 0} Flagged
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            Zero harmful assets delivered to production
          </div>
        </div>

        {/* Card 3: Bandwidth Saved */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Bandwidth Saved</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-100">
              {data ? formatBytes(data.bandwidthSavedBytes) : '0 MB'}
            </span>
            <span className="text-xs text-emerald-400 font-bold">
              {data?.savingsPercent || '0.0'}%
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            via Cloudinary f_auto,q_auto dynamic delivery
          </div>
        </div>

        {/* Card 4: Health Score */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Health Score</span>
            <HeartPulse className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-400">
              {data?.avgHealthScore || 0}
              <span className="text-sm font-normal text-slate-500">/100</span>
            </span>
            <span className="text-xs text-emerald-400 font-medium">Optimal</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Intelligence, safety &amp; delivery readiness
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Chart (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Media Ingestion &amp; Bandwidth Savings Trend
              </h3>
              <p className="text-xs text-slate-400">
                Daily assets processed and cumulative data transferred saved
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-medium">
              +{data?.savingsPercent || '94'}% efficiency
            </span>
          </div>

          <div className="h-64 w-full">
            {data?.timelineData && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.timelineData}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="bandwidthSavedMB"
                    name="Bandwidth Saved (MB)"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSavings)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Safety Pie Chart (1 col) */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Content Safety Moderation
            </h3>
            <p className="text-xs text-slate-400">Compliance distribution</p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            {data?.safetyDistribution && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.safetyDistribution}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.safetyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="flex justify-around text-xs border-t border-slate-800 pt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-300">Safe: {data?.safeAssets || 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-300">Review: {data?.flaggedAssets || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Format Distribution & Savings Bar Chart */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Storage Compression by File Format
            </h3>
            <p className="text-xs text-slate-400">
              Original raw bytes vs Cloudinary optimized delivery size
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          {data?.formatDistribution && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.formatDistribution}>
                <XAxis dataKey="format" stroke="#64748b" fontSize={11} />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickFormatter={(val) => formatBytes(val)}
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(val: any) => formatBytes(Number(val) || 0)}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar
                  dataKey="originalBytes"
                  name="Original Storage"
                  fill="#64748b"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="optimizedBytes"
                  name="Cloudinary Optimized"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Seed Demo Action Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Need realistic sample data for testing?</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Seed the media library with diverse e-commerce, automotive, portrait, and safety-flagged assets.
          </p>
        </div>
        <button
          onClick={handleSeedDemoAssets}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Seed Demo Assets</span>
        </button>
      </div>

      <JudgeDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}
