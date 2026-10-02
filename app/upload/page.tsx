'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  UploadCloud,
  FileImage,
  CheckCircle2,
  AlertCircle,
  Cpu,
  ShieldCheck,
  Zap,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

type UploadStep = 'idle' | 'uploading' | 'uploaded' | 'analyzing' | 'complete' | 'error';

interface UploadResponseData {
  id: string;
  publicId: string;
  originalFilename: string;
  format: string;
  bytes: number;
  optimizedBytes?: number;
  category: string;
  confidence: number;
  healthScore: number;
  safetyStatus: string;
  tags: Array<{ name: string }>;
  detectedObjects: Array<{ name: string; confidence: number }>;
}

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [step, setStep] = useState<UploadStep>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResponseData | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    // Validate file
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    if (!validTypes.includes(selectedFile.type)) {
      setErrorMessage('Please select a valid image (JPG, PNG, WEBP, GIF, AVIF)');
      return;
    }

    if (selectedFile.size > 25 * 1024 * 1024) {
      setErrorMessage('File exceeds 25 MB maximum size limit');
      return;
    }

    setErrorMessage(null);
    setFile(selectedFile);
    setStep('idle');
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const startPipelineUpload = async () => {
    if (!file) return;

    setStep('uploading');
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulation steps for user visual feedback
      setTimeout(() => {
        setStep('uploaded');
        setTimeout(() => {
          setStep('analyzing');
        }, 600);
      }, 700);

      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Pipeline upload failed');
      }

      setResult(json.data);
      setStep('complete');
    } catch (err: unknown) {
      console.error(err);
      setStep('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred during pipeline execution');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Autonomous Ingestion Engine</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          AI Media Ingestion &amp; Intelligence Pipeline
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Upload any raw image to trigger automated cloud upload, object detection,
          content moderation, and responsive variant generation.
        </p>
      </div>

      {/* Drag & Drop Box */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-blue-500 bg-blue-500/10 scale-[1.01]'
            : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
        />

        {previewUrl ? (
          <div className="space-y-4">
            <div className="relative max-w-sm mx-auto h-52 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded" />
            </div>
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">{file?.name}</span> ({formatBytes(file?.size || 0)})
            </div>
            <p className="text-[11px] text-slate-500">Click or drop another file to replace</p>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white">
                Drag and drop your media file here, or browse
              </p>
              <p className="text-xs text-slate-400">
                Supports JPG, PNG, WEBP, GIF, AVIF up to 25 MB
              </p>
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Pipeline Trigger & Progress Stepper */}
      {file && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Autonomous Pipeline Status</h3>
              <p className="text-xs text-slate-400">Autonomous multi-stage processing</p>
            </div>
            {step === 'idle' && (
              <button
                onClick={startPipelineUpload}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/25 transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>Execute Pipeline</span>
              </button>
            )}
          </div>

          {/* Stepper Status Indicators */}
          <div className="space-y-3 font-mono text-xs">
            {/* Step 1 */}
            <div className="flex items-center gap-3">
              {step === 'uploading' ? (
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              ) : step === 'uploaded' || step === 'analyzing' || step === 'complete' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-slate-700" />
              )}
              <span className={step === 'uploading' ? 'text-blue-400 font-semibold' : step === 'idle' ? 'text-slate-600' : 'text-slate-200'}>
                {step === 'uploading' ? 'Uploading media to cloud...' : '✓ Uploaded'}
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3">
              {step === 'analyzing' ? (
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              ) : step === 'complete' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-slate-700" />
              )}
              <span className={step === 'analyzing' ? 'text-blue-400 font-semibold' : step === 'complete' ? 'text-slate-200' : 'text-slate-600'}>
                {step === 'analyzing' ? 'AI Analysis in progress...' : step === 'complete' ? '✓ Processing complete' : 'AI Analysis &amp; Auto-Tagging'}
              </span>
            </div>
          </div>

          {/* Processing Complete Card */}
          {step === 'complete' && result && (
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    {result.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                    result.safetyStatus === 'SAFE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {result.safetyStatus}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Score: {result.healthScore}/100
                </span>
              </div>

              {/* Detected Objects & Tags */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Detected Objects:
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.detectedObjects.map((obj, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
                    >
                      {obj.name} — <strong className="text-blue-400">{Math.round(obj.confidence * 100)}%</strong>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Auto-Generated Tags:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-800/80 text-slate-300"
                    >
                      #{t.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => router.push(`/asset/${result.id}`)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/25 transition-all"
                >
                  <span>View Full Asset Intelligence &amp; Transformations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
