import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Scissors,
  Search,
  Eye,
  Activity,
  HardDrive,
  BarChart3,
  Server,
  Code2,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-r from-blue-600/15 via-cyan-500/10 to-indigo-600/15 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Platform Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous AI Media Intelligence &amp; CDN Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Turn Every Media Upload Into{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Intelligent, Production-Ready Content.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            MediaShield automatically analyzes, protects, transforms, optimizes and organizes
            your media using an autonomous multi-stage AI media pipeline.
          </p>

          {/* Tagline */}
          <div className="inline-block font-mono text-xs uppercase tracking-widest text-slate-400 px-4 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            Upload • Understand • Protect • Optimize • Deliver
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Start Processing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all hover:scale-105"
            >
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span>Live Dashboard</span>
            </Link>

            <Link
              href="/architecture"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 font-medium text-sm transition-all"
            >
              <Cpu className="w-4 h-4" />
              <span>Platform Architecture</span>
            </Link>
          </div>

          {/* Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-white">94.4%</div>
              <div className="text-xs text-slate-400 mt-1">Average Bandwidth Saved</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-blue-400">&lt; 450ms</div>
              <div className="text-xs text-slate-400 mt-1">AI Pipeline Latency</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Automated Content Safety</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-purple-400">8+ Variants</div>
              <div className="text-xs text-slate-400 mt-1">Per Single Upload</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-blue-400">The Challenge</h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            Why Modern Platforms Struggle With User Media
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="p-8 rounded-2xl bg-rose-950/20 border border-rose-900/30 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-rose-200">The Problem</h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Businesses receive massive volumes of raw, unoptimized images from sellers, users,
              and creators. These files are:
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Bloated &amp; Slow:</strong> 10MB raw JPEGs that crush mobile page speeds and skyrocket egress bills.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Unmoderated:</strong> High risk of policy violations, weapons, or offensive content leaking into production.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Unindexed:</strong> Zero searchable metadata or semantic object tags, making catalogs disorganized.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Awkwardly Cropped:</strong> Heads chopped off and off-center products in standard social and mobile grids.</span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="p-8 rounded-2xl bg-blue-950/20 border border-blue-900/30 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-blue-200">The MediaShield Solution</h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              MediaShield acts as an autonomous visual AI refinery. One upload triggers
              a zero-friction processing pipeline:
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Automated AI Analysis:</strong> Detects objects, visual categories, and assigns high-confidence tags.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Content Safety Guardrails:</strong> Evaluates adult, violence, hate, and weapons before marking production-ready.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Instant Background Removal:</strong> Produces e-commerce cutouts with zero manual Photoshop work.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Smart Gravity Cropping:</strong> Perfect crops for Instagram, LinkedIn, and mobile with <code className="text-blue-300">g_auto</code>.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Autonomous Pipeline Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-blue-400">Core Architecture</h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            The 8-Stage Autonomous Media Pipeline
          </h3>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            MediaShield orchestrates visual intelligence, moderation guardrails, and neural transformations across each layer of the media lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: '01',
              title: 'Ingestion & Upload',
              desc: 'Stream raw media securely into cloud storage with folder isolation and metadata hooks.',
              badge: 'Stream Pipeline',
            },
            {
              step: '02',
              title: 'AI Visual Analysis',
              desc: 'Extract visual labels, predominant hex colors, facial detection, and confidence ratings.',
              badge: 'Neural Vision',
            },
            {
              step: '03',
              title: 'Content Moderation',
              desc: 'Screen adult, violence, hate, and weapon violations before marking assets production-ready.',
              badge: 'Safety Guardrails',
            },
            {
              step: '04',
              title: 'Auto-Tagging',
              desc: 'Generate semantic keywords stored directly on asset records for searchability.',
              badge: 'Semantic Index',
            },
            {
              step: '05',
              title: 'Background Removal',
              desc: 'Isolate foreground subjects for clean e-commerce catalogs and transparent marketing banners.',
              badge: 'Neural Cutout',
            },
            {
              step: '06',
              title: 'Smart Crop Studio',
              desc: 'Content-aware gravity cropping preserving key subjects across social aspect ratios.',
              badge: 'Content-Aware',
            },
            {
              step: '07',
              title: 'Format & Quality',
              desc: 'Deliver modern WebP/AVIF formats at optimal perceptual quality with up to 94% compression.',
              badge: 'Perceptual Opt',
            },
            {
              step: '08',
              title: 'Search & CDN Delivery',
              desc: 'Query asset catalog instantly via full-text search and deliver globally with sub-50ms latency.',
              badge: 'Global Edge CDN',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-400">{item.step}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/architecture"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 tracking-wide"
          >
            <span>Read full system architecture &amp; security specification</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-blue-400">Enterprise Capabilities</h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            Engineered For Enterprise Scale, Built For Production
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Media Health Score (0–100)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Composite health index correlating AI classification, safety flags, compression ratios,
              and multi-platform delivery readiness with targeted recommendations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Original vs Optimized Split</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive visual slider allowing teams and judges to visually inspect pixel-perfect
              fidelity while saving up to 94% in bandwidth and storage costs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Automated Safety Guardrails</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quarantines dangerous or sensitive media in a review queue, preventing prohibited
              weapons or adult content from reaching production CDN distributions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-12 rounded-3xl bg-gradient-to-tr from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-800/40 shadow-2xl space-y-6">
          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Ready To Experience The Future Of AI Media Pipelines?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Upload your own images or launch the guided 3-minute Hackathon Judge Walkthrough
            to inspect Cloudinary intelligence in action.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-105"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Uploader</span>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
            >
              <span>Explore Dashboard</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
