import React from 'react';
import Link from 'next/link';
import {
  Cpu,
  Layers,
  ShieldCheck,
  HardDrive,
  Globe,
  Lock,
  Zap,
  Server,
  Code2,
} from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Cpu className="w-3.5 h-3.5" />
          <span>System Architecture &amp; Data Flow</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          MediaShield System Architecture
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          High-performance microservice architecture decoupling compute, AI ingestion, and media delivery.
        </p>
      </div>

      {/* Mermaid / ASCII Topology Diagram */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white tracking-tight">
            End-to-End System Topology
          </h3>
          <span className="text-xs font-mono text-blue-400">Track 1: AI Media Pipelines</span>
        </div>

        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto space-y-4">
          <div className="text-cyan-400 font-bold">
            [Client Browser / Creator Device]
          </div>
          <div className="pl-6 text-slate-500">
            │ (Multipart form upload / Drag-and-drop)
            <br />
            ▼
          </div>
          <div className="text-blue-400 font-bold">
            [Next.js Application Layer (Server Actions &amp; API Routes)]
          </div>
          <div className="pl-6 text-slate-500">
            │ • Input validation (MIME types, 25MB max size)
            <br />
            │ • Server-side secret management (CLOUDINARY_API_SECRET protected)
            <br />
            │ • Node.js Stream pipe to Cloudinary Uploader
            <br />
            ▼
          </div>
          <div className="text-purple-400 font-bold">
            [Cloudinary Media &amp; AI Engine]
          </div>
          <div className="pl-6 text-slate-400 space-y-1">
            ├── <strong className="text-white">Upload API:</strong> Streams binary, provisions Public ID &amp; folders
            <br />
            ├── <strong className="text-white">AI Analysis:</strong> Colors, predominant shades, facial detection
            <br />
            ├── <strong className="text-white">Content Moderation:</strong> WebPurify / AWS Rekognition add-ons
            <br />
            ├── <strong className="text-white">Auto-Tagging:</strong> Google Tagging / visual categorization
            <br />
            ├── <strong className="text-white">Transformations:</strong> e_background_removal, c_fill, g_auto
            <br />
            ├── <strong className="text-white">Search API:</strong> Lucene-based query engine on media catalog
            <br />
            └── <strong className="text-white">Optimized Delivery:</strong> Multi-CDN f_auto, q_auto dynamic delivery
          </div>
          <div className="pl-6 text-slate-500">
            │
            <br />
            ▼ (Persist metadata, health score &amp; telemetry — NO media binaries stored in DB)
          </div>
          <div className="text-emerald-400 font-bold">
            [MediaShield Database (Prisma ORM • SQLite / PostgreSQL)]
          </div>
          <div className="pl-6 text-slate-400">
            └── MediaAsset, MediaTag, MediaObject, MediaTransformation, MediaMetadata
          </div>
        </div>
      </div>

      {/* Security & Secret Handling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">Zero Frontend Secret Exposure</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            All Cloudinary API Keys and Secrets live exclusively in server-side environment
            variables. Browsers never receive or inspect write tokens.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">Quarantine Guardrails</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Assets flagged by Cloudinary moderation are held in review before production CDN
            URLs are distributed, protecting brand safety.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">Zero-Storage Edge Transformations</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            No duplicated binaries in database or disk. Social crops and background removals
            are computed on demand and cached globally at edge nodes.
          </p>
        </div>
      </div>

      {/* Database Schema Summary */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight">
          Prisma Database Models
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Media binaries live in Cloudinary. The database only tracks intelligence metadata,
          moderation scores, tags, and transformation URLs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-blue-400">MediaAsset</div>
            <p className="text-[11px] text-slate-400">
              publicId, secureUrl, bytes, format, healthScore, safetyStatus
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-blue-400">MediaTag</div>
            <p className="text-[11px] text-slate-400">
              name, confidence, source (cloudinary_ai vs fallback)
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-blue-400">MediaObject</div>
            <p className="text-[11px] text-slate-400">
              name, confidence, boundingBox coordinates
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-blue-400">MediaTransformation</div>
            <p className="text-[11px] text-slate-400">
              presetName, transformation string, url, format
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
