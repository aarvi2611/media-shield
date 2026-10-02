'use client';

import React, { useEffect, useState } from 'react';
import { Cloud, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

interface SystemStatus {
  status: string;
  isLive: boolean;
  demoModeActive: boolean;
  cloudName: string;
  capabilities: Record<string, string>;
}

export function StatusBadge() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('/api/system/status')
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(() => null);
  }, []);

  if (!status) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all ${
          status.isLive
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
            : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
        }`}
        title="Click to view Cloudinary connection diagnostics"
      >
        <span className={`w-2 h-2 rounded-full animate-pulse ${status.isLive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
        {status.isLive ? 'CLOUD ENGINE: ACTIVE' : 'SANDBOX MODE'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 p-4 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 text-xs text-slate-300">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 font-semibold text-slate-100">
              <Cloud className="w-4 h-4 text-blue-400" />
              <span>Pipeline Diagnostics</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-slate-300"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Environment:</span>
              <span className="font-mono text-slate-200">
                {status.isLive ? 'Production Cloud' : 'Sandbox Fallback'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Cloud Name:</span>
              <span className="font-mono text-blue-400">{status.cloudName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Transformations:</span>
              <span className="text-emerald-400 font-medium">f_auto, q_auto, g_auto</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">AI Analysis:</span>
              <span className="text-slate-200">{status.capabilities.autoTagging}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Moderation:</span>
              <span className="text-slate-200">{status.capabilities.moderation}</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            {status.isLive ? (
              <p className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                Verified Cloudinary credentials active. Real media is uploaded and transformed.
              </p>
            ) : (
              <p className="flex items-start gap-1.5 text-amber-300/90">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                Running in Demo Mode. Real Cloudinary SDK syntax executes, with fallback when credentials or paid add-ons are unset.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
