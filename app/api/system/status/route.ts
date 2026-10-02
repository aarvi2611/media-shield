import { NextResponse } from 'next/server';
import { isCloudinaryConfigured } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET() {
  const configured = isCloudinaryConfigured();
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || null;
  const demoModeFlag = process.env.DEMO_MODE === 'true';

  return NextResponse.json({
    status: configured ? 'LIVE_CLOUDINARY' : 'DEMO_MODE',
    isLive: configured,
    demoModeActive: demoModeFlag || !configured,
    cloudName: configured ? cloudName : 'simulated-sandbox',
    capabilities: {
      uploadApi: configured ? 'Active (Direct Cloudinary Upload)' : 'Simulation / In-Memory Fallback',
      transformations: 'Active (f_auto, q_auto, c_fill, g_auto, e_background_removal)',
      autoTagging: configured ? 'Cloudinary AI / Add-on pipeline' : 'Intelligent Heuristic Fallback',
      moderation: configured ? 'WebPurify / AI Safe Search' : 'Automated Policy Heuristics',
      searchApi: configured ? 'Cloudinary Search API' : 'Indexed Database Search',
      cdnDelivery: configured ? `https://res.cloudinary.com/${cloudName}` : 'Cloudinary CDN Demo Node',
    },
  });
}
