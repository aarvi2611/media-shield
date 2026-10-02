import { buildCloudinaryUrl } from '@/lib/cloudinary';

export interface TransformationPreset {
  id: string;
  name: string;
  category: 'social' | 'web' | 'ai' | 'optimization';
  transformation: string;
  description: string;
  width?: number;
  height?: number;
  format?: string;
  aspectRatio?: string;
}

export const TRANSFORMATION_PRESETS: TransformationPreset[] = [
  {
    id: 'optimized_delivery',
    name: 'Optimized Delivery',
    category: 'optimization',
    transformation: 'f_auto,q_auto',
    description: 'Automatic format (WebP/AVIF) and quality optimization for maximum bandwidth savings.',
  },
  {
    id: 'bg_removed',
    name: 'Background Removed',
    category: 'ai',
    transformation: 'e_background_removal/f_auto,q_auto',
    description: 'Cloudinary AI background removal for transparent product & portrait assets.',
    format: 'png',
  },
  {
    id: 'instagram_square',
    name: 'Instagram Square (1:1)',
    category: 'social',
    transformation: 'c_fill,g_auto,w_1080,h_1080/f_auto,q_auto',
    description: 'Content-aware gravity crop at 1080x1080 for Instagram feed.',
    width: 1080,
    height: 1080,
    aspectRatio: '1:1',
  },
  {
    id: 'instagram_portrait',
    name: 'Instagram Portrait (4:5)',
    category: 'social',
    transformation: 'c_fill,g_auto,w_1080,h_1350/f_auto,q_auto',
    description: 'Content-aware crop at 1080x1350 for mobile vertical feeds.',
    width: 1080,
    height: 1350,
    aspectRatio: '4:5',
  },
  {
    id: 'instagram_story',
    name: 'Instagram Story (9:16)',
    category: 'social',
    transformation: 'c_fill,g_auto,w_1080,h_1920/f_auto,q_auto',
    description: 'Full screen vertical story crop centered on primary subject.',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16',
  },
  {
    id: 'facebook_post',
    name: 'Facebook Post (1.91:1)',
    category: 'social',
    transformation: 'c_fill,g_auto,w_1200,h_630/f_auto,q_auto',
    description: 'Standard landscape social card optimized for Facebook timeline.',
    width: 1200,
    height: 630,
    aspectRatio: '1.91:1',
  },
  {
    id: 'linkedin_post',
    name: 'LinkedIn Feed (1.91:1)',
    category: 'social',
    transformation: 'c_fill,g_auto,w_1200,h_627/f_auto,q_auto',
    description: 'Professional high-engagement landscape crop for LinkedIn feed.',
    width: 1200,
    height: 627,
    aspectRatio: '1.91:1',
  },
  {
    id: 'website_hero',
    name: 'Website Hero Banner (16:5)',
    category: 'web',
    transformation: 'c_fill,g_auto,w_1920,h_600/f_auto,q_auto',
    description: 'Panoramic ultra-wide hero banner with intelligent subject preservation.',
    width: 1920,
    height: 600,
    aspectRatio: '16:5',
  },
  {
    id: 'mobile_thumb',
    name: 'Mobile Thumbnail (1:1)',
    category: 'web',
    transformation: 'c_thumb,g_auto,w_400,h_400/f_auto,q_auto',
    description: 'Compact high-density thumbnail for mobile e-commerce lists.',
    width: 400,
    height: 400,
    aspectRatio: '1:1',
  },
];

/**
 * Builds the delivery URL for a given public ID and preset/custom transformation.
 */
export function generateTransformationUrl(
  publicId: string,
  transformationString: string,
  fallbackBaseUrl?: string
): string {
  if (publicId.startsWith('data:') || (fallbackBaseUrl && !publicId.includes('/'))) {
    // In local demo data without Cloudinary, return fallback URL or clean up
    return fallbackBaseUrl || publicId;
  }
  return buildCloudinaryUrl(publicId, transformationString);
}

/**
 * Generates the default suite of auto-created transformations for a newly uploaded asset.
 */
export function generateDefaultTransformations(
  publicId: string,
  secureUrl: string
) {
  return [
    {
      presetName: 'Optimized Delivery',
      transformation: 'f_auto,q_auto',
      url: generateTransformationUrl(publicId, 'f_auto,q_auto', secureUrl),
      format: 'webp',
    },
    {
      presetName: 'Background Removed',
      transformation: 'e_background_removal/f_auto,q_auto',
      url: generateTransformationUrl(publicId, 'e_background_removal/f_auto,q_auto', secureUrl),
      format: 'png',
    },
    {
      presetName: 'Instagram Square (1:1)',
      transformation: 'c_fill,g_auto,w_1080,h_1080/f_auto,q_auto',
      url: generateTransformationUrl(publicId, 'c_fill,g_auto,w_1080,h_1080/f_auto,q_auto', secureUrl),
      width: 1080,
      height: 1080,
      format: 'webp',
    },
    {
      presetName: 'LinkedIn Feed',
      transformation: 'c_fill,g_auto,w_1200,h_627/f_auto,q_auto',
      url: generateTransformationUrl(publicId, 'c_fill,g_auto,w_1200,h_627/f_auto,q_auto', secureUrl),
      width: 1200,
      height: 627,
      format: 'webp',
    },
  ];
}
