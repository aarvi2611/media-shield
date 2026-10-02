'use client';

import React from 'react';
import { HealthScoreBreakdown } from '@/services/media-health';
import { HeartPulse, CheckCircle2, AlertTriangle, Lightbulb, Info } from 'lucide-react';

interface HealthScoreGaugeProps {
  score: number;
  breakdown?: Partial<HealthScoreBreakdown>;
  recommendations?: string[];
  compact?: boolean;
}

export function HealthScoreGauge({
  score,
  breakdown,
  recommendations = [],
  compact = false,
}: HealthScoreGaugeProps) {
  const getScoreColor = (val: number) => {
    if (val >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (val >= 75) return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    if (val >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const getBarColor = (val: number) => {
    if (val >= 90) return 'bg-emerald-500';
    if (val >= 75) return 'bg-blue-500';
    if (val >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold ${getScoreColor(score)}`}>
        <HeartPulse className="w-3.5 h-3.5" />
        <span>{score}/100</span>
      </div>
    );
  }

  const items = [
    { label: 'AI Classification', value: breakdown?.aiClassification ?? 92 },
    { label: 'Content Safety', value: breakdown?.safety ?? 98 },
    { label: 'Bandwidth Optimization', value: breakdown?.optimization ?? 94 },
    { label: 'Metadata Depth', value: breakdown?.metadata ?? 86 },
    { label: 'Delivery Readiness', value: breakdown?.deliveryReadiness ?? 90 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Media Health Score</h3>
            <p className="text-xs text-slate-400">
              Composite index across intelligence, safety, compression, and delivery
            </p>
          </div>
        </div>

        <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl border ${getScoreColor(score)} shadow-inner`}>
          <span className="text-2xl font-black">{score}</span>
          <span className="text-[9px] uppercase font-bold tracking-wider -mt-1 opacity-80">/ 100</span>
        </div>
      </div>

      {/* Breakdown progress bars */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">{item.label}</span>
              <span className="font-mono text-slate-400">{item.value}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getBarColor(item.value)}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations & Attribution Note */}
      {recommendations.length > 0 ? (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Lightbulb className="w-4 h-4" />
            <span>Optimization Recommendations</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-400">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Optimal configuration. Asset is fully enriched and delivery-ready.</span>
        </div>
      )}

      <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed border-t border-slate-800/60 pt-3">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
        <span>
          Note: The Media Health Score is calculated at the application layer by correlating Cloudinary AI signals, moderation scores, compression ratios, and responsive variants.
        </span>
      </div>
    </div>
  );
}
