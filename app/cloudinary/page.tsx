import React from 'react';
import Link from 'next/link';
import {
  Layers,
  Cloud,
  Cpu,
  ShieldCheck,
  Tag,
  Scissors,
  Zap,
  Search,
  Globe,
  ArrowDown,
  ExternalLink,
  Code2,
} from 'lucide-react';

interface PipelineStage {
  step: string;
  name: string;
  cldCapability: string;
  icon: React.ElementType;
  description: string;
  cldCode: string;
  details: string[];
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    step: '01',
    name: 'UPLOAD',
    cldCapability: 'Cloudinary Upload API (upload_stream)',
    icon: Cloud,
    description:
      'Raw binary media is streamed server-side directly into Cloudinary folders, retaining original dimensions and establishing unique Public IDs.',
    cldCode: `cloudinary.uploader.upload_stream({
  folder: 'mediashield',
  resource_type: 'image',
  colors: true,
  image_metadata: true,
  faces: true,
}, callback)`,
    details: [
      'Server-side credential protection (API Secret never exposed to browser)',
      'Direct node stream pipe for zero temporary disk bloat',
      'Asset metadata and etag extraction',
    ],
  },
  {
    step: '02',
    name: 'AI ANALYSIS',
    cldCapability: 'Cloudinary Visual Analysis & Color Extraction',
    icon: Cpu,
    description:
      'Analyzes image color distributions, facial landmarks, predominant hex shades, and visual categories.',
    cldCode: `// Automatically returned in upload response:
result.colors       // [["#2563EB", 40.2], ["#1E293B", 35.1]]
result.predominant  // { google: [["blue", 40], ["dark slate", 35]] }
result.faces        // [[x, y, width, height], ...]`,
    details: [
      'Predominant color classification for catalog theming',
      'Facial detection coordinates for smart avatar cropping',
      'Dimension and aspect ratio intelligence',
    ],
  },
  {
    step: '03',
    name: 'MODERATION',
    cldCapability: 'Cloudinary Content Moderation (WebPurify / Rekognition)',
    icon: ShieldCheck,
    description:
      'Automated content screening for adult material, violence, hate symbols, and weapons before marking assets safe for distribution.',
    cldCode: `cloudinary.uploader.upload_stream({
  folder: 'mediashield',
  moderation: 'webpurify', // or 'aws_rek'
}, (error, result) => {
  // result.moderation = [{ status: 'approved' | 'rejected' | 'pending' }]
})`,
    details: [
      'Automatic quarantine of sensitive or policy-violating media',
      'Granular score calculation for Adult, Violence, Hate, and Weapons',
      'Blocks risky media from production CDN delivery URLs',
    ],
  },
  {
    step: '04',
    name: 'TAGGING',
    cldCapability: 'Cloudinary Auto-Tagging & Categorization Metadata',
    icon: Tag,
    description:
      'Assigns high-confidence semantic keywords directly to the Cloudinary asset record, making files discoverable.',
    cldCode: `// Cloudinary auto_tagging add-on or categorization:
cloudinary.uploader.upload_stream({
  categorization: 'google_tagging',
  auto_tagging: 0.7, // confidence threshold
})`,
    details: [
      'Semantic tags stored as Cloudinary asset metadata',
      'Visual object classification (vehicles, footwear, people, scenery)',
      'Seamless multi-tag indexing for catalog search',
    ],
  },
  {
    step: '05',
    name: 'TRANSFORMATION',
    cldCapability: 'Cloudinary URL Transformations & Background Removal',
    icon: Scissors,
    description:
      'Dynamic URL-based manipulations including AI background removal (e_background_removal) and content-aware crops (c_fill, g_auto).',
    cldCode: `// Background Removal
https://res.cloudinary.com/<cloud_name>/image/upload/e_background_removal/public_id

// Content-Aware Social Crop (Instagram 1080x1080)
https://res.cloudinary.com/<cloud_name>/image/upload/c_fill,g_auto,w_1080,h_1080/public_id`,
    details: [
      'Zero-storage overhead: variants are rendered on-the-fly and cached at the edge',
      'e_background_removal generates transparent product cutouts',
      'g_auto preserves primary subjects regardless of aspect ratio',
    ],
  },
  {
    step: '06',
    name: 'OPTIMIZATION',
    cldCapability: 'Cloudinary Automatic Format & Perceptual Compression',
    icon: Zap,
    description:
      'f_auto dynamically serves WebP or AVIF based on browser headers. q_auto applies perceptual compression without visible quality degradation.',
    cldCode: `// Delivery with full dynamic optimization:
https://res.cloudinary.com/<cloud_name>/image/upload/f_auto,q_auto/public_id`,
    details: [
      'Typically achieves 80% to 94.4% bandwidth reduction',
      'Delivers next-gen AVIF / WebP automatically',
      'Drastically improves Core Web Vitals (LCP)',
    ],
  },
  {
    step: '07',
    name: 'SEARCH',
    cldCapability: 'Cloudinary Search API (Lucene-based query engine)',
    icon: Search,
    description:
      'Search across the entire Cloudinary media catalog using complex boolean expressions, tags, formats, and date ranges.',
    cldCode: `const res = await cloudinary.v2.search
  .expression('resource_type:image AND tags:car* AND format:webp')
  .sort_by('created_at', 'desc')
  .max_results(30)
  .execute();`,
    details: [
      'Fast sub-second multi-parameter query execution',
      'Search by AI-generated tags, filenames, or public IDs',
      'Direct integration with MediaShield search interface',
    ],
  },
  {
    step: '08',
    name: 'DELIVERY',
    cldCapability: 'Cloudinary Multi-CDN Edge Delivery Network',
    icon: Globe,
    description:
      'Low-latency global edge delivery across Akamai, Cloudflare, and Fastly CDNs with automated cache invalidation.',
    cldCode: `// Production CDN Delivery URL
https://res.cloudinary.com/<cloud_name>/image/upload/f_auto,q_auto/mediashield/asset_id.webp`,
    details: [
      'Multi-CDN redundancy with sub-50ms TTFB worldwide',
      'HTTPS secure delivery URLs by default',
      'Instant responsive image srcset support',
    ],
  },
];

