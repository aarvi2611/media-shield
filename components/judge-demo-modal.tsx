'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Cloud,
  Cpu,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface JudgeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JudgeDemoModal({ isOpen, onClose }: JudgeDemoModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<'sneaker' | 'car' | 'flagged'>('sneaker');

  if (!isOpen) return null;

  const samples = {
    sneaker: {
      name: 'Nike Air Fusion — E-Commerce Raw',
      id: 'demo-asset-sneaker-01',
      type: 'Product / Retail',
      targetUrl: '/asset/demo-asset-sneaker-01',
      highlights: '94.4% Bandwidth Savings • Background Removal • Content-Aware Crop',
    },
    car: {
      name: 'Porsche Taycan — Alpine Road',
      id: 'demo-asset-car-02',
      type: 'Automotive / Landscape',
      targetUrl: '/asset/demo-asset-car-02',
      highlights: 'Hero 16:5 Crop • Smart Gravity • Auto WebP Delivery',
    },
    flagged: {
      name: 'Restricted Item — Tactical Gun Alert',
      id: 'demo-asset-flagged-04',
      type: 'Safety Violation',
      targetUrl: '/asset/demo-asset-flagged-04',
      highlights: 'Requires Review • Flagged Weapon • Production Delivery Blocked',
    },
  };

  const currentSample = samples[selectedPreset];

  const handleStartWalkthrough = async () => {
    setIsSimulating(true);
    setStep(1);

    // Auto seed database first
    try {
      await fetch('/api/demo/seed', { method: 'POST' });
    } catch {
      // Ignore
    }

    // Step 1: Upload
    setTimeout(() => {
      setStep(2); // AI Analysis
      setTimeout(() => {
        setStep(3); // Moderation
        setTimeout(() => {
          setStep(4); // Transformations & Savings
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.7 },
          });
          setIsSimulating(false);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleCompleteAndNavigate = (targetPath: string) => {
    onClose();
    router.push(targetPath);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-lg text-white shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Hackathon Judge 3-Minute Interactive Demo
              </h2>
              <p className="text-xs text-slate-400">
                Cloudinary AI Media Pipelines • Track 1 Showcase
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white rounded-lg p-1.5 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                Welcome, judges! This guided workflow steps through the end-to-end Cloudinary
                AI media pipeline: <strong className="text-blue-400">Upload → AI Understanding → Content Moderation → Smart Transformations → Delivery</strong>.
              </p>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Select A Demo Scenario
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setSelectedPreset('sneaker')}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      selectedPreset === 'sneaker'
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-200">E-Commerce Product</div>
                    <div className="text-[11px] text-slate-400 mt-1">Sneaker Studio</div>
                    <div className="mt-2 text-[10px] text-emerald-400 font-mono">94% Savings</div>
                  </button>

                  <button
                    onClick={() => setSelectedPreset('car')}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      selectedPreset === 'car'
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-200">Automotive / Landscape</div>
                    <div className="text-[11px] text-slate-400 mt-1">Porsche Mountain</div>
                    <div className="mt-2 text-[10px] text-blue-400 font-mono">Hero Banner Crop</div>
                  </button>

                  <button
                    onClick={() => setSelectedPreset('flagged')}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      selectedPreset === 'flagged'
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-200">Safety Violation</div>
                    <div className="text-[11px] text-slate-400 mt-1">Prohibited Weapon</div>
                    <div className="mt-2 text-[10px] text-amber-400 font-mono">Moderation Flag</div>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-300">{currentSample.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{currentSample.highlights}</div>
                </div>
                <button
                  onClick={handleStartWalkthrough}
                  disabled={isSimulating}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Run Pipeline
                </button>
              </div>
            </div>
          )}

          {step > 0 && (
            <div className="space-y-5">
              {/* Stepper tracker */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { num: 1, label: 'Upload API', icon: Cloud },
                  { num: 2, label: 'AI Analysis', icon: Cpu },
                  { num: 3, label: 'Safety Check', icon: ShieldCheck },
                  { num: 4, label: 'Transform & Optimize', icon: Zap },
                ].map((s) => {
                  const Icon = s.icon;
                  const isDone = step > s.num || step === 4;
                  const isCurrent = step === s.num;

                  return (
                    <div
                      key={s.num}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isDone
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                          : isCurrent
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400 animate-pulse'
                          : 'border-slate-800 bg-slate-800/40 text-slate-500'
                      }`}
                    >
                      <div className="flex justify-center mb-1">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="text-[11px] font-semibold">{s.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Progress details */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Target: <span className="text-white">{currentSample.name}</span>
                </div>
                {step >= 1 && (
                  <div className="text-emerald-400 flex items-center gap-1.5">
                    ✓ Uploaded to Cloudinary with folder &quot;mediashield&quot;
                  </div>
                )}
                {step >= 2 && (
                  <div className="text-blue-400 flex items-center gap-1.5">
                    ✓ Cloudinary AI detected objects, visual colors &amp; auto-generated tags
                  </div>
                )}
                {step >= 3 && (
                  <div
                    className={
                      selectedPreset === 'flagged' ? 'text-amber-400' : 'text-emerald-400'
                    }
                  >
                    {selectedPreset === 'flagged'
                      ? '⚠ Moderation: Prohibited Weapon detected (Score: 42/100) — HELD'
                      : '✓ Content Moderation: Safe content verified (Score: 98/100)'}
                  </div>
                )}
                {step >= 4 && (
                  <div className="text-purple-400 flex items-center gap-1.5">
                    ✓ Generated f_auto,q_auto optimized delivery + responsive crops + bg removal
                  </div>
                )}
              </div>

              {step === 4 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => handleCompleteAndNavigate(currentSample.targetUrl)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all"
                  >
                    <span>Inspect Asset Intelligence &amp; Savings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleCompleteAndNavigate('/cloudinary')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition-all"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>View Cloudinary Pipeline</span>
                  </button>
                  <button
                    onClick={() => setStep(0)}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700"
                    title="Reset Walkthrough"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
