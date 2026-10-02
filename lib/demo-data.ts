export interface DemoSampleAsset {
  id: string;
  publicId: string;
  originalFilename: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  optimizedBytes: number;
  url: string;
  secureUrl: string;
  category: string;
  confidence: number;
  healthScore: number;
  safetyStatus: 'SAFE' | 'REQUIRES_REVIEW' | 'FLAGGED';
  moderationScore: number;
  moderationDetail: {
    adult: string;
    violence: string;
    hate: string;
    weapons: string;
    reasons: string[];
  };
  colorPalette: string[];
  detectedObjects: Array<{ name: string; confidence: number }>;
  tags: string[];
  transformations: Array<{
    presetName: string;
    transformation: string;
    width: number;
    height: number;
    format: string;
    url: string;
  }>;
}

export const DEMO_SAMPLE_ASSETS: DemoSampleAsset[] = [
  {
    id: 'demo-asset-sneaker-01',
    publicId: 'mediashield/samples/nike_air_fusion',
    originalFilename: 'nike_air_fusion_studio_raw.png',
    format: 'png',
    width: 3840,
    height: 2560,
    bytes: 6841200, // 6.52 MB
    optimizedBytes: 382400, // 373 KB (94.4% savings)
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2000&q=80',
    secureUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2000&q=80',
    category: 'Footwear & Apparel',
    confidence: 0.98,
    healthScore: 96,
    safetyStatus: 'SAFE',
    moderationScore: 99,
    moderationDetail: {
      adult: 'None',
      violence: 'None',
      hate: 'None',
      weapons: 'None',
      reasons: [],
    },
    colorPalette: ['#E11D48', '#0F172A', '#F8FAFC', '#94A3B8'],
    detectedObjects: [
      { name: 'Athletic Shoe', confidence: 0.98 },
      { name: 'Sneaker', confidence: 0.96 },
      { name: 'Footwear', confidence: 0.94 },
      { name: 'Product Studio', confidence: 0.89 },
    ],
    tags: ['footwear', 'sneaker', 'running shoe', 'sports', 'apparel', 'red', 'product', 'ecommerce'],
    transformations: [
      {
        presetName: 'Optimized Delivery',
        transformation: 'f_auto,q_auto',
        width: 3840,
        height: 2560,
        format: 'webp',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      },
      {
        presetName: 'Background Removed',
        transformation: 'e_background_removal/f_auto,q_auto',
        width: 3840,
        height: 2560,
        format: 'png',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      },
      {
        presetName: 'Instagram Square (1:1)',
        transformation: 'c_fill,g_auto,w_1080,h_1080/f_auto,q_auto',
        width: 1080,
        height: 1080,
        format: 'webp',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1080&h=1080&q=80',
      },
      {
        presetName: 'Instagram Story (9:16)',
        transformation: 'c_fill,g_auto,w_1080,h_1920/f_auto,q_auto',
        width: 1080,
        height: 1920,
        format: 'webp',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1080&h=1920&q=80',
      },
      {
        presetName: 'LinkedIn Post (1.91:1)',
        transformation: 'c_fill,g_auto,w_1200,h_627/f_auto,q_auto',
        width: 1200,
        height: 627,
        format: 'webp',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&h=627&q=80',
      },
    ],
  },
  {
    id: 'demo-asset-car-02',
    publicId: 'mediashield/samples/porsche_taycan_alp',
    originalFilename: 'porsche_taycan_alpine_pass.jpg',
    format: 'jpg',
    width: 4200,
    height: 2800,
    bytes: 8450120, // 8.06 MB
    optimizedBytes: 492100, // 480 KB (94.2% savings)
    url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=80',
    secureUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=80',
    category: 'Automotive',
    confidence: 0.97,
    healthScore: 94,
    safetyStatus: 'SAFE',
    moderationScore: 98,
    moderationDetail: {
      adult: 'None',
      violence: 'None',
      hate: 'None',
      weapons: 'None',
      reasons: [],
    },
    colorPalette: ['#1E293B', '#64748B', '#0284C7', '#E2E8F0'],
    detectedObjects: [
      { name: 'Sports Car', confidence: 0.97 },
      { name: 'Vehicle', confidence: 0.95 },
      { name: 'Mountain Road', confidence: 0.91 },
      { name: 'Outdoor Landscape', confidence: 0.88 },
    ],
    tags: ['car', 'vehicle', 'automotive', 'luxury', 'sports car', 'transportation', 'mountain', 'road', 'outdoor'],
    transformations: [
      {
        presetName: 'Optimized Delivery',
        transformation: 'f_auto,q_auto',
        width: 4200,
        height: 2800,
        format: 'webp',
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      },
      {
        presetName: 'Website Hero (16:5)',
        transformation: 'c_fill,g_auto,w_1920,h_600/f_auto,q_auto',
        width: 1920,
        height: 600,
        format: 'webp',
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1920&h=600&q=80',
      },
      {
        presetName: 'Instagram Square (1:1)',
        transformation: 'c_fill,g_auto,w_1080,h_1080/f_auto,q_auto',
        width: 1080,
        height: 1080,
        format: 'webp',
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1080&h=1080&q=80',
      },
    ],
  },
  {
    id: 'demo-asset-portrait-03',
    publicId: 'mediashield/samples/tech_executive_portrait',
    originalFilename: 'sarah_chen_executive_headshot.jpg',
    format: 'jpg',
    width: 3200,
    height: 3200,
    bytes: 4980200, // 4.75 MB
    optimizedBytes: 312000, // 304 KB (93.7% savings)
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=2000&q=80',
    secureUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=2000&q=80',
    category: 'People & Portrait',
    confidence: 0.99,
    healthScore: 98,
    safetyStatus: 'SAFE',
    moderationScore: 100,
    moderationDetail: {
      adult: 'None',
      violence: 'None',
      hate: 'None',
      weapons: 'None',
      reasons: [],
    },
    colorPalette: ['#334155', '#F1F5F9', '#D97706', '#475569'],
    detectedObjects: [
      { name: 'Person', confidence: 0.99 },
      { name: 'Face / Portrait', confidence: 0.98 },
      { name: 'Business Attire', confidence: 0.92 },
      { name: 'Office Setting', confidence: 0.87 },
    ],
    tags: ['person', 'portrait', 'face', 'woman', 'business', 'professional', 'headshot', 'corporate'],
    transformations: [
      {
        presetName: 'Optimized Delivery',
        transformation: 'f_auto,q_auto',
        width: 3200,
        height: 3200,
        format: 'webp',
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
      },
      {
        presetName: 'Smart Face Crop (1:1)',
        transformation: 'c_thumb,g_face,w_800,h_800/f_auto,q_auto',
        width: 800,
        height: 800,
        format: 'webp',
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&h=800&q=80',
      },
      {
        presetName: 'Background Removed',
        transformation: 'e_background_removal/f_auto,q_auto',
        width: 3200,
        height: 3200,
        format: 'png',
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
  {
    id: 'demo-asset-flagged-04',
    publicId: 'mediashield/samples/flagged_prohibited_weapon',
    originalFilename: 'restricted_upload_item_alert.jpg',
    format: 'jpg',
    width: 2800,
    height: 1860,
    bytes: 3420100, // 3.26 MB
    optimizedBytes: 298000,
    url: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=2000&q=80',
    secureUrl: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=2000&q=80',
    category: 'Security Alert / Weapons',
    confidence: 0.94,
    healthScore: 38,
    safetyStatus: 'REQUIRES_REVIEW',
    moderationScore: 42,
    moderationDetail: {
      adult: 'Low',
      violence: 'Medium',
      hate: 'None',
      weapons: 'High (0.89)',
      reasons: ['Weapon or firearm detected in media content', 'Violates acceptable use policy section 4.2'],
    },
    colorPalette: ['#18181B', '#3F3F46', '#71717A', '#A1A1AA'],
    detectedObjects: [
      { name: 'Firearm / Weapon', confidence: 0.93 },
      { name: 'Restricted Item', confidence: 0.88 },
      { name: 'Indoor Tactical', confidence: 0.82 },
    ],
    tags: ['weapon', 'firearm', 'restricted', 'alert', 'moderation flagged', 'review needed'],
    transformations: [
      {
        presetName: 'Optimized Delivery',
        transformation: 'f_auto,q_auto',
        width: 2800,
        height: 1860,
        format: 'webp',
        url: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
];