export default function CloudinaryPipelinePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Layers className="w-3.5 h-3.5" />
          <span>Track 1: AI Media Pipelines</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          The Cloudinary AI Media Pipeline
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          MediaShield is not just a storage wrapper. Cloudinary powers every single stage
          of our media lifecycle from ingestion to edge delivery.
        </p>
      </div>

      {/* Pipeline Flow Visual */}
      <div className="space-y-6">
        {PIPELINE_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isLast = idx === PIPELINE_STAGES.length - 1;

          return (
            <div key={stage.step} className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-400">
                          STAGE {stage.step}
                        </span>
                        <span className="text-slate-600">•</span>
                        <h3 className="text-base font-extrabold text-white tracking-tight">
                          {stage.name}
                        </h3>
                      </div>
                      <div className="text-xs font-semibold text-slate-400 mt-0.5">
                        {stage.cldCapability}
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-950 text-emerald-400 border border-slate-800">
                    Active
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {stage.description}
                </p>

                {/* Cloudinary Code Snippet */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Cloudinary Implementation Syntax:</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-xs font-mono text-cyan-300 overflow-x-auto">
                    <code>{stage.cldCode}</code>
                  </pre>
                </div>

                {/* Bullets */}
                <div className="space-y-1.5 pt-1">
                  {stage.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow Down Divider */}
              {!isLast && (
                <div className="flex justify-center">
                  <div className="p-2 rounded-full bg-slate-900 border border-slate-800 text-blue-400">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-800/30 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Experience The Pipeline Firsthand</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Upload your media asset and watch each Cloudinary pipeline stage execute in real-time.
        </p>
        <div className="pt-2">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/25 transition-all"
          >
            <span>Launch Ingestion Pipeline</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
